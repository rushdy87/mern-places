const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      image: req.file.path,
      places: [],
    });

    await user.save();

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: 60 * 15 }
    );

    res.status(201).json({ userId: user.id, email: user.email, token });
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

    if (!identifiedUser) {
      return next(
        new HttpError(
          'Could not identify user, credentials seem to be wrong.',
          401
        )
      );
    }

    const isValidPassword = await bcrypt.compare(
      password,
      identifiedUser.password
    );

    if (!isValidPassword) {
      return next(
        new HttpError(
          'Could not identify user, credentials seem to be wrong.',
          401
        )
      );
    }

    const token = jwt.sign(
      { userId: identifiedUser.id, email: identifiedUser.email },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: 60 * 15 }
    );

    res.status(200).json({
      userId: identifiedUser.id,
      email: identifiedUser.email,
      token,
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
