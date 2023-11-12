const express = require("express");
require("express-async-errors");
const amqp = require("amqplib");
const nodemailer = require("nodemailer");

const sendEmail = async (email) => {};

let channel;
async function connect() {
  const amqpServer = process.env.RABBITMQ_URL;
  const connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("ORDER");
}
connect().then(() => {
  channel.consume("ORDER", (data) => {
    const { email } = JSON.parse(data.content);
    console.log("Consuming ORDER service   " + email);

    channel.ack(data);
  });
});

const app = express();

app.use(express.json());

const port = process.env.PORT ?? 8084;

app.listen(port, () => {
  console.log(`Email Service at ${port}`);
});
