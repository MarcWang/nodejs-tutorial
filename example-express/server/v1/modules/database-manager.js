let mongoose = require('mongoose');

let User = require('./models/user');
let _instance = null;

module.exports = function() {

    function Class() {    
    }

    Class.prototype.initialize = function(callback) {
    	let dbName = process.env.DB_NAME || 'node-login';
        let dbHost = process.env.DB_HOST || 'localhost'
        let dbPort = process.env.DB_PORT || 27017;
        mongoose.model('User', User);
        mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
        this.db = mongoose.connection;
        this.db.once('open', () => {
            callback();
        });
    }

    Class.prototype.onError = function(callback){
    	let self = this;
    	self.db.on('error', (err) => {
            callback(err);
        });
    }

    Class.prototype.create = function( data, callback ) {
        var newUser = User({
            name: data.depart,
            username: data.username,
            password: data.password,
            email: data.email,
            admin: true
        });

        newUser.save(function(err) {
            if (err){
            	callback( err );
            }else{
            	callback( null, 'user was created' );
            }
        });
    }

    Class.prototype.remove = function( data, callback ) {
    	console.log(data);
    	data.remove((err) => {
    		if (err){
            	callback( err );
            }else{
            	callback( null, 'user was removed' );
            }
    	});
    }

    Class.prototype.update = function( data, callback ) {
    	console.log(data);
        data.save(function(err) {
            if (err){
            	callback( err );
            }else{
            	callback( null, 'user was updated' );
            }
        });
    }

    Class.prototype.findAll = function(callback) {
		User.find({}, function(err, users) {
			if (err){
            	callback( err );
            }else{
            	callback( null, users );
            }
		});
	}

    if (_instance === null) {
        _instance = new Class();
    }

    return _instance;
}
