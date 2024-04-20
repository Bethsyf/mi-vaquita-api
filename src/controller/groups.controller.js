import { GroupsServices } from '../services/groups.service.js';

const GroupController = () => {
  const groupsService = GroupsServices();

  const getAll = async (req, res) => {
    const groups = groupsService.getAll();
    res.json(groups);
  };

  const getById = async (req, res) => {
    const id = req.params.id;

    const group = groupsService.getById(id);
    if (group === undefined) {
      res.status(404).send('Group not found');
    }
    res.status(200).json(group);
  };

  const create = async (req, res) => {
    const existingGroup = groupsService.getByName(req.body.name);

    if (existingGroup) {
      return res.status(400).json({ error: 'Group already exists' });
    }

    if (!req.body.name || req.body.name.length > 30) {
      return res.status(400).json({
        error: 'Name is required and must be less than 30 characters',
      });
    }

    const newGroup = groupsService.create(req.body.name, req.body.color);

    if (newGroup === null) {
      return res.status(400).json({ error: 'Group already exists' });
    }

    res.status(201).json(newGroup);
  };

  const removeById = async (req, res) => {
    const id = parseInt(req.params.id);

    const deleted = groupsService.removeById(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.status(200).json({ message: 'Group deleted successfully' });
  };

  return {
    getById,
    getAll,
    create,
    removeById,
  };
};
export { GroupController };
