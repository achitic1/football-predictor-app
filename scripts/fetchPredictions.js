const axios = require(`axios`);
const APIPrediction = require(`../models/apiPrediction.js`);
const path = require(`path`);
require(`dotenv`).config( {path: path.resolve(__dirname, `../.env`)});
const footballPredictionAPIKey = process.env.FOOTBALL_PREDICTION_API_KEY;

const fetchAndStorePredictions = async () => {
  try {
    const response = await axios.request({
      method: 'GET',
      url: 'https://football-prediction-api.p.rapidapi.com/api/v2/predictions',
      params: {
        market: 'classic',
        iso_date: new Date().toISOString().split('T')[0],
        federation: 'UEFA'
      },
      headers: {
        'x-rapidapi-key': footballPredictionAPIKey,
        'x-rapidapi-host': 'football-prediction-api.p.rapidapi.com'
      }
    });

    const predictions = response.data.data; // The returned json object has a data attribute which is the list of predictions

    // Map each prediction to a save promise
    const savePromises = predictions.map((p) => {
      const newPrediction = new APIPrediction({
        matchId: p.id,
        homeTeam: p.home_team,
        awayTeam: p.away_team,
        prediction: p.prediction,
        startDate: p.start_date
      });

      return newPrediction.save()
        .then(() => {
          console.log(`Saved: ${p.home_team} vs ${p.away_team}`);
        })
        .catch((err) => {
          console.error(`Error saving match ID ${p.id}:`, err.message);
        });
    });

    // Wait for all save operations to finish
    await Promise.all(savePromises);

    console.log('All predictions processed.');

  } catch (err) {
    console.error('Error fetching predictions:', err.message);
  }
};

module.exports = fetchAndStorePredictions;