const mongoose = require('mongoose');
const moment = require('moment');
const crypto = require('crypto');

let encryption = function(pass, callback) {
    const secret = 'ThisIsSecretPassword';
    const hash = crypto.createHmac('sha256', secret)
        .update(pass)
        .digest('hex');
    callback(hash);
}

const userSchema = new mongoose.Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordResetToken: String,
    passwordResetExpires: Date,
    email: String,
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        gender: String,
        website: String
    },
    created_at: Date,
    updated_at: Date
});

userSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        encryption(this.password, (res) => {
            this.password = res;
            if( this.isNew ){
                this.created_at = moment().format('MMMM Do YYYY, h:mm:ss a');
            }else{
                this.updated_at = moment().format('MMMM Do YYYY, h:mm:ss a');
            }
            next();
        });
    } else {
        next();
    }
});


userSchema.methods.comparePassword = function(candidatePassword, cb) {
    encryption(candidatePassword, (res) => {
        console.log(`res ${res}, password ${this.password}`);
        cb(null, this.password === res);
    })
};


const User = mongoose.model('User', userSchema);

module.exports = User;
