const express = require('express');
import { Application } from 'express';
import { getAllMilkRoute } from './routes/getAllMilk';
import { searchProductsRoute } from './routes/searchProducts';
import { getMilkByIdRoute } from './routes/getMilkById';
import { fitlerTypesRoute } from './routes/filterTypes';

const cors = require('cors');
const path = require('path');

const app: Application = express();

const allowedOrigins = [
  'http://localhost:3000'
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

app.get('/milk.png', (_req, res) => res.sendFile(path.resolve(__dirname, '../../src/data/milk.png')))
app.get('/api/products', getAllMilkRoute);
app.get('/api/products/search', searchProductsRoute);
app.get('/api/products/types', fitlerTypesRoute);
app.get('/api/products/:id', getMilkByIdRoute);

export default app;