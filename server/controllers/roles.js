import Role from '../models/role'
import httpStatusCode from '../constants/httpStatusCode'

const { CREATED, INTERNAL_SERVER_ERROR, SUCCESS } = httpStatusCode

async function create (req, res) {
  try {
    const role = new Role(req.body)
    await role.save()
    res.status(CREATED).json(role)
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json(error)
  }
}

async function get (req, res) {
  try {
    const roleCollection = await Role.find()
    res.status(SUCCESS).json(roleCollection)
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json(error)
  }
}

async function getById (req, res) {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res
  //     .status(httpStatusCode.BAD_REQUEST)
  //     .json({ errors: errors.array() });
  // }
  try {
    const role = await Role.findById(req.params.id)
    if (!role) {
      return res.status(httpStatusCode.NOT_FOUND).json(notFoundError)
    }
    res.status(httpStatusCode.SUCCESS).json(role)
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(error)
  }
}

module.exports = {
  create,
  get,
  getById
}
