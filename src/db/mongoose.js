require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user')
// Ensure the connection string starts with 'mongodb://' or 'mongodb+srv://' and is correct
const dbURI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(dbURI).then(async () => {
    console.log('Connected to MongoDB');
    await User.init();
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
