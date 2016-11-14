// let array = [8, 5, 7, 2, 3, 9, 4, 6, 1, 0];
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

function insertion_with_gap(arr, start, gap) {
    for (let i = start; i < arr.length; i += gap) {
        for (let j = i; j >= 0; j -= gap) {
            if (arr[j + gap] < arr[j]) {
                swap(arr, j, j + gap)
            } else {
                continue;
            }
        }
    }
}

function shell(arr) {
    console.log(arr);
    let length = arr.length;
    for (gap = parseInt(length / 2); gap > 0; gap = parseInt(gap / 2)) {
        for (let i = 0; i < gap; i++) {
            insertion_with_gap(arr, i, gap);
        }
        console.log(arr);
    }
}

shell(array);
