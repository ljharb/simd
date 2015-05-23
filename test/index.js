var test = require('tape');

var original = global.SIMD && Object.freeze ? Object.freeze(global.SIMD) : global.SIMD;
var SIMD = require('../');

test('shim does not modify global environment', function (t) {
	t.equal(global.SIMD, original);
	t.end();
});

require('./simd')(test, SIMD);
