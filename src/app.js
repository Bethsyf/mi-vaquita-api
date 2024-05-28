import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import routerApi from './routes/index.js';
import { applyJWTAuthentication } from './middleware/auth.middleware.js';
import './utils/passport.config.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(passport.initialize());
app.use(cors());
app.use(applyJWTAuthentication);
app.use('/api/v1', routerApi);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
