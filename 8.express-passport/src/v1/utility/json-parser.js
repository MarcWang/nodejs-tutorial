let jsonfile = require('jsonfile');
let fs = require('fs');
let path = process.cwd();

let appConfigFile = path + '/config.json';
let appConfig = undefined;

function readAppConfigJson() {
    return jsonfile.readFileSync(appConfigFile);
}

exports.getAppConfig = function() {
    if (appConfig == undefined) {
        if (fs.existsSync(appConfigFile)) {
            appConfig = readAppConfigJson();
        }else{
        } 
    }
    return appConfig;
}
