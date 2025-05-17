const mongoose = require(`mongoose`);
const APIPrediction = require(`../models/apiPrediction.js`);
const path = require(`path`);
require(`dotenv`).config({path: path.resolve(__dirname, `../.env`)});

function clearCollection() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => APIPrediction.deleteMany({}) )
    .then(() => {
        console.log('Collection cleared');
    })
    .catch(err => {
        console.error('Clearing Collection Error:', err.message);
    })
    .finally(() => {
        mongoose.disconnect().then( () => console.log(`Disconnected`));
    });
}

clearCollection();