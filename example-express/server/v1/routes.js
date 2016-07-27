const userRouter = require('./userRouter');
const licenseRouter = require('./licenseRouter');

const API_VERSION = '/v1';

module.exports = function (app, logHandler) {

	app.use( `${API_VERSION}/user`, userRouter);
	app.use( `${API_VERSION}/license`, licenseRouter);

	app.get('/', (req, res, next) => {
		console.log("get");
		next();
	});
	
	app.post('/', (req, res, next) => {
		console.log("post");
		next();
	});
};