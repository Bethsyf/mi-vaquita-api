import express from 'express';
import { createGroups, getGroups } from '../controller/groups.controller.js';

const router = express.Router();

router.get('/groups', getGroups);
router.post('/groups', createGroups);

export default router;
