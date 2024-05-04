import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routerApi from './routes/index.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

app.use('/api/v1', routerApi);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
