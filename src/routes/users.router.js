import express from 'express';
import { UsersController } from '../controller/users.controller.js';

const UserRouter = () => {
  const userController = UsersController();
  const router = express.Router();

  router.get('/', userController.getAll);
  router.get('/:id', userController.getById);
  router.post('/', userController.create);
  router.delete('/:id', userController.removeById);

  return router;
};

export { UserRouter };
