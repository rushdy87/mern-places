const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const HttpError = require('./models/http-error');
const PlacesRoutes = require('./routes/places-routes');
const UsersRoutes = require('./routes/users-routes');

const app = express();

app.use(express.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// Regiser routes
app.use('/api/places', PlacesRoutes);
app.use('/api/users', UsersRoutes);

app.use((req, res, next) => {
  return next(new HttpError('Could not find this route.', 404));
});

// Error handling medilware
// This functon will execute when any middleware in front of it yield an erroe
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`The server listennin to port ${process.env.PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
