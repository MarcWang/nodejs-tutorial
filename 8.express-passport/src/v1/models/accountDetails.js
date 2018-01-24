const mongoose = require('mongoose');
const moment = require('moment');
const Account = require('./account');

const accountSchema = new mongoose.Schema({
    account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    thumbnail : Buffer,
    permission: String,
    email: String,
    phone: String,
    created_at: Date,
    updated_at: Date
});

accountSchema.pre('save', function(next) {
    let currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

module.exports = mongoose.model('AccountDetails', accountSchema);
