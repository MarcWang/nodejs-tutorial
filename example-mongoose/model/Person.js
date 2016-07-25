const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const personSchema = Schema({
    name: { type: String, required: true, unique: true },
    detail: { type: String, ref: 'PersonDetail' }
});

function autoPopulate(next) {
    this.populate('detail');
    next();
};

personSchema
    .pre('findOne', autoPopulate)
    .pre('find', autoPopulate);

module.exports = mongoose.model('Person', personSchema);
