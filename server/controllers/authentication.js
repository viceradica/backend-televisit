import User from '../models/user'
import httpStatusCode from '../constants/httpStatusCode'
import { validationResult } from 'express-validator'

const { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, SUCCESS } = httpStatusCode

async function register (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({ errors: errors.array() })
  }
  try {
    const user = new User(req.body)
    await user.save()
    res.status(CREATED).json({ user: user.toAuthJSON() })
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json(error)
  }
}

function login (authResult, res) {
  const { error, user, authValidationError } = authResult
  if (error) {
    return res.status(INTERNAL_SERVER_ERROR).json(error)
  }
  if (user) {
    user.token = user.generateJWT()
    return res.status(SUCCESS).json({ user: user.toAuthJSON() })
  }
  return res.status(BAD_REQUEST).json(authValidationError)
}

module.exports = {
  register,
  login
}
