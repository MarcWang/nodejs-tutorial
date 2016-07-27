var Module = require('./module.js');
var expect = require('chai').expect;

//Negates any of assertions following in the chain.
describe('測試 Expect .not', function() {
    it('回傳值應該等於7', function() {
        var result = Module.add(5, 2);
        expect(result).to.be.equal(7);
    });

    it('回傳值應該是一個函式', function() {
        var result = Module.fn();
        expect(result).to.not.throw(Error);
    });

    it('回傳值應該有一個物件且KEY為"foo"', function() {
        var result = Module.obj();
        expect(result).to.have.property('foo');
    });
});

//Sets the deep flag, later used by the equal and property assertions.
describe('測試 Expect .deep', function() {
    it('回傳值應該是一個物件且包含"foo.bar"的KEY且值為"baz"', function() {
        var result = Module.deepObj();
        expect(result).to.have.deep.property('foo.bar', 'baz');
    });
});

//Sets the deep flag, later used by the equal and property assertions.
describe('測試 Expect .any', function() {
    it('回傳值應該是一個物件且包含"bar"或"baz"其中一個KEY ', function() {
        var result = Module.deepObj();
        expect(result.foo).to.have.any.keys('bar', 'baz');
    });
});

//Sets the all flag (opposite of the any flag) later used by the keys assertion.
describe('測試 Expect .all', function() {
    it('回傳值應該是一個物件且包含"bar"和"baz"兩個KEY ', function() {
        var result = Module.deepObj();
        expect(result.foo).to.have.all.keys('bar', 'alt');
    });
});

//The a and an assertions are aliases that can be used either as language chains or to assert a value's type.
describe('測試 Expect .a', function() {
    it('回傳值應該是一個字串 ', function() {
        var result = Module.str();
        expect(result).to.be.a('string');
    });
    it('回傳值應該是一個物件 ', function() {
        var result = Module.obj();
        expect(result).to.be.an('object');
    });
    it('回傳值應該是Null ', function() {
        expect(null).to.be.a('null');
    });
    it('回傳值應該是undefined ', function() {
        expect(undefined).to.be.an('undefined');
    });
    it('回傳值應該是屬於Foo的類別 ', function() {
        var Foo = function(){
        	return "";
        }
        var foo = new Foo();
        expect(foo).to.be.an.instanceof(Foo);
    });
});
