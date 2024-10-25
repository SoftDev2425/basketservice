import { Express, Request, Response } from 'express';
import UserRouter from './routes/user.route';
import { getChannel } from './utils/rabbitmq';

function routes(app: Express) {
  app.get('/', (_req: Request, res: Response) =>
    res.send(`Hello from MTOGO: Basket Service!`),
  );

  // Endpoint to add an item to the basket and publish an event
  app.post('/add-to-basket', async (req: Request, res: Response) => {
    const { item } = req.body;

    if (!item) {
      return res.status(400).send('Item is required');
    }

    console.log(`Item added to basket: ${JSON.stringify(item)}`);
    const channel = getChannel();

    channel.sendToQueue('orderQueue', Buffer.from(JSON.stringify({ item })), {
      persistent: true,
    });
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
