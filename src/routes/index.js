import express from 'express';
import productsRouter from './groups.router.js';

const router = express.Router();

router.use('/groups', productsRouter);

export default router;
