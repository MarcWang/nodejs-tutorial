function Func(time, index) {
	let _time = time;
	let _index = index;

    return new Promise((resolve, reject) => {
        // let _time = time;
        // let _index = index;
        setTimeout(() => {
            resolve({
                time: _time,
                index: _index
            })
        }, 2000)
    })
}

let count = 0;
setInterval(() => {
	count++;
    Func(Date.now(), count)
        .then((value) => {
        	console.log(value);
        })
        .catch((error) => {

        })
}, 100)
