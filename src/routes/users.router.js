import express from 'express';
import { UsersController } from '../controller/users.controller.js';

const UserRouter = () => {
  const userController = UsersController();
  const router = express.Router();

  router.get('/all', userController.getAll);
  router.get('/', userController.getAllByGroupId);
  router.get('/:id', userController.getById);
  router.get('/email/:email', userController.getByEmail);
  router.post('/', userController.create);
  router.delete('/:id', userController.removeById);

  return router;
};

export { UserRouter };
