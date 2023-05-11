const express = require('express');
import { Application } from 'express';
import { createPuppyRoute } from './routes/createPuppy';
import { listAllPuppiesRoute } from './routes/listAllPuppies';
import { getPuppyByIdRoute } from './routes/getPuppy';
import { deletePuppyRoute } from './routes/delete';
import { updatePuppyRoute } from './routes/updatePuppy';

const app: Application = express();
app.use(express.json());

app.get('/api/puppies', listAllPuppiesRoute);
app.post('/api/puppies', createPuppyRoute);

app.get('/api/puppies/:id', getPuppyByIdRoute);
app.put('/api/puppies/:id', updatePuppyRoute);
app.delete('/api/puppies/:id', deletePuppyRoute);

export default app;
