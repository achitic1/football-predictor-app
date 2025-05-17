const express = require(`express`);
const app = express();
const path = require(`path`);
const ejs = require(`ejs`);
const connectDB = require(`./db/mongoose.js`);

// Configuring my env file
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Setting up the renderer
app.set(`view engine`, `ejs`);
app.set(`views`, path.resolve(__dirname, `views`));

// Middleware for parsing post request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware for exposing my stylesheet and other files
app.use(express.static('public'));


// Routes
const indexRoutes = require(`./routes/index`);
const predictionRoutes = require(`./routes/predictions`);
const upcomingGamesRoutes = require(`./routes/upcoming-games`);

// Routes
app.use(`/`, indexRoutes);
app.use(`/predictions`, predictionRoutes);
app.use(`/upcoming-games`, upcomingGamesRoutes);

module.exports = app;
