import { GroupsServices } from '../services/groups.service.js';

const GroupController = () => {
  const groupsService = GroupsServices();

  const getAll = async (_req, res) => {
    try {
      const groups = await groupsService.getAll();
      return res.status(200).json({
        message: 'groups retrieved successfully',
        groups,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error fetching groups: ' + error.message });
    }
  };

  const getById = async (req, res) => {
    try {
      const id = req.params.id;
      const group = await groupsService.getById(id);
      if (!group) return res.status(404).send('Group not found');
      return res.status(200).json(group);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error fetching groups: ' + error.message });
    }
  };

  const create = async (req, res) => {
    if (!req.body.name || req.body.name.length > 30) {
      return res.status(400).json({
        error: 'Name is required and must be less than 30 characters',
      });
    }

    try {
      const newGroup = await groupsService.create(
        req.body.name,
        req.body.color
      );
      if (!newGroup) {
        return res.status(400).json({ error: 'Group already exists' });
      }
      res.status(201).json(newGroup);
    } catch (error) {
      res.status(500).json({ error: 'Error creating group: ' + error.message });
    }
  };

  const update = async (req, res) => {
    try {
      const id = req.params.id;
      const updatedFields = req.body;
      const updatedGroup = await groupsService.update(id, updatedFields);
      if (!updatedGroup)
        return res.status(404).json({ error: 'Group not found' });
      res.status(200).json(updatedGroup);
    } catch (error) {
      res.status(500).json({ error: 'Error updating group: ' + error.message });
    }
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
    update,
    removeById,
  };
};

export { GroupController };
