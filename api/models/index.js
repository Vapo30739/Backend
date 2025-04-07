const mongoose = require('mongoose');

const dbURI = process.env.DB_URI;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI,clientOptions);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = { connectDB };
