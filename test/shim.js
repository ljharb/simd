var test = require('tape');

var simd = require('../');

var getGlobal = require('../getGlobal');
var preserve = require('./preserve');

test('shimmed global', preserve(getGlobal(), 'SIMD', function (t) {
	simd.shim();
	require('./simd')(t.test, SIMD);
	t.end();
}));
