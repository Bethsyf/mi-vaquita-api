import Router from 'express-promise-router';
import { GroupController } from '../controller/groups.controller.js';

const GroupRouter = () => {
  const groupController = GroupController();
  const router = Router();

  router.get('/', groupController.getAll);
  router.get('/:id', groupController.getById);
  router.post('/', groupController.create);
  router.delete('/:id', groupController.removeById);

  return router;
};

export { GroupRouter };
