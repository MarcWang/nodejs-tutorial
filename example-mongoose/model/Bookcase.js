const mongoose = require('mongoose');

const BookcaseSchema = mongoose.Schema({
    list: [{ type: String, limit: 10 }],
    create_at: { type: Date, required: false, unique: false, default: new Date() },
    update_at: { type: Date, required: false, unique: false, default: new Date() }
});
module.exports = mongoose.model('Bookcase', BookcaseSchema);
