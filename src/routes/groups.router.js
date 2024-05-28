import express from 'express';
import { GroupController } from '../controller/groups.controller.js';

const GroupRouter = () => {
  const groupController = GroupController();
  const router = express.Router();

  router.get('/', groupController.getAll);
  router.get('/:id', groupController.getById);
  router.post('/', groupController.create);
  router.put('/:id', groupController.update);
  router.delete('/:id', groupController.removeById);

  return router;
};

export { GroupRouter };
