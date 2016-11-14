let array = [];

for (let i = 0; i < 10; i++) {
    let random = Math.floor((Math.random() * 100) + 1);
    array.push(random);
}

function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function selection(arr) {
    let tmp = [];
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (i != min) {
            swap(arr, min, i);
        }
    }
}

let begin = process.hrtime();
selection(array);
console.log(array);
let end = process.hrtime(begin);
console.log("Execution time (hr): ", end[0], end[1] / 1000000);
