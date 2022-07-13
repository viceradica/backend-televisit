import { param, body } from 'express-validator';
import validation from '../constants/validation';
import errorMessage from '../constants/errorMessage';
import { checkForUnknownKeys } from '../utils/validation';

const {
  invalidDateProvided,
  invalidAppointmentTypeProvided,
  mongoIdError,
  requiredField
} = errorMessage.VALIDATION;
const { APPOINTMENT, MONGO_ID } = validation;
const { ALLOWED_PROPERTIES, ALLOWED_TYPES, PATCH, PUT } = APPOINTMENT;

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
        body('type')
          .notEmpty().withMessage(requiredField('Appointment Type'))
          .matches(ALLOWED_TYPES)
          .withMessage(invalidAppointmentTypeProvided),
        body('visitDate')
          .notEmpty().withMessage(requiredField('Visit Date'))
          .isISO8601().withMessage(invalidDateProvided),
        body('patient')
          .notEmpty().withMessage(requiredField('Patient'))
          .isMongoId().withMessage(mongoIdError),
        body('doctor')
          .notEmpty().withMessage(requiredField('Doctor'))
          .isMongoId().withMessage(mongoIdError)
      ];
    }
    case PATCH:
    {
      return [
        param('id', mongoIdError).isMongoId(),
        body().custom((body) => checkForUnknownKeys(body, ALLOWED_PROPERTIES)),
        body('type', invalidAppointmentTypeProvided)
          .matches(ALLOWED_TYPES)
          .optional({ nullable: true }),
        body('visitDate')
          .isISO8601().withMessage(invalidDateProvided)
          .optional({ nullable: true }),
        body('patient', mongoIdError)
          .isMongoId()
          .optional({ nullable: true }),
        body('doctor', mongoIdError)
          .isMongoId()
          .optional({ nullable: true })
      ];
    }
  }
}

export default validate;