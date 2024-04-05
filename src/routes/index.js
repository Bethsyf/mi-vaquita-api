import express from 'express';
import {
  createGroups,
  getGroups,
  getGroup,
  deleteGroup,
} from '../controller/groups.controller.js';

const router = express.Router();

router.get('/groups', getGroups);
router.get('/groups/:id', getGroup);
router.post('/groups', createGroups);
router.delete('/groups/:id', deleteGroup);

export default router;
