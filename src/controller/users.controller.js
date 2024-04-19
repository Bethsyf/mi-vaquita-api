import { UsersServices } from '../services/users.service.js';

const UsersController = () => {
  const usersService = UsersServices();

  const getAll = (req, res) => {
    const users = usersService.getAll();
    res.json(users);
  };

  const getById = (req, res) => {
    const id = req.params.id;

    const user = usersService.getById(id);
    if (user === undefined) {
      res.status(404).send('User not found');
    }
    res.status(200).json(user);
  };

  const create = (req, res) => {
    const existingUser = usersService.getByName(req.body.name);

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    if (!req.body.name || req.body.name.length > 100) {
      return res.status(400).json({
        error: 'Name is required and must be less than 100 characters',
      });
    }

    const newUser = usersService.create(
      req.body.name,
      req.body.email,
      req.body.password
    );

    if (newUser === null) {
      return res.status(400).json({ error: 'User already exists' });
    }

    res.status(201).json(newUser);
  };

  const removeById = (req, res) => {
    const id = parseInt(req.params.id);

    const deleted = usersService.removeById(id);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  };

  return {
    getById,
    getAll,
    create,
    removeById,
  };
};
export { UsersController };
