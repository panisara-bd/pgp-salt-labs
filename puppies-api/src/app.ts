const express = require('express');
import { Application } from 'express';
import { createPuppyRoute } from './routes/createPuppy';
import { listAllPuppiesRoute } from './routes/listAllPuppies';
import { getPuppyByIdRoute } from './routes/getPuppy';
import { deletePuppyRoute } from './routes/delete';
import { updatePuppyRoute } from './routes/updatePuppy';
import { searchPuppyByQuery } from './routes/searchPuppy';
const cors = require('cors');

const app: Application = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://puppy-app-lilac.vercel.app',
];

app.use(
  cors({
    origin: function (
      origin: string | undefined,
      callback: (error: Error | null, success?: boolean) => void
    ) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

app.get('/api/puppies', listAllPuppiesRoute);
app.post('/api/puppies', createPuppyRoute);

app.get('/api/puppies/search', searchPuppyByQuery);

app.get('/api/puppies/:id', getPuppyByIdRoute);
app.put('/api/puppies/:id', updatePuppyRoute);
app.delete('/api/puppies/:id', deletePuppyRoute);

export default app;
