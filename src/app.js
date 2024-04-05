import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
