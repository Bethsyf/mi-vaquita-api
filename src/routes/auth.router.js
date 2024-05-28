import express from 'express';
import { AuthController } from '../controller/auth.controller.js';

const AuthRouter = () => {
  const authController = AuthController();
  const router = express.Router();

  router.post('/', authController.login);

  return router;
};

export { AuthRouter };
