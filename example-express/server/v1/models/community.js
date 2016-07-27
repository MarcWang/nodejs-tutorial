const mongoose = require('mongoose');
const moment = require('moment');

const communitySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    code: { type: String, required: true, unique: true },
    maxCounts: Number,
    counts: Number,
    address: { type: String, required: true, unique: true },
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

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
