import Router from 'express-promise-router';
import { GroupRouter } from './groups.router.js';
import { UserRouter } from './users.router.js';

const groupsRouter = GroupRouter();
const usersRouter = UserRouter();
const router = Router();

router.use('/groups', groupsRouter);
router.use('/users', usersRouter);

export default router;
