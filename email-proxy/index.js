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
  } catch (error) {
    stats.errors++;
    console.error(`Failed to send email to ${to}`, error.message);

    // Log lỗi vào Elasticsearch
    await esClient.index({
      index: process.env.ELASTICSEARCH_INDEX || 'email-errors',
      document: {
        to,
        subject,
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectRabbitMQ();
  processQueue();
});