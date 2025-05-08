const mongoose = require('mongoose');
const fetchAndStorePredictions = require('./fetchPredictions.js');
const path = require(`path`);
require('dotenv').config({ path: path.resolve(__dirname, `../.env`)});

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await fetchAndStorePredictions();
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

run();
