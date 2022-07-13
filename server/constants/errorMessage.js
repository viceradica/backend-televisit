const ERROR_MESSAGE = {
  AUTH: {
    authValidationError: {
      errors: { 'username or password': 'is invalid' }
    },
    authError: (field) => `${field} can not be empty`
  },
  MONGOOSE: {
    mongooseUniqueError: {
      message: 'Error, expected {PATH} to be unique.'
    }
  },
  NOTIFICATION: {
    emailAccountError: 'Failed to create testing account, an error occurred. ',
    emailSendError: 'Failed to send email, an error occurred. '
  },
  QUERY: {
    invalidSearchKey: 'Invalid search key'
  },
  VALIDATION: {
    mongoIdError: 'Provided param is not mongoDb id',
    invalidDateProvided: 'Invalid date value provided',
    invalidAppointmentTypeProvided: 'Invalid appointment type provided',
    notFoundError: { message: 'Requested resource not found' },
    booleanError: 'Must be true or false',
    numericError: 'Must be numeric value',
    emailError: 'Provided value is not valid e-mail address',
    requiredField: (field) => `${field} must be provided`,
    stringField: (field) => `${field} must be string`,
    unknownKey: (key) => `Unknown key: ${key}`
  }
};

export default ERROR_MESSAGE;