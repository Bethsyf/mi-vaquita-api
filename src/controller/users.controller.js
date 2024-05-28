import UsersServices from '../services/users.service.js';

const UsersController = () => {
  const usersService = UsersServices();

  const getAll = async (req, res) => {
    try {
      const users = await usersService.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users: ' + error.message });
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
      res.status(500).json({ error: 'Error fetching user: ' + error.message });
    }
  };

  const create = async (req, res) => {
    try {
      const existingUser = await usersService.getByEmail(req.body.email);

      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      if (!req.body.name || req.body.name.length > 100) {
        return res.status(400).json({
          error: 'Name is required and must be less than 100 characters',
        });
      }

      const newUser = await usersService.create(
        req.body.name,
        req.body.email,
        req.body.password
      );

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user: ' + error.message });
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
      res.status(500).json({ error: 'Error deleting user: ' + error.message });
    }
  };

  return {
    getById,
    getAll,
    create,
    removeById,
  };
};

export { UsersController };
