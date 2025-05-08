const mongoose = require(`mongoose`);
const APIPrediction = require(`../models/apiPrediction.js`);

function clearCollection() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        return APIPrediction.deleteMany({});
    })
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