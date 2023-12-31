const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  try {
    const place = await Place.findById(placeId);
    if (!place) {
      return next(
        new HttpError('Could not find a place for the provided id.', 404)
      );
    }
    res.json({ place: place.toObject({ getters: true }) });
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not find a place right now.',
        500
      )
    );
  }
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  try {
    const userWithPlaces = await User.findById(userId).populate('places');
    if (!userWithPlaces || userWithPlaces.length === 0) {
      return next(
        new HttpError('Could not find a places for the provided user.', 404)
      );
    }
    res.json({
      places: userWithPlaces.places.map((place) =>
        place.toObject({ getters: true })
      ),
    });

    // const places = await Place.find({ creator: userId });

    // if (!places || places.length === 0) {
    //   return next(
    //     new HttpError('Could not find a places for the provided user.', 404)
    //   );
    // }
    // res.json({
    //   places: places.map((place) => place.toObject({ getters: true })),
    // });
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not find a place right now.',
        500
      )
    );
  }
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data..', 422)
    );
  }

  const { title, description, address } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
    creator: req.userData.userId,
  });

  try {
    const user = await User.findById(req.userData.userId);

    if (!user) {
      return next(new HttpError('Could not find user for provided id', 404));
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();

    res.status(201).json({ place: createdPlace });
  } catch (error) {
    return next(new HttpError('Creating place faild, place try again.', 500));
  }
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data..', 422)
    );
  }

  const placeId = req.params.pid;
  const { title, description } = req.body;

  try {
    const updatedPlace = await Place.findById(placeId);

    if (updatedPlace.creator.toString() !== req.userData.userId) {
      return next(
        new HttpError('You are not allowed to edit this place.', 401)
      );
    }

    updatedPlace.title = title;
    updatedPlace.description = description;

    await updatedPlace.save();

    res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not update a place right now.',
        500
      )
    );
  }
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  try {
    const place = await Place.findById(placeId).populate('creator');

    if (!place) {
      return next(new HttpError('Could not find place for that id', 404));
    }

    if (place.creator.id !== req.userData.userId) {
      return next(
        new HttpError('You are not allowed to delete this place.', 401)
      );
    }

    const imagePath = place.image;

    const session = await mongoose.startSession();
    session.startTransaction();
    await place.deleteOne({ session });
    place.creator.places.pull(place);
    await place.creator.save({ session });
    session.commitTransaction();

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).json({ message: 'Deleted place.' });
  } catch (error) {
    return next(
      new HttpError('Something went wrong, could not delete a place right now.')
    );
  }
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
