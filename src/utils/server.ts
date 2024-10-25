import express, { Request, Response } from 'express';
import routes from '../routes';
import { getChannel } from './rabbitmq';

function createServer() {
  const app = express();

  app.use(express.json());

  routes(app);

  // Endpoint to add an item to the basket and publish an event
  app.post('/add-to-basket', async (req: Request, res: Response) => {
    const { item } = req.body;

    console.log(`Item added to basket: ${item}`);
    const channel = getChannel();

    channel.sendToQueue('orderQueue', Buffer.from(JSON.stringify({ item })), {
      persistent: true,
    });
    res.send('Item added to basket and event published.');
  });

  return app;
}

export default createServer;