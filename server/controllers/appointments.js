import Appointment from '../models/appointment';
import httpStatusCode from '../constants/httpStatusCode';
import httpMethod from '../constants/httpMethod';
import errorMessage from '../constants/errorMessage';
import { validationResult } from 'express-validator';

const { notFoundError } = errorMessage.VALIDATION;
const { CREATED, INTERNAL_SERVER_ERROR, SUCCESS } = httpStatusCode;

async function create(req, res) {
  try {
    const appointment = new Appointment(req.body, res);
    await appointment.save();
    res.status(CREATED).json(appointment);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

async function get(req, res) {
  try {
    const appointments = await Appointment.find();
    res.status(SUCCESS).json(appointments);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json(error);
  }
}

async function getById(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(httpStatusCode.NOT_FOUND).json(notFoundError);
    }
    res.status(httpStatusCode.SUCCESS).json(appointment);
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function update(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  try {
    const appointment = await Appointment
      .findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!appointment) {
      return res.status(httpStatusCode.NOT_FOUND).json(notFoundError);
    }
    return createResponse(req, res, appointment);
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(error);
  }
}

function createResponse(req, res, appointment) {
  if (req.method === httpMethod.PUT) {
    return res.status(httpStatusCode.SUCCESS).json(appointment);
  }
  return res.status(httpStatusCode.SUCCESS).json(req.body);
}

async function remove(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  try {
    const appointment = await Appointment
      .findOneAndDelete({ _id: req.params.id });
    if (!appointment) {
      return res.status(httpStatusCode.NOT_FOUND).json(notFoundError);
    }
    res.status(httpStatusCode.SUCCESS).json(appointment);
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(error);
  }
}

module.exports = {
  create,
  get,
  getById,
  update,
  remove
};
