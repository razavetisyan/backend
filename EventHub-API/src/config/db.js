const mongoose = require('mongoose');

async function connectDB(MONGO_URI) {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected MongoDB');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

module.exports = connectDB;