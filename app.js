const express = require(`express`);
const app = express();
const path = require(`path`);
const ejs = require(`ejs`);
const connectDB = require(`./db/mongoose.js`);

// Configuring my env file
require('dotenv').config();

// Setting up the renderer
app.set(`view engine`, `ejs`);
app.set(`views`, path.resolve(__dirname, `views`));

// Connect to MongoDB
connectDB();

// Routes
const indexRoutes = require(`./routes/index`);
const predictionRoutes = require(`./routes/predictions`);
const upcomingGamesRoutes = require(`./routes/upcoming-games`);

// Middleware for parsing post request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(`/`, indexRoutes);
app.use(`/predictions`, predictionRoutes);
app.use(`/upcoming-games`, upcomingGamesRoutes);

module.exports = app;
