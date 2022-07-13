import express from 'express';
import validate from '../../validators/appointment';
import validationType from '../../constants/validation';

const { APPOINTMENT, MONGO_ID } = validationType;

const router = express.Router();
const appointmentController = require('../../controllers/appointments');

router.post('/', appointmentController.create);
router.get('/', appointmentController.get);
router.get('/:id', validate(MONGO_ID), appointmentController.getById);
router.put('/:id', validate(APPOINTMENT.PUT), appointmentController.update);
router.patch('/:id', validate(APPOINTMENT.PATCH), appointmentController.update);
router.delete('/:id', validate(MONGO_ID), appointmentController.remove);

module.exports = router;
