var installShim = require('./simd');

var global = {};
installShim(global);

module.exports = global.SIMD;
