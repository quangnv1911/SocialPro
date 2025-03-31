import express from 'express';
import amqp from 'amqplib';
import nodemailer from 'nodemailer';
import winston from 'winston';
import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
dotenv.config();

// Tạo instance của Elasticsearch client
const esClient = new Client({ node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200' });

// Tạo logger với winston và cấu hình log vào Elasticsearch
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.Http({
      level: 'error',
      format: winston.format.json(),
      host: process.env.ELASTICSEARCH_HOST || 'localhost',
      port: process.env.ELASTICSEARCH_PORT || 9200,
      path: '/_bulk', // Log vào Elasticsearch
      ssl: process.env.ELASTICSEARCH_SSL === 'true',
    }),
  ],
});

const app = express();
app.use(express.json());

const QUEUE_NAME = process.env.QUEUE_NAME || 'email_queue';
const EMAIL_INDEX = process.env.ELASTICSEARCH_INDEX || 'emails';
let channel;

// Thống kê
let stats = {
  success: 0,
  errors: 0,
};

// Kết nối RabbitMQ
async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect({
      protocol: 'amqp',
      hostname: process.env.RABBITMQ_HOST || 'localhost',
      port: parseInt(process.env.RABBITMQ_PORT || '5672', 10),
      username: process.env.RABBITMQ_USERNAME || 'guest',
      password: process.env.RABBITMQ_PASSWORD || 'guest',
      clientProperties: {
        connection_name: process.env.APP_NAME || 'MyNodeApp',
        app: process.env.SERVICE_NAME || 'EmailQueueService',
      },
    });
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
    console.log('Connected to RabbitMQ');
  } catch (err) {
    console.error('Failed to connect to RabbitMQ', err);
  }
}

// Khởi tạo Elasticsearch index
async function setupElasticsearch() {
  try {
    const indexExists = await esClient.indices.exists({ index: EMAIL_INDEX });
    if (!indexExists) {
      await esClient.indices.create({
        index: EMAIL_INDEX,
        body: {
          mappings: {
            properties: {
              to: { type: 'keyword' },
              subject: { type: 'text' },
              status: { type: 'keyword' },
              errorMessage: { type: 'text' },
              timestamp: { type: 'date' }
            }
          }
        }
      });
      console.log(`Created Elasticsearch index: ${EMAIL_INDEX}`);
    }
  } catch (error) {
    console.error('Failed to setup Elasticsearch index', error);
  }
}

// Hàm gửi email
async function sendEmail({ to, subject, text }) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Lấy từ biến môi trường
      pass: process.env.EMAIL_PASSWORD, // Lấy từ biến môi trường
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      html: text,
    });
    stats.success++;
    console.log(`Email sent to ${to}`);
    
    // Lưu thông tin email thành công vào Elasticsearch
    await esClient.index({
      index: EMAIL_INDEX,
      document: {
        to,
        subject,
        status: 'success',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    stats.errors++;
    console.error(`Failed to send email to ${to}`, error.message);

    // Log lỗi vào Elasticsearch
    await esClient.index({
      index: EMAIL_INDEX,
      document: {
        to,
        subject,
        status: 'failed',
        errorMessage: error.message,
        timestamp: new Date().toISOString(),
      },
    });

    // Ghi log vào winston
    logger.error(`Failed to send email to ${to}: ${error.message}`, {
      to,
      subject,
      errorMessage: error.message,
    });
  }
}

// Worker xử lý hàng đợi
async function processQueue() {
  channel.consume(QUEUE_NAME, async (msg) => {
    const emailData = JSON.parse(msg.content.toString());
    await sendEmail(emailData);
    channel.ack(msg);
  });
}

// Endpoint để thêm email vào hàng đợi
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'Invalid email data' });
  }

  try {
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify({ to, subject, text })));
    res.status(200).json({ message: 'Email added to queue' });
  } catch (error) {
    console.error('Failed to add email to queue', error);
    res.status(500).json({ message: 'Failed to add email to queue' });
  }
});

// Endpoint để lấy thống kê
app.get('/stats', (req, res) => {
  res.json(stats);
});

// Endpoint để xem lịch sử email
app.get('/email-history', async (req, res) => {
  try {
    const { status, page = 1, size = 10, email } = req.query;
    const from = (page - 1) * size;
    
    const query = {
      bool: {
        must: []
      }
    };
    
    if (status) {
      query.bool.must.push({ term: { status } });
    }
    
    if (email) {
      query.bool.must.push({ term: { to: email } });
    }
    
    const response = await esClient.search({
      index: EMAIL_INDEX,
      body: {
        query: query.bool.must.length > 0 ? query : { match_all: {} },
        sort: [{ timestamp: { order: 'desc' } }],
        from,
        size
      }
    });
    
    const total = response.hits.total.value;
    const emails = response.hits.hits.map(hit => ({
      id: hit._id,
      ...hit._source
    }));
    
    res.json({
      total,
      page: parseInt(page),
      size: parseInt(size),
      emails
    });
  } catch (error) {
    console.error('Failed to fetch email history', error);
    res.status(500).json({ message: 'Failed to fetch email history' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectRabbitMQ();
  await setupElasticsearch();
  processQueue();
});