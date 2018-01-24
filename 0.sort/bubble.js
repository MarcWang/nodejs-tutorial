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

function bubbleSort(arr) {
    let flag = true;
    for (let i = 0; i < arr.length && flag; i++) {
        flag = false;
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)
                flag = true;
            }
        }
    }
}

let begin = process.hrtime();
bubbleSort(array);
console.log(array);
let end = process.hrtime(begin);
console.log("Execution time (hr): ", end[0], end[1] / 1000000);
