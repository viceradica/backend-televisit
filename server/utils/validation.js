import errorMessage from '../constants/errorMessage';

export function checkForUnknownKeys(location, allowedKeys) {
  for (const key of Object.keys(location)) {
    if (!allowedKeys.includes(key)) {
      throw new Error(errorMessage.VALIDATION.unknownKey(key));
    }
  }
  return true;
}