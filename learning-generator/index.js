function callbackFunc(delayTime, cb) {
    setTimeout(() => {
        cb(null, delayTime);
        return;
    }, delayTime);
}

// setTimeout 模擬調用一個非同步的API
// 執行完調用 callback 函數傳送結果回去

// 傳統需要執行3個非同步函數時撰寫的方式，會造成程式碼過多的階層
callbackFunc(1000, (err, value) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`call first function was done in ${value}ms using callback`);
        callbackFunc(value * 2, (err, value) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`call second function was done in ${value}ms using callback`);
                callbackFunc(value * 2, (err, value) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(`call final function was done in ${value}ms using callback`);
                    }
                })
            }
        })
    }
})

function promiseFunc(delayTime) {
    return new Promise((resolve, reject) => {
        setTimeout((value) => {
            if (delayTime < 2000) resolve(delayTime);
            else reject(delayTime);
            return;
        }, delayTime);
    })
}

promiseFunc(1000)
    .then((value) => {
        console.log(`call first function was done in ${value}ms using promise`);
        promiseFunc(value * 2)
            .then((value) => {
                console.log(`call second function was done in ${value}ms using promise`);
                promiseFunc(value * 2)
                    .then((value) => {
                        console.log(`call final function was done in ${value}ms using promise`);
                    })
                    .catch((error) => {
                        console.log(`Promise Error: ${error}`);
                    })
            })
            .catch((error) => {
                console.log(`Promise Error: ${error}`);
            })
    })
    .catch((error) => {
        console.log(`Promise Error: ${error}`);
    })


promiseFunc(1000)
    .then((value) => {
        console.log(`call first function was done in ${value}ms using promise`);
        return promiseFunc(value * 2);
    })
    .then((value) => {
        console.log(`call second function was done in ${value}ms using promise`);
        return promiseFunc(value * 2);
    })
    .then((value) => {
        console.log(`call final function was done in ${value}ms using promise`);
    })
    .catch((error) => {
        console.log(`Promise Error: ${error}`);
    })

promiseFunc(1000)
    .then(value => promiseFunc(value * 2))
    .then(value => promiseFunc(value * 2))
    .then(value => {
        console.log(`call final function was done in ${value}ms using promise`);
    })
    .catch(error => console.log(`Promise Error: ${error}`));



function asyncFunc(delayTime) {
    if (delayTime === 0) {
        setTimeout(() => { workProc.next({ result: true, value: delayTime }) }, 0);
    } else {
        setTimeout((value) => {
            if (delayTime < 2000) workProc.next({ result: true, value: delayTime });
            else workProc.next({ result: false, value: delayTime });
            return;
        }, delayTime);
    }
}

function* generatorWorker() {
    let readyWorker1 = yield asyncFunc(0);
    console.log(`call first function was done in ${readyWorker1.value}ms using promise`);
    let readyWorker2 = yield asyncFunc(1000);
    console.log(`call second function was done in ${readyWorker2.value}ms using promise`);
    let readyWorker3 = yield asyncFunc(2000);
    console.log(`call final function was done in ${readyWorker3.value}ms using promise`);
}
let workProc = generatorWorker();
workProc.next(); //進入generateWorker直到第一個yield停止


function callbackFunc(delayTime, cb) {
    setTimeout(() => {
        cb(null, delayTime);
        return;
    }, delayTime);
}

function callbackFuncPackage(delayTime) {
    callbackFunc(delayTime, (err, value) => {
        if (err) {
            workProc.next({ result: false, value: value });
        } else {
            workProc.next({ result: true, value: value });
        }
    })
}

function* generatorWorker() {
    let readyWorker1 = yield callbackFuncPackage(1000);
    if (readyWorker1.result) console.log(`call first function was done in ${readyWorker1.value}ms using generator`);
    let readyWorker2 = yield callbackFuncPackage(readyWorker1.value * 2);
    if (readyWorker2.result) console.log(`call second function was done in ${readyWorker2.value}ms using generator`);
    let readyWorker3 = yield callbackFuncPackage(readyWorker2.value * 2);
    if (readyWorker3.result) console.log(`call final function was done in ${readyWorker3.value}ms using generator`);

}

let workProc = generatorWorker();
workProc.next();



function promiseFunc(delayTime) {
    return new Promise((resolve, reject) => {
        setTimeout((value) => {
            resolve(delayTime);
            return;
        }, delayTime);
    })
}

function promiseFuncPackage(delayTime) {
    promiseFunc(delayTime)
        .then((value) => {
            workProc.next({ result: true, value: value });
            return;
        })
        .catch((error) => {
            workProc.next({ result: false, value: error });
        })
}

function* generatorWorker() {
    let readyWorker1 = yield promiseFuncPackage(1000);
    if (readyWorker1.result) console.log(`call first function was done in ${readyWorker1.value}ms using generator`);
    let readyWorker2 = yield promiseFuncPackage(readyWorker1.value * 2);
    if (readyWorker2.result) console.log(`call second function was done in ${readyWorker2.value}ms using generator`);
    let readyWorker3 = yield promiseFuncPackage(readyWorker2.value * 2);
    if (readyWorker3.result) console.log(`call final function was done in ${readyWorker3.value}ms using generator`);

}

let workProc = generatorWorker();
workProc.next();



function promiseFunc(delayTime) {
    return new Promise((resolve, reject) => {
        setTimeout((value) => {
            resolve(delayTime);
            return;
        }, delayTime);
    })
}

function* generatorWorker() {
    let value1 = yield promiseFunc(1000);
    console.log(`call first function was done in ${value1}ms using generator`);
    let value2 = yield promiseFunc(value1 * 2);
    console.log(`call first function was done in ${value2}ms using generator`);
    let value3 = yield promiseFunc(value2 * 2);
    console.log(`call first function was done in ${value3}ms using generator`);
}

let workProc = generatorWorker();
(function process(readyWork) {
    if (readyWork.done) {
        return;
    } else {
        readyWork.value
            .then((value) => {
                process(workProc.next(value));
                return;
            })
            .catch((error) => {
                return;
            })
    }

}(workProc.next()))