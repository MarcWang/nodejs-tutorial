var fetch = require('node-fetch');
const fs = require('fs');
const zlib = require('zlib')
var AdmZip = require('adm-zip');
const out = fs.createWriteStream('input.txt.gz');
const request = require('request');
const gzip = zlib.createGzip();

var downloadAndUnzip = function(url) {

    var download = function(url) {
        return new Promise(function(resolve, reject) {
            request({
                url: url,
                method: 'GET',
                encoding: null
            }, function(err, response, body) {
                if (err) {
                    return reject(err);
                }
                resolve(body);
            });
        });
    };

    var unzip = function(buffer) {
        zlib.gunzip(buffer, function(err, result) {
            if (err) return console.error(err);
            // console.log(result.toString());

            const jsonData = JSON.parse(result.toString());
            console.log(jsonData.EssentialInfo);
            // console.log(jsonData.BusInfo.length);
            for(let i = 0; i < jsonData.BusInfo.length; i++){
            	if( jsonData.BusInfo[i].RouteID == 10293 )
            		console.log(jsonData.BusInfo[i]);
            }
            
        });
    };

    return download(url)
        .then(unzip);
};

downloadAndUnzip('http://data.taipei/bus/EstimateTime')

// 預估到站時間 http://data.taipei/bus/EstimateTime
// http://data.taipei/opendata/datalist/datasetMeta/preview?id=f11a5af0-7b37-48ef-98cc-f6f102ed43c6&rid=4f081f55-5c92-4805-ad3c-dc66fec30b02
// 
// 
// 路線、營業站對應 http://data.taipei/bus/OrgPathAttribute
// http://data.taipei/opendata/datalist/datasetMeta/preview?id=2181b885-02da-4124-a673-3ca6546c1f1d&rid=8c343c52-dfb4-4788-bd47-16eb97ac321e
// 
// 車輛基本資訊 http://data.taipei/bus/CarInfo
// 
// 公車路線線型開放格式 http://data.taipei/bus/ROUTEGeom
// http://data.taipei/opendata/datalist/datasetMeta/preview?id=2ed9ecfe-83ef-4443-8776-a3db8be3d7c5&rid=6727a68d-6dbf-4857-a792-223c061b69e5