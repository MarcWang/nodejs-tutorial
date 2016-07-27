const cluster = require('cluster');
const EventEmitter = require('events');
const numWorkers = require('os').cpus().length;
const util = require('util');
const uuid = require('node-uuid');

let workMap = new Map();

class Handler {
    constructor() {
        this.enableWorkerListen = false;
        this.enableMasterListen = new Map();
        // this.workMap = new Map();
        this.emitter = new EventEmitter();

        this.workList = [];
        this.workQue = [];
        if (cluster.isMaster) {
            for (let i = 0; i < numWorkers; i++) {
                let worker = cluster.fork();
                this.workList.push(worker.id);
            }

            cluster.on('online', (worker) => {
                console.log('Worker ' + worker.process.pid + ' is online');
            });

            cluster.on('exit', (worker, code, signal) => {
                console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
            });
        }
    }
    emitWork(workInstance) {

        let self = this;

        if (cluster.isMaster) {

            if (workMap.has(workInstance.id)) {
                return;
            }
            console.log(workInstance.id)
            workMap.set(workInstance.id, workInstance);
            console.log(workMap.has(workInstance.id));
        }



        if (cluster.isMaster) {
            let workId = self.workList.pop();
            cluster.workers[workId].send(workInstance);
            self.workList.unshift(workId);

            if (!self.enableMasterListen[workId]) {
                self.enableMasterListen[workId] = true;
                cluster.workers[workId].on('message', (work) => {
                    console.log('finish work ' + workId + " , " + work.id + " , " + work.result);
                    self.emitter.emit('EVENT_FINISH', {
                        id: work.id,
                        result: work.result
                    });
                });
            }

        } else {
            if (!self.enableWorkerListen) {
                self.enableWorkerListen = true;
                process.on('message', (instance) => {
                    let workProcess = workMap.get(instance.id);
                    console.log(instance.id);
                    console.log(workMap.has(instance.id));

                    process.send({
                        id: instance.id,
                        result: workProcess.func(instance.params[0], instance.params[1])
                    })
                });
            }
        }
    }

    onFinishWork(cb) {
        let self = this;
        self.emitter.on('EVENT_FINISH', (data) => {
            cb(null, data);
        })
    }

    genId() {
        return uuid.v1();
    }
}

module.exports = Handler;
