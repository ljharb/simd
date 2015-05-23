# simd
ES7 (proposed) SIMD numeric type shim/polyfill

128-bit SIMD numeric value type ECMAScript straw man proposal.

## Source:
Nearly every word of this README and line of code and tests are taken directly from [ecmascript_simd](https://github.com/johnmccutchan/ecmascript_simd).

The purpose of this is to make it a require-able module, that does not automatically modify the global environment,
for use in the [es7-shim](https://github.com/es-shims/es7-shim).

## Requirements
The SIMD polyfill requires Typed Arrays to be present in the engine. A Typed Array polyfill can be found [here](https://www.npmjs.com/package/typedarray) - source is from [here](https://github.com/inexorabletash/polyfill/blob/master/typedarray.js).

## Usage:
```js
var SIMD = require('simd');
var a = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
var b = SIMD.float32x4(5.0, 6.0, 7.0, 8.0);
var c = SIMD.float32x4.add(a,b);
assert.deepEqual(c, [6.0, 8.0, 10.0, 12.0]);
```

To install the shim in the global environment:
```js
var simd = require('simd');
simd.shim();
assert.equal(SIMD, simd);
```

## [Introduction](https://github.com/johnmccutchan/ecmascript_simd#introduction)

## [Overview](https://github.com/johnmccutchan/ecmascript_simd#overview)

## [Data Types](https://github.com/johnmccutchan/ecmascript_simd#data-types)
