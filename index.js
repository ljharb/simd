var installShim = require('./simd');
var define = require('define-properties');

var fakeGlobal = {};
installShim(fakeGlobal);

var simd = fakeGlobal.SIMD;

var getGlobal = require('./getGlobal');

define(simd, {
	shim: function shim() {
		var globalObject = getGlobal();
		var predicates = {
			SIMD: function () {
				// Firefox Nightly v41
				return globalObject.SIMD && typeof globalObject.SIMD.float32x4.extractLane !== 'function';
			}
		};
		define(globalObject, { SIMD: simd }, predicates);
		return globalObject.SIMD || simd;
	}
});

module.exports = simd;
