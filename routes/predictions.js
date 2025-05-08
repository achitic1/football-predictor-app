const express = require(`express`);
const router = express.Router();

// Main route that will load the main page
router.get(`/`, (req, res) => {
    const variables = {
        predictionsList: "None"
    };

    res.render(`view-predictions`, variables);
});

router.get(`/make-prediction`, (req, res) => {
    const variables = {
        matchOptions: "none"
    };

    res.render(`make-prediction`, variables);
});

module.exports = router;