function add(x, y) {
    return x + y;
}

function enable(flag) {
    return flag;
}

function str(){
	return "test";
}

function fn() {
    return function() {
        return "fn";
    }
}

function obj() {
    return {
        foo: 'baz'
    }
}

function deepObj() {
    return {
        foo: {
            bar: 'baz',
            alt: 'bau'
        }
    };
}

module.exports = {
    add: add,
    enable: enable,
    str: str,
    fn: fn,
    obj: obj,
    deepObj: deepObj
}
