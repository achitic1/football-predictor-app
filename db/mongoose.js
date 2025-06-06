const mongoose = require(`mongoose`);
const path = require(`path`);
require(`dotenv`).config({ path: path.resolve(__dirname, `../.env`)});
const mongoConnectString = process.env.MONGODB_URI;

const connectDB = () => {
    mongoose.connect(mongoConnectString)
        .then(() => {
            console.log("Mongo connected successfully");
        })
        .catch( (err) => {
            console.error("MongoDB connection error", err.message);
            process.exit(1);
        });
};

module.exports = connectDB;