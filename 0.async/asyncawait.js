function asyncThing(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(value), 100)
    })
}

async function AsyncFunc() {
    await asyncThing(1000).catch(err => {
        return Promise.reject(err);
    })
}

AsyncFunc();