const axios = require('axios');
const HttpError = require('../models/http-error');

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://us1.locationiq.com/v1/search?key=${
      process.env.LOCATION_IQ_API_KEY
    }&q=${encodeURIComponent(address)}&format=json`
  );

  const data = response.data[0];

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  const coordinates = {
    lat: data.lat,
    lng: data.lon,
  };

  return coordinates;
}

module.exports = getCoordsForAddress;
