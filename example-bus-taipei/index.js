const fs = require('fs');
const zlib = require('zlib')
const request = require('request');
const Immutable = require('immutable');

let TPERouteList = new Map();
let TPERouteNameMap = new Map();
let TPERouteStopList = new Map();
let TPERouteStopNameMap = new Map();

function getRoute() {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://data.taipei/bus/ROUTE',
            method: 'GET',
            encoding: null
        }, (err, response, body) => {
            if (err) {
                return reject(err);
            } else {
                zlib.gunzip(body, function(err, result) {
                    if (err) return console.error(err);
                    const jsonData = JSON.parse(result.toString());
                    for (let i = 0; i < jsonData.BusInfo.length; i++) {
                        let name = jsonData.BusInfo[i].nameZh;
                        let id = jsonData.BusInfo[i].Id;
                        let data = jsonData.BusInfo[i];
                        let value = [];
                        if (TPERouteList.has(id)) {
                            value = TPERouteList.get(id);
                        }
                        value.push(data);
                        TPERouteList.set(id, value);
                        TPERouteNameMap.set(name, id);
                    }
                    resolve();
                });
            }
        });
    });
};

function getStop() {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://data.taipei/bus/Stop',
            method: 'GET',
            encoding: null
        }, (err, response, body) => {
            if (err) {
                return reject(err);
            } else {
                zlib.gunzip(body, function(err, result) {
                    if (err) return console.error(err);
                    const jsonData = JSON.parse(result.toString());
                    for (let i = 0; i < jsonData.BusInfo.length; i++) {
                        let id = jsonData.BusInfo[i].Id;
                        let name = jsonData.BusInfo[i].nameZh;
                        let data = jsonData.BusInfo[i];
                        TPERouteStopNameMap.set(id, name);
                        TPERouteStopList.set(id, data)
                    }
                    resolve();
                });
            }
        });
    });
};

function translateTime(sec) {
    if (sec > 60) {
        let m = Math.floor(sec / 60);
        let s = sec % 60;
        return `${m} 分 ${s} 秒`
    } else {
        let s = sec;
        return `${s} 秒`;
    }
}

function getEstimateTime(name) {
    return new Promise((resolve, reject) => {

        let id = TPERouteNameMap.get(name);
        console.log(`id = ${id} , name: ${name}`);

        request({
            url: 'http://data.taipei/bus/EstimateTime',
            method: 'GET',
            encoding: null
        }, (err, response, body) => {
            if (err) {
                return reject(err);
            } else {
                zlib.gunzip(body, function(err, result) {
                    if (err) return console.error(err);
                    const jsonData = JSON.parse(result.toString());
                    for (let i = 0; i < jsonData.BusInfo.length; i++) {
                        let routeId = jsonData.BusInfo[i].RouteID;
                        if (routeId == id) {
                            let stopId = jsonData.BusInfo[i].StopID;
                            let estimateTime = jsonData.BusInfo[i].EstimateTime;
                            let stopName = TPERouteStopNameMap.get(stopId);
                            let goBack = jsonData.BusInfo[i].GoBack;
                            if( goBack == 0 ){
                            	console.log(`Name: ${stopName}, Time: ${translateTime(estimateTime)}`);
                            }
                            else{

                            }
                        }
                    }
                });
            }
        });
    });
};



getRoute()
    .then(() => {
        // TPERouteList.forEach((value, key, map) => {
        //     for (let i = 0; i < value.length; i++) {
        //     	console.log(`id = ${key} , ${value[i].pathAttributeName}`);
        //     }
        // });
        // TPERouteNameMap.forEach((value, key, map) => {
        //     console.log(`name = ${key}, id = ${value}`);
        // });
        getStop()
            .then(() => {
                // TPERouteStopList.forEach((value, key, map) => {
                //     console.log(`id = ${key} , ${value.nameZh}`);
                // })
                setInterval(() => {
                    let busName = '518';
                    getEstimateTime(busName)
                        .then(() => {})
                }, 10*1000)
            })
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
