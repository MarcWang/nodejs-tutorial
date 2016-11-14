let array = [];
// let array = [8, 5, 7, 2, 3, 9, 4, 6, 1, 0];
for (let i = 0; i < 10; i++) {
    let random = Math.floor((Math.random() * 100) + 1);
    array.push(random);
}



function quick_sort_in_place(arr) {
    function swap(arr, i, j) {
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    };

    function partition(arr, left, right) {
        let pivot = arr[left];
        let storeIndex = right;
        for (let i = right; i > left; i--) {
            if (arr[i] > pivot) {
                swap(arr, i, storeIndex);
                storeIndex--;
            }
        }
        swap(arr, storeIndex, left);
        return storeIndex;
    }

    function sort(arr, left, right) {
        if (left > right) {
            return;
        }

        let storeIndex = partition(arr, left, right);
        sort(arr, left, storeIndex - 1);
        sort(arr, storeIndex + 1, right);
    }

    sort(arr, 0, arr.length - 1);
}


function quick_sort(arr) {
    let len = arr.length;
    if (len <= 1)
        return arr.slice(0);
    let left = [];
    let right = [];
    let pivot = [arr[0]];
    for (let i = 1; i < len; i++)
        if (arr[i] < pivot[0])
            left.push(arr[i]);
        else
            right.push(arr[i]);
    return quick_sort(left).concat(pivot.concat(quick_sort(right)));
};

quick_sort_in_place(array);
console.log(array);
// console.log(quick_sort(array));
