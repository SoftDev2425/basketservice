import { Express, Request, Response } from 'express';
import UserRouter from './routes/user.route';
import { getChannel } from './utils/rabbitmq';
import { Basket } from './protos/generated/basket';
import { basket } from './basket';

function routes(app: Express) {
  app.get('/', (_req: Request, res: Response) =>
    res.send(`Hello from MTOGO: Basket Service!`),
  );

  app.get('/api/basket', (_req: Request, res: Response) => {
    res.json(basket);
  });

  // Endpoint to add an item to the basket and publish an event
  app.post('/api/basket', async (_req: Request, res: Response) => {
    // const { _basket } = req.body;

    // if (!_basket) {
    //   return res.status(400).send('Basket details are required.');
    // }

    try {
      const serializedMessage = Basket.encode(basket).finish();
      console.log("serializedMessage", serializedMessage);
      const channel = getChannel();
      channel.sendToQueue('orderQueue', Buffer.from(serializedMessage), {
        persistent: true,
      });
    } catch (error) {
      console.error('Error publishing message to queue:', error);
      res.status(500).send('Error adding item to basket.');
    }
    res.send('Item added to basket and event published.');
  });

  app.get('/healthcheck', (_req: Request, res: Response) =>
    res.sendStatus(200),
  );

  // Register API routes
  app.use('/api/users', UserRouter);

  // Catch unregistered routes
  app.all('*', (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });
}

export default routes;
