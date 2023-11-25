const express = require('express');

const PlacesRoutes = require('./routes/places-routes');

const app = express();

app.use(express.json());

// Regiser routes
app.use('/api/places', PlacesRoutes);

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
