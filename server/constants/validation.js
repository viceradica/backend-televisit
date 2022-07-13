const VALIDATION = {
  MONGO_ID: 'MongoId',
  USER: {
    SEARCH: 'Search',
    PUT: 'Put',
    PATCH: 'Patch',
    BOOLEAN_REGEX: /\b(?:true|false)\b/,
    ALLOWED_PROPERTIES: ['fullName', 'username', 'dateOfBirth', 'gender',
      'address', 'emailAddress', 'phoneNumber', 'role', 'password'],
    ALLOWED_QUERY_KEYS: ['available', 'role', 'fullName', 'username',
      'limit', 'page']
  },
  AUTHENTICATION: 'Authentication',
  APPOINTMENT: {
    PUT: 'Put',
    PATCH: 'Patch',
    ALLOWED_TYPES: /\b(?:Scheduled|Rescheduled|Canceled|Missed|Done)\b/,
    ALLOWED_PROPERTIES: ['type', 'visitDate', 'patient', 'doctor']
  }
};

export default VALIDATION;