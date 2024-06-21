import passport from 'passport';

const pathsToBypassAuthentication = [
  {
    path: '/api/v1/login',
    method: 'POST',
  },
  {
    path: '/api/v1/users',
    method: 'POST',
  },
  {
    path: '/api/v1/users',
    method: 'GET',
  },
];

const authenticateJWT = passport.authenticate('jwt', { session: false });

export function applyJWTAuthentication(req, res, next) {
  if (
    pathsToBypassAuthentication.some(
      (element) => element.path === req.path && element.method === req.method
    )
  ) {
    return next();
  }
  authenticateJWT(req, res, next);
}
