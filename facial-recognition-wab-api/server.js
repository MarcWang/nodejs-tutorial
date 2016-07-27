var unirest = require('unirest');
var FacePlusPlus = require('./faceplusplus.js');
var SkyBiometry = require('./skybiometry.js');

var IMG_URI_LENA = encodeURIComponent('https://raw.githubusercontent.com/MarcWang/tcitsdk-nodejs/master/image/lena.jpg');
var IMG_URI_PATTY = encodeURIComponent('https://raw.githubusercontent.com/MarcWang/tcitsdk-nodejs/master/image/patty.jpg');

var API_KEY = '0e77661c2b91c20bed2ba995574db184';
var API_SECRET = 'yONLCNc--FOWmosMQBIfORy5idp28i7g';

var SKY_API_KEY = 'eb88d8300e63424cbb6d65d871f913a9';
var SKY_API_SECRET = '0afcecc0449a441d80e3976bfef3e91d';

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

