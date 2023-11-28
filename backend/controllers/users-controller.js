const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-password');
    res
      .status(200)
      .json({ users: users.map((user) => user.toObject({ getters: true })) });
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not find users right now.',
        500
      )
    );
  }
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data..', 422)
    );
  }

  const { name, email, password } = req.body;

  try {
    const hasUser = await User.findOne({ email });
    if (hasUser) {
      return next(
        new HttpError('The User with this email is already exist..', 422)
      );
    }

    const user = new User({
      name,
      email,
      password,
      image: 'https://cdn-icons-png.flaticon.com/512/666/666201.png',
      places: [],
    });

    await user.save();

    res.status(201).json({ user: user.toObject({ getters: true }) });
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not create a user right now.',
        500
      )
    );
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const identifiedUser = await User.findOne({ email });

    if (!identifiedUser || identifiedUser.password !== password) {
      return next(
        new HttpError(
          'Could not identify user, credentials seem to be wrong.',
          401
        )
      );
    }

    res.status(200).json({
      message: 'Loged in',
      user: identifiedUser.toObject({ getters: true }),
    });
  } catch (error) {
    return next(
      new HttpError('Something went wrong, could not log in right now.', 500)
    );
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
