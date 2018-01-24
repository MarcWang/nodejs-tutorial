var unirest = require('unirest');

var SkyBiometry = function(apiKey, apiSecret) {
    var self = this;
    self.apiKey = apiKey;
    self.apiSecret = apiSecret;
    self.apiServer = 'http://api.skybiometry.com/fc/';

    self.API = {
        FaceDetect: self.apiServer + 'faces/detect.json?'
    }
};

SkyBiometry.prototype.FaceDetect = function(image, callback) {
    var self = this;

    if (typeof image == 'string') {
        unirest.get(self.API.FaceDetect + "api_key=" + self.apiKey + "&api_secret=" + self.apiSecret + "&urls=" + image + "&attributes=all")
            .header("Accept", "application/json")
            .end(function(result) {
                if (result.status == 200) {
                    callback(null, result.body);
                } else {
                    callback(result.status);
                }
            });
    }
};

module.exports = SkyBiometry;
