import express from 'express';
import {
  createGroups,
  getGroups,
  getGroup,
} from '../controller/groups.controller.js';

const router = express.Router();

router.get('/groups', getGroups);
router.get('/groups/:id', getGroup);
router.post('/groups', createGroups);

export default router;
