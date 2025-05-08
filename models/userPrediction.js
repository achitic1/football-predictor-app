const mongoose = require(`mongoose`);

const userPredictionSchema = new mongoose.Schema({
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
    date: {
        type: Date,
        required: true, 
        immutable: true
    }
});

userPredictionSchema.index({ homeTeam: 1, awayTeam: 1, date: 1}, {unique: true});

const UserPrediction = mongoose.model(`UserPrediction`, userPredictionSchema);

module.export = UserPrediction;