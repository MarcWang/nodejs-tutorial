var unirest = require('unirest');

var FacePlusPlus = function(apiKey, apiSecret) {
    var self = this;
    self.apiKey = apiKey;
    self.apiSecret = apiSecret;
    self.apiServer = 'https://apius.faceplusplus.com/v2/';

    self.API = {
        FaceDetect: self.apiServer + 'detection/detect?'
    }
};

FacePlusPlus.prototype.FaceDetect = function(image, callback) {
    var self = this;

    if (typeof image == 'string') {
        unirest.get(self.API.FaceDetect + "url=" + image + "&api_secret=" + self.apiSecret + "&api_key=" + self.apiKey + "&attribute=glass,pose,gender,age,race,smiling")
            .header("Accept", "application/json")
            .end(function(result) {
                if (result.status == 200) {
                    callback(null, result.body);
                } else {
                    callback(result.status);
                }
            });
    }else if( typeof image == 'buffer'){
    }
};

module.exports = FacePlusPlus;