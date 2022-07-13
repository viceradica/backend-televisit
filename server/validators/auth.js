import { body } from 'express-validator';
import validationType from '../constants/validation';
import errorMessage from '../constants/errorMessage';

const { authError } = errorMessage.AUTH;

function validate(method) {
  switch (method) {
    case validationType.AUTHENTICATION:
    {
      return [
        body('username', authError('username'))
          .notEmpty(),
        body('password', authError('password'))
          .notEmpty()
      ];
    }
  }
}

export default validate;