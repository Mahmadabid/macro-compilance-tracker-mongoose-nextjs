const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Schema
const compSchema = new mongoose.Schema({
    calories: {
        target: Number,
        gain: Number
    },
    carbs: {
        target: Number,
        gain: Number
    },
    fat: {
        target: Number,
        gain: Number
    },
    protein: {
        target: Number,
        gain: Number
    },
    date: { index: true, type: String }
}, { collection: process.env.DB_COLLECTION });

// Export the model, If it exists then return it, if not then create it
module.exports = mongoose.models && mongoose.models.Comp ? mongoose.models.Comp : mongoose.model(process.env.DB_COLLECTION, compSchema);
