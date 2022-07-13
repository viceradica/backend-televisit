import express from 'express';
import authentication from '../../utils/auth';
const router = express.Router();

router.use('/users', require('./users'));
router.use('/auth', require('./authentication'));
router.use('/roles', authentication.jwt, require('./roles'));
router.use('/appointments', require('./appointments'));

module.exports = router;
