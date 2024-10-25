import amqb, {Channel} from "amqplib";

let channel: Channel;

async function connect() {
    const connection = await amqb.connect(process.env.)
}