const mongoose = require('mongoose');
const moment = require('moment');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    persons: [{ name: String }],
    created_at: Date,
    updated_at: Date
});

groupSchema.pre('save', function(next) {
    let currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
