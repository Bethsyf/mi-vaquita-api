import UsersServices from '../services/users.service.js';
import Joi from 'joi';

const UsersController = () => {
  const usersService = UsersServices();

  const getAll = async (req, res) => {
    try {
      const users = await usersService.getAll();
      res.status(200).json(users);
    } catch (error) {
      return handleError(res, error, 'Error fetching users');
    }
  };

  const getAllByGroupId = async (req, res) => {
    try {
      const groupId = req.query.groupId;
      if (!groupId) {
        return res.status(400).json({ error: 'groupId is required' });
      }

      const users = await usersService.getAllByGroupId(groupId);
      res.status(200).json(users);
    } catch (error) {
      return handleError(res, error, 'Error fetching users');
    }
  };

  const getById = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await usersService.getById(id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).json(user);
    } catch (error) {
      return handleError(res, error, 'Error fetching group');
    }
  };
  const getByEmail = async (req, res) => {
    try {
      const email = req.params.email;

      const user = await usersService.getByEmail(email);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).json(user);
    } catch (error) {
      return handleError(res, error, 'Error fetching group');
    }
  };

  const create = async (req, res) => {
    try {
      await validateUser(req.body);
      const newUser = await usersService.create(
        req.body.name,
        req.body.email,
        req.body.password
      );
      res.status(201).json(newUser);
    } catch (error) {
      if (error.isJoi) {
        return res.status(400).json({ error: error.message });
      }
      return handleError(res, error, 'Error creating user');
    }
  };

  const removeById = async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const deleted = await usersService.removeById(id);
      if (!deleted) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return handleError(res, error, 'Error deleting user');
    }
  };

  const validateUser = async (user) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .required()
        .pattern(
          new RegExp('^[a-zA-Z0-9 !@#$%^&*()_+\\-=\\[\\]{};:\'"<>,./?]{8,30}$')
        ),
    });

    await schema.validateAsync(user);

    const existingUser = await usersService.getByEmail(user.email);
    if (existingUser) {
      throw new Error('User with the same email already exists');
    }
  };

  const handleError = (res, error, message) => {
    console.error(message + ':', error.message);
    return res.status(500).json({ error: message + ': ' + error.message });
  };
  return {
    getById,
    getAll,
    getAllByGroupId,
    getByEmail,
    create,
    removeById,
  };
};

export { UsersController };
