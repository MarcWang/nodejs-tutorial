const mongoose = require('mongoose'),
    Schema = mongoose.Schema

var personDetailSchema = Schema({
    person: { type: Schema.Types.ObjectId, ref: 'Person' },
    age: Number,
    gender: Number
});

module.exports = mongoose.model('PersonDetail', personDetailSchema);

