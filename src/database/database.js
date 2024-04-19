const groups = [
  {
    id: 1,
    name: 'Grupo #1',
    color: '#4c84a4',
    createdAt: '2024-04-13T22:49:47.834Z',
  },
  {
    id: 2,
    name: 'Grupo #2',
    color: '#64b44c',
    createdAt: '2024-04-14T22:49:47.834Z',
  },
  {
    id: 3,
    name: 'Grupo #3',
    color: '#FCE4E4',
    createdAt: '2024-04-15T22:49:47.834Z',
  },
];

const users = [
  {
    id: 1,
    name: 'Usuario #1',
    email: 'user1@email.com',
    password: '123456',
    createdAt: '2024-04-13T22:49:47.834Z',
  },
  {
    id: 2,
    name: 'Usuario #2',
    email: 'user2@email.com',
    password: '123456',
    createdAt: '2024-04-14T22:49:47.834Z',
  },
  {
    id: 3,
    name: 'Usuario #3',
    email: 'user3@email.com',
    password: '123456',
    createdAt: '2024-04-15T22:49:47.834Z',
  },
];

const db = { groups, users };

export default db;
