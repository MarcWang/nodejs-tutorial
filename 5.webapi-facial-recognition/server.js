require('dotenv').config();
var unirest = require('unirest');
var FacePlusPlus = require('./faceplusplus.js');
var SkyBiometry = require('./skybiometry.js');

var IMG_URI_LENA = encodeURIComponent('https://raw.githubusercontent.com/MarcWang/tcitsdk-nodejs/master/image/lena.jpg');
var IMG_URI_PATTY = encodeURIComponent('https://raw.githubusercontent.com/MarcWang/tcitsdk-nodejs/master/image/patty.jpg');

var API_KEY = process.env.FACEPLUSPLUS_API_KEY;
var API_SECRET = process.env.FACEPLUSPLUS_API_SECRET;

var SKY_API_KEY = process.env.SKY_API_KEY;
var SKY_API_SECRET = process.env.SKY_API_SECRET;

// var faceService = new FacePlusPlus(API_KEY, API_SECRET);
// faceService.FaceDetect(IMG_URI_LENA, function(err, res){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(res);
// 	}
// });

// var faceService = new SkyBiometry(SKY_API_KEY, SKY_API_SECRET);
// faceService.FaceDetect(IMG_URI_LENA, function(err, res){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(res);
// 	}
// });