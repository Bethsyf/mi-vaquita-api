import express from 'express';
import { GroupController } from '../controller/groups.controller.js';

const GroupRouter = () => {
  const groupController = GroupController();
  const router = express.Router();

  router.get('/', groupController.getAll);
  router.get('/:id', groupController.getById);
  router.get('/participants/:id', groupController.getCountParticipants);
  router.get('/expenses/:id', groupController.getExpensesById);
  router.post('/', groupController.create);
  router.put('/:id', groupController.update);
  router.post('/add', groupController.addMember);
  router.delete('/:id', groupController.removeById);

  return router;
};

export { GroupRouter };
