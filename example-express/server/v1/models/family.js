const mongoose = require('mongoose');
const moment = require('moment');

const familySchema = new mongoose.Schema({
    community: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: String,
    code: { type: String, required: true, unique: true },
    maxCounts: { type: Number, required: true, max: 10 },
    counts: Number,
    address: { type: String, required: true, unique: true },
    createTime: Date,
    updateTime: Date
});

familySchema.pre('save', function(next) {
    if (this.isNew) {
        this.createTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        next();
    } else {
        next();
    }
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
