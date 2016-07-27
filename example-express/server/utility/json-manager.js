let jsonfile = require('jsonfile');
let path = process.cwd();

let appConfigFile = path + '/config.json';
let licenseConfigFile = path + '/license.json';

let appConfig = undefined;
let licenseConfig = undefined;

function readAppConfigJson(){
	return jsonfile.readFileSync(appConfigFile);
}

function readLicenseConfigJson(){
	return jsonfile.readFileSync(licenseConfigFile);
}

exports.getAppConfig = function() {
	if( appConfig == undefined ){
    	appConfig = readAppConfigJson();
	}
	return appConfig;
}

exports.getLicenseConfig = function() {
	if( licenseConfig == undefined ){
    	licenseConfig = readLicenseConfigJson();
	}
	return licenseConfig;
}