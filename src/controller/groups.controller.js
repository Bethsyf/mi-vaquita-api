import groupsService from '../services/groups.service.js';

export const getGroups = (req, res) => {
  const groups = groupsService.getGroups();
  res.json(groups);
};

export const getGroup = (req, res) => {
  const id = req.params.id;

  const group = groupsService.getGroupById(id);
  if (group === undefined) {
    res.status(404).send('Group not found');
  }
  res.status(200).json(group);
};

export const createGroups = (req, res) => {
  const existingGroup = groupsService.getGroup(req.body.name);

  if (existingGroup) {
    return res.status(400).json({ error: 'Group already exists' });
  }

  if (!req.body.name || req.body.name.length > 30) {
    return res
      .status(400)
      .json({ error: 'Name is required and must be less than 30 characters' });
  }

  const newGroup = groupsService.createGroups(req.body.name);

  if (newGroup === null) {
    return res.status(400).json({ error: 'Group already exists' });
  }

  res.status(201).json(newGroup);
};
