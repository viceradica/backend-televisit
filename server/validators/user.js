import { query, param, body } from 'express-validator';
import validation from '../constants/validation';
import errorMessage from '../constants/errorMessage';
import { checkForUnknownKeys } from '../utils/validation';

const {
  booleanError,
  emailError,
  invalidDateProvided,
  mongoIdError,
  numericError,
  requiredField,
  stringField
} = errorMessage.VALIDATION;
const { MONGO_ID, USER } = validation;
const {
  ALLOWED_PROPERTIES, ALLOWED_QUERY_KEYS, BOOLEAN_REGEX, PATCH, PUT, SEARCH
} = USER;

function validate(method) {
  switch (method) {
    case MONGO_ID:
    {
      return [
        param('id', mongoIdError).isMongoId()
      ];
    }
    case PUT:
    {
      return [
        param('id', mongoIdError).isMongoId(),
        body().custom((body) => checkForUnknownKeys(body, ALLOWED_PROPERTIES)),
        body('fullName')
          .notEmpty().withMessage(requiredField('Full Name'))
          .isString().withMessage(stringField('Full Name')),
        body('username')
          .notEmpty().withMessage(requiredField('Username'))
          .isString().withMessage(stringField('Username')),
        body('dateOfBirth')
          .notEmpty().withMessage(requiredField('Date of Birth'))
          .isISO8601().withMessage(invalidDateProvided),
        body('gender')
          .notEmpty().withMessage(requiredField('Gender')),
        body('address')
          .notEmpty().withMessage(requiredField('Address'))
          .isString().withMessage(stringField('Address')),
        body('emailAddress')
          .notEmpty().withMessage(requiredField('Email Address'))
          .isEmail().withMessage(emailError),
        body('phoneNumber')
          .notEmpty().withMessage(requiredField('Phone Number'))
          .isString().withMessage(stringField('Phone Number')),
        body('role')
          .notEmpty().withMessage(requiredField('Role'))
          .isMongoId().withMessage(mongoIdError),
        body('password')
          .notEmpty().withMessage(requiredField('Password'))
      ];
    }
    case PATCH:
    {
      return [
        param('id', mongoIdError).isMongoId(),
        body().custom((body) => checkForUnknownKeys(body, ALLOWED_PROPERTIES)),
        body('fullName')
          .isString().withMessage(stringField('Full Name'))
          .optional({ nullable: true }),
        body('username')
          .isString().withMessage(stringField('Username'))
          .optional({ nullable: true }),
        body('dateOfBirth')
          .isISO8601().withMessage(invalidDateProvided)
          .optional({ nullable: true }),
        body('address')
          .isString().withMessage(stringField('Address'))
          .optional({ nullable: true }),
        body('emailAddress')
          .isEmail().withMessage(emailError)
          .optional({ nullable: true }),
        body('phoneNumber')
          .isString().withMessage(stringField('Phone Number'))
          .optional({ nullable: true }),
        body('role')
          .isMongoId().withMessage(mongoIdError)
          .optional({ nullable: true })
      ];
    }
    case SEARCH:
    {
      return [
        query().custom((query) => checkForUnknownKeys(query,
          ALLOWED_QUERY_KEYS)),
        query('available', booleanError)
          .matches(BOOLEAN_REGEX)
          .optional({ nullable: true }),
        query('role', mongoIdError)
          .isMongoId()
          .optional({ nullable: true }),
        query('fullName')
          .isString()
          .optional({ nullable: true }),
        query('username')
          .isString()
          .optional({ nullable: true }),
        query('limit', numericError)
          .isInt()
          .optional({ nullable: true }),
        query('page', numericError)
          .isInt()
          .optional({ nullable: true })
      ];
    }
  }
}

export default validate;