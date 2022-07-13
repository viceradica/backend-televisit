import express from 'express';
import validationType from '../../constants/validation';
import validate from '../../validators/user';

const router = express.Router();
const userController = require('../../controllers/users');

const { MONGO_ID, USER } = validationType;

router.get('/search', validate(USER.SEARCH), userController.search);
router.post('/', userController.create);
router.get('/', userController.get);
router.get('/:id', validate(MONGO_ID), userController.getById);
router.put('/:id', validate(USER.PUT), userController.update);
router.patch('/:id', validate(USER.PATCH), userController.update);
router.delete('/:id', validate(MONGO_ID), userController.remove);

module.exports = router;
