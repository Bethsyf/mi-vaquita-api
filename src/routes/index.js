import express from 'express';
import { GroupRouter } from './groups.router.js';
import { UserRouter } from './users.router.js';
import { ExpenseRouter } from './expenses.router.js';
import { AuthRouter } from './auth.router.js';

const groupsRouter = GroupRouter();
const usersRouter = UserRouter();
const expensesRouter = ExpenseRouter();
const authRouter = AuthRouter();
const router = express.Router();

router.use('/groups', groupsRouter);
router.use('/users', usersRouter);
router.use('/expenses', expensesRouter);
router.use('/login', authRouter);

export default router;
