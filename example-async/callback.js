function callbackFunc(delayTime, cb) {
    setTimeout(() => {
        cb(null, delayTime);
        return;
    }, delayTime);
}

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

