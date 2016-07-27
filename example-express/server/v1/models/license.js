const mongoose = require('mongoose');
const moment = require('moment');

const communitySchema = new mongoose.Schema({
    communityName: { type: String, required: true, unique: true },
    communityDescription: String,
    communityCode: { type: String, required: true, unique: true },
    familyCode: { type: String, required: true },
    maxCounts: Number,
    address: String,
    createTime: Date,
    updateTime: Date
});

communitySchema.pre('save', function(next) {
    if (this.isNew) {
        this.createTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        next();
    } else {
        next();
    }
});

const License = mongoose.model('License', communitySchema);

module.exports = License;
