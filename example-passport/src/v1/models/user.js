const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    faces: [{ feature: Buffer, confidence: Number }],
    counts: Number,
    email: String,
    phone: String,
    age: Number,
    gender: String,
    created_at: Date,
    updated_at: Date
});

userSchema.pre('save', function(next) {
    let currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
