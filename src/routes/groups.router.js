import express from 'express';
import {
  createGroups,
  getGroups,
  getGroup,
  deleteGroup,
} from '../controller/groups.controller.js';

const router = express.Router();

router.get('/', getGroups);
router.get('/:id', getGroup);
router.post('/', createGroups);
router.delete('/:id', deleteGroup);

export default router;
