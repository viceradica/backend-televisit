import express from 'express';
import authentication from '../../utils/auth';
import validate from '../../validators/auth';
import validationType from '../../constants/validation';

const router = express.Router();
const authenticationController = require('../../controllers/authentication');

router.post('/register', validate(validationType.AUTHENTICATION),
  authenticationController.register);
router.post('/login', validate(validationType.AUTHENTICATION),
  authentication.local);

module.exports = router;