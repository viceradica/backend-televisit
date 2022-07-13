import express from 'express';

const router = express.Router();
const roleController = require('../../controllers/roles');

router.post('/', roleController.create);
router.get('/', roleController.get);
router.get('/:id', roleController.getById);

module.exports = router;
