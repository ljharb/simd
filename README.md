# simd <sup>[![Version Badge][2]][1]</sup>

[![Build Status][3]][4]
[![dependency status][5]][6]
[![dev dependency status][7]][8]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][11]][1]

[![browser support][9]][10]

ES7 (proposed) SIMD numeric type shim/polyfill

128-bit SIMD numeric value type ECMAScript straw man proposal.

## Source:
Nearly every word of this README and line of code and tests are taken directly from [ecmascript_simd][source-url].

The purpose of this is to make it a require-able module, that does not automatically modify the global environment,
for use in the [es7-shim][es7-shim-url].

## Requirements
The SIMD polyfill requires Typed Arrays to be present in the engine. A Typed Array polyfill can be found [here][typed-array-pkg] - source is from [here][typed-array-src].

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

[1]: https://npmjs.org/package/simd
[2]: http://vb.teelaun.ch/ljharb/simd.svg
[3]: https://travis-ci.org/ljharb/simd.svg
[4]: https://travis-ci.org/ljharb/simd
[5]: https://david-dm.org/ljharb/simd.svg
[6]: https://david-dm.org/ljharb/simd
[7]: https://david-dm.org/ljharb/simd/dev-status.svg
[8]: https://david-dm.org/ljharb/simd#info=devDependencies
[9]: https://ci.testling.com/ljharb/simd.png
[10]: https://ci.testling.com/ljharb/simd
[11]: https://nodei.co/npm/simd.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/simd.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/simd.svg
[downloads-url]: http://npm-stat.com/charts.html?package=simd
[source-url]: https://github.com/johnmccutchan/ecmascript_simd
[es7-shim-url]: https://github.com/es-shims/es7-shim
[typed-array-pkg]: https://www.npmjs.com/package/typedarray
[typed-array-src]: https://github.com/inexorabletash/polyfill/blob/master/typedarray.js
