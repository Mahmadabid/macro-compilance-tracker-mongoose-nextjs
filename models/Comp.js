const mongoose = require('mongoose');

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
}, { collection: process.env.NEXT_PUBLIC_DB_COLLECTION });

module.exports = mongoose.models && mongoose.models.Comp ? mongoose.models.Comp : mongoose.model(process.env.NEXT_PUBLIC_DB_COLLECTION, compSchema);
