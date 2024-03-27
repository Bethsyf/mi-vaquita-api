import express from 'express';
import apiRouter from './routes/index.js';

const app = express();

const port = 3000;

app.use(express.json());

app.get('/groups', apiRouter);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
