const mongoose = require('mongoose');
const moment = require('moment');

const memberSchema = new mongoose.Schema({
    family: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: String,
    code: { type: String, required: true, unique: true },
    createTime: Date,
    updateTime: Date
});

memberSchema.pre('save', function(next) {
    if (this.isNew) {
        this.createTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        next();
    } else {
        next();
    }
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
