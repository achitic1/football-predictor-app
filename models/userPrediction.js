const mongoose = require(`mongoose`);

const userPredictionSchema = mongoose.Schema({
    userName: {
        type: String, 
        required: true,
        immutable: false
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
        immutable: false
    },
    date: {
        type: Date,
        required: true, 
        immutable: true
    }
});

userPredictionSchema.index({ userName: 1, homeTeam: 1, awayTeam: 1, prediction: 1, date: 1}, {unique: true});

const UserPrediction = mongoose.model(`UserPrediction`, userPredictionSchema);

module.exports = UserPrediction;