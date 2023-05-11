import * as dotenv from 'dotenv' 
dotenv.config()

import { mongoClient } from './src/db';
import app from './src/app';

const port = 3000;

mongoClient
  .connect()
  .then(() => {
    console.log('Connected to database 🫶');
    app.listen(port, (): void => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch(console.error);

  process.on('SIGINT', async () => {
    console.log('Cleaning up ...');
    await mongoClient.close()
    console.log('Disconnected from the database');
    process.exit();
  });