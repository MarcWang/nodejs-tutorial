var cluster = require('cluster');

var clusterProc = function(workList, callback) {
    if (cluster.isMaster) {
        var numWorkers = require('os').cpus().length;
        var dataLength = workList.length;
        // console.log(workList);
        console.log("1");

        if (dataLength < numWorkers) {
            numWorkers = dataLength;
        }

        var finishWork = [];
        for (var i = 0; i < numWorkers; i++) {
            console.log("1-1");
            var worker = cluster.fork();

            cluster.workers[i+1].send({
                type: workList[i].type,
            });     

            worker.on('message', function(message) {
                console.log("2");
                // console.log('finish work' + message);
                finishWork.push({
                    type: message.type,
                    result: message.result
                })
                if (finishWork.length == numWorkers) {
                    callback(z);
                }
            });
        }

        cluster.on('online', function(worker) {
            console.log("3");
            // console.log('Worker ' + worker.process.pid + ' is online');
        });

        cluster.on('exit', function(worker, code, signal) {
            console.log("4");
            // console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
            var worker = cluster.fork();
            worker.on('message', function(message) {
                console.log("5");
                // console.log(message.from + ': ' + message.type + ' ' + message.data.msg + ' = ' + message.data.result);
            });
        });
    } else {
        process.on('message', function(message) {
            console.log("6");
            // console.log(message);
            workList.forEach(function(work){
                if( work.type == message.type ){
                     process.send({
                        type: message.type,
                        result: work.func(work.params[0], work.params[1])
                    });
                }
            })
        });
    }
};

module.exports = clusterProc;
