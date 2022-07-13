import User from '../models/user';
import httpStatusCode from '../constants/httpStatusCode';
import httpMethod from '../constants/httpMethod';
import errorMessage from '../constants/errorMessage';
import { buildQuery } from '../utils/query';
import { validationResult } from 'express-validator';

const { notFoundError } = errorMessage.VALIDATION;
const { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, SUCCESS } = httpStatusCode;

async function create(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(CREATED).json(user);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json(error);
  }
}

async function get(req, res) {
  try {
    const users = await User.find();
    res.status(SUCCESS).json(users);
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
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(httpStatusCode.NOT_FOUND).json(notFoundError);
    }
    res.status(httpStatusCode.SUCCESS).json(user);
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function search(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skipIndex = (page - 1) * limit;
  const searchParams = new URLSearchParams(req.query);

  const { dbQuery, error } = buildQuery(searchParams);
  if (error) {
    return res.status(BAD_REQUEST).json(error);
  }

  try {
    const users = await User.find(dbQuery).limit(limit)
      .skip(skipIndex);
    res.status(SUCCESS).json(users);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json(error);
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
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!user) {
      return res.status(httpStatusCode.NOT_FOUND).json(notFoundError);
    }
    return createResponse(req, res, user);
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(error);
  }
}

function createResponse(req, res, user) {
  if (req.method === httpMethod.PUT) {
    return res.status(httpStatusCode.SUCCESS).json(user);
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
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      return res.status(httpStatusCode.NOT_FOUND).json(notFoundError);
    }
    res.status(httpStatusCode.SUCCESS).json(user);
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(error);
  }
}

module.exports = {
  create,
  get,
  getById,
  search,
  update,
  remove
};
