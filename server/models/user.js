import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import errorMessage from '../constants/errorMessage';
import auth from '../constants/auth';

const { mongooseUniqueError } = errorMessage.MONGOOSE;

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roles'
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  }
});

const {
  algorithm, iterations, keylength, randomBytesSize, stringFormat
} = auth.HASH_OPTIONS;

UserSchema.pre('save', function() {
  this.salt = crypto.randomBytes(randomBytesSize)
    .toString(stringFormat);
  const hash = crypto.pbkdf2Sync(this.password, this.salt, iterations,
    keylength, algorithm).toString(stringFormat);
  this.password = hash;
});

UserSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, iterations,
    keylength, algorithm).toString(stringFormat);
  return this.password === hash;
};

const { duration, options } = auth.JWT;

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    username: this.username,
    token: this.generateJWT(),
    role: this.role
  };
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + duration.numberOfDays);

  return jwt.sign({
    username: this.username,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / duration.milisecondsDivisor,
      duration.radix)
  }, options.secretOrKey, {
    issuer: options.issuer,
    audience: options.audiance
  });
};

UserSchema.plugin(uniqueValidator, mongooseUniqueError);

const User = mongoose.model('Users', UserSchema);
export default User;
