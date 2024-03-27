import groupsService from '../services/groups.service.js';

export const getGroups = (req, res) => {
  res.send(groupsService.getGroups());
};

export const createGroups = (req, res) => {
  if (!req.body.name) {
    console.log('aqui');
    return res
      .status(400)
      .send({ error: 'Name is required and must be less than 30 characters' });
  } else {
    res.send(groupsService.createGroups(req.body.name));
  }
};
