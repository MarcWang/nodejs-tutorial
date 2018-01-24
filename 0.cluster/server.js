var ClusterProc = require('./clusterProc');
let workDispatcher = require('./workDispatcher');
const uuid = require('node-uuid');

function doWork1(param1) {
    var value = 0;
    for (var i = 0; i < param1; i++) {
        for (var j = 0; j < 10000; j++) {
            value = (i + j) * 1 * 2;
        }
    }
    return value;
};

function doWork2(param1, param2) {
    var value = 0;
    for (var i = 0; i < param1; i++) {
        for (var j = 0; j < param2; j++) {
            value = (i + j) * 1 * 2;
        }
    }
    return value;
};

function doWork3(param1, param2) {
    var value = 0;
    for (var i = 0; i < param1; i++) {
        for (var j = 0; j < param2; j++) {
            value = (i + j) * 1 * 2;
        }
    }
    return value;
};

var argv = {
    type: null,
    func: null,
    params: []
}

var work_1 = {
    func: doWork1,
    params: [1000]
}

var work_2 = {
    func: doWork2,
    params: [12000, 99999]
}

var work_3 = {
    func: doWork3,
    params: [5000, 99999]
}

var work_4 = {
    func: doWork3,
    params: [9000, 99999]
}

var work_5 = {
    func: doWork3,
    params: [3000, 99999]
}


function processWork(param1, param2) {
    var value = 0;
    for (var i = 0; i < param1; i++) {
        for (var j = 0; j < param2; j++) {
            value = (i + j) * 1 * 2;
        }
    }
    return value;
};

// var worklist = [];

// worklist.push(work_1);
// worklist.push(work_2);
// worklist.push(work_3);
// worklist.push(work_4);
// worklist.push(work_5);

// var proc = new ClusterProc(worklist, function(res){
// 	console.log(res);
// });

let proc = new workDispatcher();

proc.onFinishWork((err, res) => {
    console.log(res)
})
// for (let i = 0; i < 1; i++) {
	work_1.id = uuid.v1();
    proc.emitWork(work_1);
    // work_2.id = proc.genId();
    // proc.emitWork(work_2);
    // work_3.id = proc.genId();
    // proc.emitWork(work_3);
    // work_4.id = proc.genId();
    // proc.emitWork(work_4);
    // work_5.id = proc.genId();
    // proc.emitWork(work_5);
// }
