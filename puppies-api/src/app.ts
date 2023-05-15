const express = require('express');
import { Application } from 'express';
import { createPuppyRoute } from './routes/createPuppy';
import { listAllPuppiesRoute } from './routes/listAllPuppies';
import { getPuppyByIdRoute } from './routes/getPuppy';
import { deletePuppyRoute } from './routes/delete';
import { updatePuppyRoute } from './routes/updatePuppy';
import { searchPuppyByQuery } from './routes/searchPuppy';
const cors = require('cors')

const app: Application = express();

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
  }
))
app.use(express.json());

app.get('/api/puppies', listAllPuppiesRoute);
app.post('/api/puppies', createPuppyRoute);

app.get('/api/puppies/search', searchPuppyByQuery);

app.get('/api/puppies/:id', getPuppyByIdRoute);
app.put('/api/puppies/:id', updatePuppyRoute);
app.delete('/api/puppies/:id', deletePuppyRoute);


export default app;

