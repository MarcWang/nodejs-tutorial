function promiseFunc(delayTime) {
    return new Promise((resolve, reject) => {
        setTimeout((value) => {
            if (delayTime < 2000) resolve(delayTime);
            else reject(delayTime);
            return;
        }, delayTime);
    })
}

// Method 1
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

// Method 2
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


// Method 3
promiseFunc(1000)
    .then(value => promiseFunc(value * 2))
    .then(value => promiseFunc(value * 2))
    .then(value => {
        console.log(`call final function was done in ${value}ms using promise`);
    })
    .catch(error => console.log(`Promise Error: ${error}`));


