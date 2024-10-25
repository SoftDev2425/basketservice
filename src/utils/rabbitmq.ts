import amqp, { Channel } from 'amqplib';

let channel: Channel;

async function connect() {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || 'amqp://localhost',
  );
  channel = await connection.createChannel();
  await channel.assertQueue('orderQueue', { durable: true });
}

function getChannel() {
  return channel;
}

export { connect, getChannel };
