import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UsersService from '../services/users.service.js';

const AuthController = () => {
  const usersService = UsersService();

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: 'Email and password are required' });
      }

      const user = await usersService.getByEmail(email);
      if (!user) {
        console.log('No user found with this email');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log('Password does not match');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res
        .status(200)
        .json({ token, name: user.name, email: user.email });
    } catch (error) {
      console.error('Error during login:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  return {
    login,
  };
};

export { AuthController };
