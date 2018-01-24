var request = require('request');

const API_SCHEDULE_INIERNATIONAL = 'http://ptx.transportdata.tw/MOTC/v2/Air/GeneralSchedule/International';


function syncSchedule(airline) {
    let params = {};
    params['$format'] = 'json';
    // params['$top'] = 30;
    params['$filter'] = `AirlineID eq '${airline}'`;
    request({ url: API_SCHEDULE_INIERNATIONAL, qs: params }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const json_data = JSON.parse(body);
            console.log(json_data);
            // for(const data of json_data){
            //     console.log(data);
            // } 
        }
    })
}

syncSchedule('BR');

