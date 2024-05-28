import express from 'express';
import { GroupRouter } from './groups.router.js';
import { UserRouter } from './users.router.js';
import { AuthRouter } from './auth.router.js';

const groupsRouter = GroupRouter();
const usersRouter = UserRouter();
const authRouter = AuthRouter();
const router = express.Router();

router.use('/groups', groupsRouter);
router.use('/users', usersRouter);
router.use('/login', authRouter);

export default router;
