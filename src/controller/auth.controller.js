import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UsersService from '../services/users.service.js';
import Joi from 'joi';

const AuthController = () => {
  const usersService = UsersService();

  const login = async (req, res) => {
    try {
      await validateLogin(req.body);

      const { email, password } = req.body;

      const user = await usersService.getByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res
        .status(200)
        .json({ token, userId: user.id, name: user.name, email: user.email });
    } catch (error) {
      return handleError(res, error, 'Error during login');
    }
  };

  const validateLogin = async (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    await schema.validateAsync(data);
  };

  const handleError = (res, error, message) => {
    console.error(message + ':', error.message);
    return res.status(500).json({ error: message + ': ' + error.message });
  };

  return {
    login,
  };
};

export { AuthController };
