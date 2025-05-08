const mongoose = require(`mongoose`);

const apiPredictionSchema = mongoose.Schema({
    matchId: {
        type: Number,
        required: true,
        immutable: true
    },
    homeTeam: {
        type: String,
        required: true,
        immutable: true
    }, 
    awayTeam: {
        type: String,
        required: true,
        immutable: true
    },
    prediction: {
        type: String,
        required: true,
        immutable: true
    }, 
    startDate: {
        type: String,
        required: true,
        immutable: true
    }
});

apiPredictionSchema.index({matchId: 1}, {unique: true});

const APIPrediction = mongoose.model(`APIPrediction`, apiPredictionSchema);

module.exports = APIPrediction;