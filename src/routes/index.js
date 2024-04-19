import express from 'express';
import { GroupRouter } from './groups.router.js';
import { UserRouter } from './users.router.js';

const groupsRouter = GroupRouter();
const usersRouter = UserRouter();
const router = express.Router();

router.use('/groups', groupsRouter);
router.use('/users', usersRouter);

export default router;
