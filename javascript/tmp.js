let obj_arr = [{
    username: 'marc',
    password: 'A123456'
}, {
    username: 'marc_1',
    password: 'B123456'
}, {
    username: 'marc_2'
}, {
    email: 'marc@gmail.com'
}]

function accountFilter(acc) {
    return (acc.username !== undefined && acc.password !== undefined) ? true : false;
}

let res = obj_arr.filter(accountFilter);
console.log(res);
