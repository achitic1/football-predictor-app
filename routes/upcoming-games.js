const express = require(`express`);
const router = express.Router();

// Main route that will load the main page
router.get(`/`, (req, res) => {
    const variables = {
        upcomingGamesList: "None",
        currentWeekend: "None"
    };

    res.render(`upcoming-games`, variables);
});

module.exports = router;