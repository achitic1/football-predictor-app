const express = require(`express`);
const app = express();
const path = require(`path`);
const ejs = require(`ejs`);

// Configuring my env file
require('dotenv').config();

// Setting up the renderer
app.set(`view engine`, `ejs`);
app.set(`views`, path.resolve(__dirname, `views`));

// MongoDB Variables
const uri = process.env.MONGO_CONNECTION_STRING;
const dbAndCol = {db: "CMSC335", collection: "predictionsCollection"};

// Connecting to MongoDB MIGHT NOT USE BECAUSE I WOULD LIKE TO TRY USING MONGOOSE
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
// client.connect()
// .then(() => console.log(`Connected to MongoDB`))
// .catch((err) => console.error(`MongoDB connection error: `, err));

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
