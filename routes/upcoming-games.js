const express = require(`express`);
const router = express.Router();
const APIPrediction = require(`../models/apiPrediction.js`)

router.get(`/`, async (req, res) => {
    try {
        const variables = {
            upcomingGamesList: `<table border="1"><tr><th>Home Team</th><th>Away Team</th><th>Start Time</th><th>Our Prediction</th></tr>`,
            currentDay: (new Date).toISOString().split('T')[0]
        };

        const allPredictions = await APIPrediction.find({});

        allPredictions.forEach((prediction) => {
            variables.upcomingGamesList += `<tr><td>${prediction.homeTeam}</td><td>${prediction.awayTeam}</td><td>${prediction.startDate}</td><td>${prediction.prediction}</td></tr>`;
        });

        variables.upcomingGamesList += `</table>`;

        res.render(`upcoming-games`, variables);
    } catch(err) {
        console.log("Error: Displaying the upcoming games", err.message);
    }
});

module.exports = router;