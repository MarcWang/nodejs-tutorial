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

function insertion(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j >= 0; j--) {
            if (arr[j + 1] < arr[j]) {
                swap(arr, j, j + 1)
            } else {
                continue;
            }
        }
    }
}

let begin = process.hrtime();
insertion(array);
console.log(array);
let end = process.hrtime(begin);
console.log("Execution time (hr): ", end[0], end[1] / 1000000);
