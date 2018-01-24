const mongoose = require('mongoose');

const viewerSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: false },
    name: { type: String, required: true, unique: false },
    created_at: Date,
    updated_at: Date
});

viewerSchema.pre('save', function(next) {
    let currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

const Viewers = mongoose.model('Viewers', viewerSchema);
module.exports = Viewers;


