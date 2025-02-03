const express = require("express");
const amqp = require("amqplib");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

const QUEUE_NAME = "email_queue";
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
        hostname: 'localhost',
        port: 5672,
        username: 'guest',
        password: 'guest',
        clientProperties: {
          connection_name: "MyNodeApp", // Tên kết nối tùy chỉnh
          app: "EmailQueueService", // Mô tả ứng dụng
        },
      });
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
    console.log("Connected to RabbitMQ");
  } catch (err) {
    console.error("Failed to connect to RabbitMQ", err);
  }
}

// Hàm gửi email
async function sendEmail({ to, subject, text }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com", // Thay bằng email của bạn
      pass: "your-password", // Thay bằng mật khẩu ứng dụng
    },
  });

  try {
    await transporter.sendMail({ from: "your-email@gmail.com", to, subject, text });
    stats.success++;
    console.log(`Email sent to ${to}`);
  } catch (error) {
    stats.errors++;
    console.error(`Failed to send email to ${to}`, error.message);
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
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) {
    return res.status(400).json({ message: "Invalid email data" });
  }

  try {
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify({ to, subject, text })));
    res.status(200).json({ message: "Email added to queue" });
  } catch (error) {
    console.error("Failed to add email to queue", error);
    res.status(500).json({ message: "Failed to add email to queue" });
  }
});

// Endpoint để lấy thống kê
app.get("/stats", (req, res) => {
  res.json(stats);
});

// Start server
app.listen(3000, async () => {
  console.log("Server is running on http://localhost:3000");
  await connectRabbitMQ();
  processQueue();
});
