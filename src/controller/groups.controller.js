import { GroupsServices } from '../services/groups.service.js';

const GroupController = () => {
  const groupsService = GroupsServices();

  const getAll = async (_req, res) => {
    const groups = await groupsService.getAll();

    return res.status(200).json({
      groups,
    });
  };

  const getById = async (req, res) => {
    const id = req.params.id;

    const group = await groupsService.getById(id);
    if (!group) return res.status(404).send('Group not found');
    return res.status(200).json(group);
  };

  const create = async (req, res) => {
    if (!req.body.name || req.body.name.length > 30) {
      return res.status(400).json({
        error: 'Name is required and must be less than 30 characters',
      });
    }
    // const existingGroup = await groupsService.getByName(req.body.name);
    // if (existingGroup) {
    //   return res.status(400).json({ error: 'Group already exists' });
    // }

    const newGroup = await groupsService.create(req.body.name, req.body.color);

    if (!newGroup) {
      return res.status(400).json({ error: 'Group already exists' });
    }

    res.status(201).json(newGroup);
  };

  const removeById = async (req, res) => {
    try {
      const id = req.params.id;

      const deleted = await groupsService.removeById(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Group not found' });
      }

      res.status(200).json({ message: 'Group deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  return {
    getById,
    getAll,
    create,
    removeById,
  };
};
export { GroupController };
