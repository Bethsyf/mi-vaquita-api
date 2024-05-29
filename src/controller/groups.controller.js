import { GroupsServices } from '../services/groups.service.js';
import Joi from 'joi';

const GroupController = () => {
  const groupsService = GroupsServices();

  const getAll = async (_req, res) => {
    try {
      const groups = await groupsService.getAll();
      return res.status(200).json({
        message: 'Groups retrieved successfully',
        groups,
      });
    } catch (error) {
      return handleError(res, error, 'Error fetching groups');
    }
  };

  const getById = async (req, res) => {
    try {
      const group = await groupsService.getById(req.params.id);
      if (!group) {
        return res.status(404).send('Group not found');
      }
      return res.status(200).json(group);
    } catch (error) {
      return handleError(res, error, 'Error fetching group');
    }
  };

  const create = async (req, res) => {
    try {
      await validateGroup(req.body);
      const newGroup = await groupsService.create(
        req.body.name,
        req.body.color
      );
      return res.status(201).json(newGroup);
    } catch (error) {
      return handleError(res, error, 'Error creating group');
    }
  };

  const update = async (req, res) => {
    try {
      await validateGroup(req.body);
      const updatedGroup = await groupsService.update(req.params.id, req.body);
      if (!updatedGroup) {
        return res.status(404).json({ error: 'Group not found' });
      }
      return res.status(200).json(updatedGroup);
    } catch (error) {
      return handleError(res, error, 'Error updating group');
    }
  };

  const removeById = async (req, res) => {
    try {
      const deleted = await groupsService.removeById(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Group not found' });
      }
      return res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
      return handleError(res, error, 'Error deleting group');
    }
  };

  const validateGroup = async (group) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(20).required(),
      color: Joi.string().required(),
    });

    const existingGroup = await groupsService.getByName(group.name);
    if (existingGroup) {
      throw new Error('Group with the same name already exists');
    }

    await schema.validateAsync(group);
  };

  const handleError = (res, error, message) => {
    console.error(message + ':', error.message);
    return res.status(500).json({ error: message + ': ' + error.message });
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
