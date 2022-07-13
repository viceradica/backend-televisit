import auth from '../constants/auth';
import passport from 'passport';
import httpStatusCode from '../constants/httpStatusCode';
import { validationResult } from 'express-validator';

const authenticationController = require('../controllers/authentication');

const { JWT, LOCAL } = auth.TYPE;
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = httpStatusCode;

const authentication = {
  jwt: (req, res, next) => jwtAuthentication(req, res, next),
  local: (req, res) => localAuthentication(req, res)
};

function jwtAuthentication(req, res, next) {
  return passport.authenticate(JWT, { session: false },
    (error, user, info) => {
      if (error) {
        return res.status(INTERNAL_SERVER_ERROR).json(error);
      }
      if (user) {
        req.user = user;
        return next();
      }
      return res.status(UNAUTHORIZED).json({ error: info.message });
    })(req, res, next);
}

function localAuthentication(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({ errors: errors.array() });
  }
  return passport.authenticate(LOCAL, { session: false },
    (authResult) => {
      authenticationController.login(authResult, res);
    })(req, res);
}

export default authentication;