const ExtractJwt = require('passport-jwt').ExtractJwt;

const AUTH = {
  TYPE: {
    LOCAL: 'local',
    JWT: 'jwt'
  },
  HASH_OPTIONS: {
    iterations: 10000,
    keylength: 512,
    stringFormat: 'hex',
    randomBytesSize: 16,
    algorithm: 'sha512'
  },
  LOCAL: {
    user: {
      usernameField: 'username',
      passwordField: 'password'
    }
  },
  JWT: {
    options: {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'patient-doctor-secret',
      issuer: 'ivan.accounts.com',
      audiance: 'patient-doctor.net'
    },
    duration: {
      numberOfDays: 60,
      radix: 10,
      milisecondsDivisor: 1000
    }
  }
};

export default AUTH;