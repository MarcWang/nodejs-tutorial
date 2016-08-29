// Case 1
// function asyncFunc(delayTime) {
//     if (delayTime === 0) {
//         setTimeout(() => { workProc.next({ result: true, value: delayTime }) }, 0);
//     } else {
//         setTimeout((value) => {
//             if (delayTime < 2000) workProc.next({ result: true, value: delayTime });
//             else workProc.next({ result: false, value: delayTime });
//             return;
//         }, delayTime);
//     }
// }

// function* generatorWorker() {
//     let readyWorker1 = yield asyncFunc(0);
//     console.log(`call first function was done in ${readyWorker1.value}ms using promise`);
//     let readyWorker2 = yield asyncFunc(1000);
//     console.log(`call second function was done in ${readyWorker2.value}ms using promise`);
//     let readyWorker3 = yield asyncFunc(2000);
//     console.log(`call final function was done in ${readyWorker3.value}ms using promise`);
// }
// let workProc = generatorWorker();
// workProc.next(); 


// Case 2
// function callbackFunc(delayTime, cb) {
//     setTimeout(() => {
//         cb(null, delayTime);
//         return;
//     }, delayTime);
// }

// function callbackFuncPackage(delayTime) {
//     callbackFunc(delayTime, (err, value) => {
//         if (err) {
//             workProc.next({ result: false, value: value });
//         } else {
//             workProc.next({ result: true, value: value });
//         }
//     })
// }

// function* generatorWorker() {
//     let readyWorker1 = yield callbackFuncPackage(1000);
//     if (readyWorker1.result) console.log(`call first function was done in ${readyWorker1.value}ms using generator`);
//     let readyWorker2 = yield callbackFuncPackage(readyWorker1.value * 2);
//     if (readyWorker2.result) console.log(`call second function was done in ${readyWorker2.value}ms using generator`);
//     let readyWorker3 = yield callbackFuncPackage(readyWorker2.value * 2);
//     if (readyWorker3.result) console.log(`call final function was done in ${readyWorker3.value}ms using generator`);

// }

// let workProc = generatorWorker();
// workProc.next();



// Case 3
// function promiseFunc(delayTime) {
//     return new Promise((resolve, reject) => {
//         setTimeout((value) => {
//             resolve(delayTime);
//             return;
//         }, delayTime);
//     })
// }

// function promiseFuncPackage(delayTime) {
//     promiseFunc(delayTime)
//         .then((value) => {
//             workProc.next({ result: true, value: value });
//             return;
//         })
//         .catch((error) => {
//             workProc.next({ result: false, value: error });
//         })
// }

// function* generatorWorker() {
//     let readyWorker1 = yield promiseFuncPackage(1000);
//     if (readyWorker1.result) console.log(`call first function was done in ${readyWorker1.value}ms using generator`);
//     let readyWorker2 = yield promiseFuncPackage(readyWorker1.value * 2);
//     if (readyWorker2.result) console.log(`call second function was done in ${readyWorker2.value}ms using generator`);
//     let readyWorker3 = yield promiseFuncPackage(readyWorker2.value * 2);
//     if (readyWorker3.result) console.log(`call final function was done in ${readyWorker3.value}ms using generator`);

// }

// let workProc = generatorWorker();
// workProc.next();


// Case 4
function promiseFunc(delayTime) {
    return new Promise((resolve, reject) => {
        setTimeout((value) => {
            resolve(delayTime);
            return;
        }, delayTime);
    })
}

function* generatorWorker(value) {
    console.log(`value : ${value}`);
    let value1 = yield promiseFunc(value);
    console.log(`call first function was done in ${value1}ms using generator`);
    let value2 = yield promiseFunc(value1 * 2);
    console.log(`call first function was done in ${value2}ms using generator`);
    let value3 = yield promiseFunc(value2 * 2);
    console.log(`call first function was done in ${value3}ms using generator`);
}

let workProc = generatorWorker(1000);

// (function process(readyWork) {
//     if (readyWork.done) {
//         return;
//     } else {
//         readyWork.value
//             .then((value) => {
//                 process(workProc.next(value));
//                 return;
//             })
//             .catch((error) => {
//                 return;
//             })
//     }

// }(workProc.next()))

function processGenerator(workProc, value) {
    let readyWork = workProc.next(value);
    if (readyWork.done) {
        return;
    } else {
        readyWork.value
            .then((value) => {
                processGenerator(workProc, value);
                return;
            })
            .catch((error) => {
                return; 
            })
    }
}

processGenerator(workProc);
