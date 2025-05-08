const express = require(`express`);
const router = express.Router();

// Main route that will load the main page
router.get(`/`, (req, res) => {
    res.render(`index`);
});

module.exports = router;

