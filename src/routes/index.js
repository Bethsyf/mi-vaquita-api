import express from 'express';
import { GroupRouter } from './groups.router.js';

const productsRouter = GroupRouter();
const router = express.Router();

router.use('/groups', productsRouter);

export default router;
