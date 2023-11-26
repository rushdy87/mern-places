const express = require('express');

const HttpError = require('./models/http-error');
const PlacesRoutes = require('./routes/places-routes');
const UsersRoutes = require('./routes/users-routes');

const app = express();

app.use(express.json());

// Regiser routes
app.use('/api/places', PlacesRoutes);
app.use('/api/users', UsersRoutes);

app.use((req, res, next) => {
  return next(new HttpError('Could not find this route.', 404));
});

// Error handling medilware
// This functon will execute when any middleware in front of it yield an erroe
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occurred!' });
});

const PORT = 3030;

app.listen(PORT, () => console.log(`The server listennin to port ${PORT}...`));
