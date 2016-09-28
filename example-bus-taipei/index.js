const fs = require('fs');
const zlib = require('zlib')
const request = require('request');

function getRoute() {
    return new Promise(function(resolve, reject) {
        request({
            url: 'http://data.taipei/bus/ROUTE',
            method: 'GET',
            encoding: null
        }, function(err, response, body) {
            if (err) {
                return reject(err);
            } else {
                zlib.gunzip(body, function(err, result) {
                    if (err) return console.error(err);

                    const jsonData = JSON.parse(result.toString());
                    console.log(jsonData.EssentialInfo);
                    console.log(jsonData.BusInfo[0])

                });
            }
        });
    });
};

function getEstimateTime() {
    return new Promise(function(resolve, reject) {
        request({
            url: 'http://data.taipei/bus/EstimateTime',
            method: 'GET',
            encoding: null
        }, function(err, response, body) {
            if (err) {
                return reject(err);
            } else {
                zlib.gunzip(body, function(err, result) {
                    if (err) return console.error(err);

                    const jsonData = JSON.parse(result.toString());
                    // console.log(jsonData.EssentialInfo);
                    // console.log(jsonData.BusInfo[0])
                    for (let i = 0; i < jsonData.BusInfo.length; i++) {
                        if( jsonData.BusInfo[i].RouteID == 16184)
                            console.log(jsonData.BusInfo[i]);
                    }

                });
            }
        });
    });
};

function getStop() {
    return new Promise(function(resolve, reject) {
        request({
            url: 'http://data.taipei/bus/Stop',
            method: 'GET',
            encoding: null
        }, function(err, response, body) {
            if (err) {
                return reject(err);
            } else {
                zlib.gunzip(body, function(err, result) {
                    if (err) return console.error(err);

                    const jsonData = JSON.parse(result.toString());
                    // console.log(jsonData.EssentialInfo);
                    // console.log(jsonData.BusInfo[0])
                    // for (let i = 0; i < jsonData.BusInfo.length; i++) {
                    //     if( jsonData.BusInfo[i].RouteID == 16184)
                    //         console.log(jsonData.BusInfo[i]);
                    // }

                });
            }
        });
    });
};

getRoute()
    .then(() => {})

getStop()
    .then(() => {
    })

getEstimateTime()
    .then(() => {
    })


// downloadAndUnzip('http://data.taipei/bus/EstimateTime')

// http://data.taipei/bus/ROUTE
// http://data.taipei/bus/Stop

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
