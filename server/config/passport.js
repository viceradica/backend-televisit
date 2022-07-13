import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import auth from '../constants/auth';
import errorMessage from '../constants/errorMessage';
import User from '../models/user';

const JwtStrategy = passportJwt.Strategy;
const LocalStrategy = passportLocal.Strategy;

const { JWT, LOCAL } = auth;
const { authValidationError } = errorMessage.AUTH;

passport.use(new LocalStrategy(LOCAL.user,
  async(username, password, done) => {
    await validateUser(username, password, done);
  }
));

async function validateUser(username, password, done) {
  try {
    const user = await User.findOne({ username });
    if (!user || !user.validatePassword(password)) {
      return done({ authValidationError });
    }
    return done({ user });
  } catch (error) {
    return done({ error });
  }
}

passport.use(new JwtStrategy(JWT.options,
  async(payload, done) => {
    await validateToken(payload, done);
  }
));

async function validateToken(payload, done) {
  try {
    const user = await User.findOne({ id: payload._id });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}