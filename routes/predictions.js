const express = require(`express`);
const router = express.Router();
const UserPrediction = require(`../models/userPrediction.js`);
const APIPrediction = require(`../models/apiPrediction.js`);

router.get(`/`, async (req, res) => {
    try {
            const variables = {
                userPredictionsTable: `<table border="1"><tr><th>User's Name</th><th>Home Team</th><th>Away Team</th><th>Their Prediction</th><th>Date Made</th></tr>`,
            };
    
            const allPredictions = await UserPrediction.find({});
    
            allPredictions.forEach((prediction) => {
                variables.userPredictionsTable += `<tr><td>${prediction.userName}</td><td>${prediction.homeTeam}</td><td>${prediction.awayTeam}</td><td>${prediction.prediction}</td><td>${prediction.date}</td></tr>`;
            });
    
            variables.userPredictionsTable += `</table>`;
    
            res.render(`view-predictions`, variables);
        } catch(err) {
            console.log("Error: Displaying the upcoming games,", err.message);
        }
});

router.get(`/make-prediction`, async (req, res) => {
    try {
        const variables = {
            matchOptions: ""
        };

        const allMatches = await APIPrediction.find({});

        allMatches.forEach( match => {
            variables.matchOptions += `<option value="${match.matchId}">${match.homeTeam} v. ${match.awayTeam}</option>`;
        });

        res.render(`make-prediction`, variables);
    } catch(err) {
        console.log(`Error: Cannot load make prediction page,`, err.message);
    }
});

router.post(`/make-prediction`, async (req, res) => {
    try {
        const userData = {
            matchId: Number(req.body.matches),
            userName: req.body.userName,
            prediction: req.body.prediction
        }

        const selectedMatch = await APIPrediction.find({matchId: userData.matchId});

        if (!selectedMatch.length) {
            return res.status(404).send('Match not found');
        }

        const newUserPrediction = new UserPrediction({
            userName: userData.userName,
            homeTeam: selectedMatch[0].homeTeam,
            awayTeam: selectedMatch[0].awayTeam,
            prediction: userData.prediction,
            date: (new Date).toISOString().split('T')[0]
        });

        await newUserPrediction.save()

        res.redirect(`/predictions`);
    } catch(err) {
        console.log(`Error: Cannot send prediction,`, err.message);
    }
});

module.exports = router;