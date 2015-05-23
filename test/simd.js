module.exports = function (test, SIMD) {
/*
  Copyright (C) 2013

  This software is provided 'as-is', without any express or implied
  warranty.  In no event will the authors be held liable for any damages
  arising from the use of this software.

  Permission is granted to anyone to use this software for any purpose,
  including commercial applications, and to alter it and redistribute it
  freely, subject to the following restrictions:

  1. The origin of this software must not be misrepresented; you must not
     claim that you wrote the original software. If you use this software
     in a product, an acknowledgment in the product documentation would be
     appreciated but is not required.
  2. Altered source versions must be plainly marked as such, and must not be
     misrepresented as being the original software.
  3. This notice may not be removed or altered from any source distribution.
*/

function almostEqual(t_, a, b) {
  t_.ok(Math.abs(a - b) < 0.00001);
}

function isPositiveZero(t_, x) {
  t_.ok(x == 0 && 1/x == Infinity);
}

function isNegativeZero(t_, x) {
  t_.ok(x == 0 && 1/x == -Infinity);
}

function isNaN(t_, x) {
  t_.ok(x != x);
}

function toBool(x) {
  return x < 0;
}

test('odds and ends', function(t_) {
    // Not yet specified:
    //   ==, ===, !=, !==, <=, >=
    //   conversion to bool via !, ?, etc.:
    isNaN(t_, Number(SIMD.float32x4(0, 1, 2, 3)));
    isNaN(t_, +SIMD.float32x4(0, 1, 2, 3));
    isNaN(t_, -SIMD.float32x4(0, 1, 2, 3));
    t_.equal(~SIMD.float32x4(0, 1, 2, 3), -1);
    isNaN(t_, Math.fround(SIMD.float32x4(0, 1, 2, 3)));
    t_.equal(SIMD.float32x4(0, 1, 2, 3)|0, 0);
    t_.equal(SIMD.float32x4(0, 1, 2, 3)&0, 0);
    t_.equal(SIMD.float32x4(0, 1, 2, 3)^0, 0);
    t_.equal(SIMD.float32x4(0, 1, 2, 3)>>>0, 0);
    t_.equal(SIMD.float32x4(0, 1, 2, 3)>>0, 0);
    t_.equal(SIMD.float32x4(0, 1, 2, 3)<<0, 0);
    t_.equal(typeof (SIMD.float32x4(0, 1, 2, 3) + SIMD.float32x4(4, 5, 6, 7)), "string");
    isNaN(t_, SIMD.float32x4(0, 1, 2, 3) - SIMD.float32x4(4, 5, 6, 7));
    isNaN(t_, SIMD.float32x4(0, 1, 2, 3) * SIMD.float32x4(4, 5, 6, 7));
    isNaN(t_, SIMD.float32x4(0, 1, 2, 3) / SIMD.float32x4(4, 5, 6, 7));
    isNaN(t_, SIMD.float32x4(0, 1, 2, 3) % SIMD.float32x4(4, 5, 6, 7));
    t_.equal(SIMD.float32x4(0, 1, 2, 3) < SIMD.float32x4(4, 5, 6, 7), false);
    t_.equal(SIMD.float32x4(0, 1, 2, 3) > SIMD.float32x4(4, 5, 6, 7), false);
    t_.equal(typeof (SIMD.float32x4(0, 1, 2, 3).toString()), "string");
    t_['throws'](function() { SIMD.float32x4(0, 1, 2, 3)(); });
    t_.equal(SIMD.float32x4(0, 1, 2, 3)[0], undefined);
    t_.equal(SIMD.float32x4(0, 1, 2, 3).a, undefined);
 t_.end();
});

test('float32x4 constructor', function(t_) {
  t_.notEqual(undefined, SIMD.float32x4);  // Type.
  t_.notEqual(undefined, SIMD.float32x4(1.0, 2.0, 3.0, 4.0));  // New object.
 t_.end();
});

test('simd128 types check', function(t_) {
  var x = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var a = SIMD.float32x4.check(x);
  t_.equal(SIMD.float32x4.extractLane(a, 0), SIMD.float32x4.extractLane(x, 0));
  t_.equal(SIMD.float32x4.extractLane(a, 1), SIMD.float32x4.extractLane(x, 1));
  t_.equal(SIMD.float32x4.extractLane(a, 2), SIMD.float32x4.extractLane(x, 2));
  t_.equal(SIMD.float32x4.extractLane(a, 3), SIMD.float32x4.extractLane(x, 3));
  t_['throws'](function() {SIMD.float32x4.check(1)});
  t_['throws'](function() {SIMD.float32x4.check('hi')});

  var y = SIMD.int32x4(1, 2, 3, 4);
  var b = SIMD.int32x4.check(y);
  t_.equal(SIMD.int32x4.extractLane(b, 0), SIMD.int32x4.extractLane(y, 0));
  t_.equal(SIMD.int32x4.extractLane(b, 1), SIMD.int32x4.extractLane(y, 1));
  t_.equal(SIMD.int32x4.extractLane(b, 2), SIMD.int32x4.extractLane(y, 2));
  t_.equal(SIMD.int32x4.extractLane(b, 3), SIMD.int32x4.extractLane(y, 3));
  t_['throws'](function() {SIMD.int32x4.check(1)});
  t_['throws'](function() {SIMD.int32x4.check('hi')});

  var z = SIMD.float64x2(1.0, 2.0);
  var c = SIMD.float64x2.check(z);
  t_.equal(SIMD.float64x2.extractLane(c, 0), SIMD.float64x2.extractLane(z, 0));
  t_.equal(SIMD.float64x2.extractLane(c, 1), SIMD.float64x2.extractLane(z, 1));
  t_['throws'](function() {SIMD.float64x2.check(1)});
  t_['throws'](function() {SIMD.float64x2.check('hi')});

  var u = SIMD.int16x8(1, 2, 3, 4, 5, 6, 7, 8);
  var d = SIMD.int16x8.check(u);
  t_.equal(SIMD.int16x8.extractLane(d, 0), SIMD.int16x8.extractLane(u, 0));
  t_.equal(SIMD.int16x8.extractLane(d, 1), SIMD.int16x8.extractLane(u, 1));
  t_.equal(SIMD.int16x8.extractLane(d, 2), SIMD.int16x8.extractLane(u, 2));
  t_.equal(SIMD.int16x8.extractLane(d, 3), SIMD.int16x8.extractLane(u, 3));
  t_.equal(SIMD.int16x8.extractLane(d, 4), SIMD.int16x8.extractLane(u, 4));
  t_.equal(SIMD.int16x8.extractLane(d, 5), SIMD.int16x8.extractLane(u, 5));
  t_.equal(SIMD.int16x8.extractLane(d, 6), SIMD.int16x8.extractLane(u, 6));
  t_.equal(SIMD.int16x8.extractLane(d, 7), SIMD.int16x8.extractLane(u, 7));
  t_['throws'](function() {SIMD.int16x8.check(1)});
  t_['throws'](function() {SIMD.int16x8.check('hi')});

  var v = SIMD.int8x16(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  var e = SIMD.int8x16.check(v);
  t_.equal(SIMD.int8x16.extractLane(e, 0), SIMD.int8x16.extractLane(v, 0));
  t_.equal(SIMD.int8x16.extractLane(e, 1), SIMD.int8x16.extractLane(v, 1));
  t_.equal(SIMD.int8x16.extractLane(e, 2), SIMD.int8x16.extractLane(v, 2));
  t_.equal(SIMD.int8x16.extractLane(e, 3), SIMD.int8x16.extractLane(v, 3));
  t_.equal(SIMD.int8x16.extractLane(e, 4), SIMD.int8x16.extractLane(v, 4));
  t_.equal(SIMD.int8x16.extractLane(e, 5), SIMD.int8x16.extractLane(v, 5));
  t_.equal(SIMD.int8x16.extractLane(e, 6), SIMD.int8x16.extractLane(v, 6));
  t_.equal(SIMD.int8x16.extractLane(e, 7), SIMD.int8x16.extractLane(v, 7));
  t_.equal(SIMD.int8x16.extractLane(e, 8), SIMD.int8x16.extractLane(v, 8));
  t_.equal(SIMD.int8x16.extractLane(e, 9), SIMD.int8x16.extractLane(v, 9));
  t_.equal(SIMD.int8x16.extractLane(e, 10), SIMD.int8x16.extractLane(v, 10));
  t_.equal(SIMD.int8x16.extractLane(e, 11), SIMD.int8x16.extractLane(v, 11));
  t_.equal(SIMD.int8x16.extractLane(e, 12), SIMD.int8x16.extractLane(v, 12));
  t_.equal(SIMD.int8x16.extractLane(e, 13), SIMD.int8x16.extractLane(v, 13));
  t_.equal(SIMD.int8x16.extractLane(e, 14), SIMD.int8x16.extractLane(v, 14));
  t_.equal(SIMD.int8x16.extractLane(e, 15), SIMD.int8x16.extractLane(v, 15));
  t_['throws'](function() {SIMD.int8x16.check(1)});
  t_['throws'](function() {SIMD.int8x16.check('hi')});
 t_.end();
});

test('float32x4 fromFloat64x2 constructor', function(t_) {
  var m = SIMD.float64x2(1.0, 2.0);
  var n = SIMD.float32x4.fromFloat64x2(m);
  t_.equal(1.0, SIMD.float32x4.extractLane(n, 0));
  t_.equal(2.0, SIMD.float32x4.extractLane(n, 1));
  isPositiveZero(t_, SIMD.float32x4.extractLane(n, 2));
  isPositiveZero(t_, SIMD.float32x4.extractLane(n, 3));

  m = SIMD.float64x2(3.402824e+38, 7.006492e-46);
  n = SIMD.float32x4.fromFloat64x2(m);
  t_.equal(Infinity, SIMD.float32x4.extractLane(n, 0));
  isPositiveZero(t_, SIMD.float32x4.extractLane(n, 1));
  isPositiveZero(t_, SIMD.float32x4.extractLane(n, 2));
  isPositiveZero(t_, SIMD.float32x4.extractLane(n, 3));
 t_.end();
});

test('float32x4 fromInt32x4 constructor', function(t_) {
  var m = SIMD.int32x4(1, 2, 3, 4);
  var n = SIMD.float32x4.fromInt32x4(m);
  t_.equal(1.0, SIMD.float32x4.extractLane(n, 0));
  t_.equal(2.0, SIMD.float32x4.extractLane(n, 1));
  t_.equal(3.0, SIMD.float32x4.extractLane(n, 2));
  t_.equal(4.0, SIMD.float32x4.extractLane(n, 3));

  m = SIMD.int32x4(0, 2147483647, -2147483648, -1);
  n = SIMD.float32x4.fromInt32x4(m);
  isPositiveZero(t_, SIMD.float32x4.extractLane(n, 0));
  t_.equal(2147483648, SIMD.float32x4.extractLane(n, 1));
  t_.equal(-2147483648, SIMD.float32x4.extractLane(n, 2));
  t_.equal(-1, SIMD.float32x4.extractLane(n, 3));
 t_.end();
});

test('float32x4 fromFloat64x2Bits constructor', function(t_) {
  var m = SIMD.float64x2.fromInt32x4Bits(SIMD.int32x4(0x3F800000, 0x40000000, 0x40400000, 0x40800000));
  var n = SIMD.float32x4.fromFloat64x2Bits(m);
  t_.equal(1.0, SIMD.float32x4.extractLane(n, 0));
  t_.equal(2.0, SIMD.float32x4.extractLane(n, 1));
  t_.equal(3.0, SIMD.float32x4.extractLane(n, 2));
  t_.equal(4.0, SIMD.float32x4.extractLane(n, 3));
 t_.end();
});

test('float32x4 fromInt32x4Bits constructor', function(t_) {
  var m = SIMD.int32x4(0x3F800000, 0x40000000, 0x40400000, 0x40800000);
  var n = SIMD.float32x4.fromInt32x4Bits(m);
  t_.equal(1.0, SIMD.float32x4.extractLane(n, 0));
  t_.equal(2.0, SIMD.float32x4.extractLane(n, 1));
  t_.equal(3.0, SIMD.float32x4.extractLane(n, 2));
  t_.equal(4.0, SIMD.float32x4.extractLane(n, 3));
 t_.end();
});

test('float32x4 fromInt16x8Bits constructor', function(t_) {
  var m = SIMD.int16x8(0x0000, 0x3F80, 0x0000, 0x4000, 0x0000, 0x4040, 0x0000, 0x4080);
  var n = SIMD.float32x4.fromInt16x8Bits(m);
  t_.equal(1.0, SIMD.float32x4.extractLane(n, 0));
  t_.equal(2.0, SIMD.float32x4.extractLane(n, 1));
  t_.equal(3.0, SIMD.float32x4.extractLane(n, 2));
  t_.equal(4.0, SIMD.float32x4.extractLane(n, 3));
 t_.end();
});

test('float32x4 fromInt8x16Bits constructor', function(t_) {
  var m = SIMD.int8x16(0x0, 0x0, 0x80, 0x3F, 0x0, 0x0, 0x00, 0x40, 0x00, 0x00, 0x40, 0x40, 0x00, 0x00, 0x80, 0x40);
  var n = SIMD.float32x4.fromInt8x16Bits(m);
  t_.equal(1.0, SIMD.float32x4.extractLane(n, 0));
  t_.equal(2.0, SIMD.float32x4.extractLane(n, 1));
  t_.equal(3.0, SIMD.float32x4.extractLane(n, 2));
  t_.equal(4.0, SIMD.float32x4.extractLane(n, 3));
 t_.end();
});

test('float32x4 extract lane', function(t_) {
  var a = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  t_.equal(1.0, SIMD.float32x4.extractLane(a, 0));
  t_.equal(2.0, SIMD.float32x4.extractLane(a, 1));
  t_.equal(3.0, SIMD.float32x4.extractLane(a, 2));
  t_.equal(4.0, SIMD.float32x4.extractLane(a, 3));
 t_.end();
});

test('float32x4 vector getters', function(t_) {
  var a = SIMD.float32x4(4.0, 3.0, 2.0, 1.0);
  var xxxx = SIMD.float32x4.swizzle(a, 0, 0, 0, 0);
  var yyyy = SIMD.float32x4.swizzle(a, 1, 1, 1, 1);
  var zzzz = SIMD.float32x4.swizzle(a, 2, 2, 2, 2);
  var wwww = SIMD.float32x4.swizzle(a, 3, 3, 3, 3);
  var wzyx = SIMD.float32x4.swizzle(a, 3, 2, 1, 0);
  t_.equal(4.0, SIMD.float32x4.extractLane(xxxx, 0));
  t_.equal(4.0, SIMD.float32x4.extractLane(xxxx, 1));
  t_.equal(4.0, SIMD.float32x4.extractLane(xxxx, 2));
  t_.equal(4.0, SIMD.float32x4.extractLane(xxxx, 3));
  t_.equal(3.0, SIMD.float32x4.extractLane(yyyy, 0));
  t_.equal(3.0, SIMD.float32x4.extractLane(yyyy, 1));
  t_.equal(3.0, SIMD.float32x4.extractLane(yyyy, 2));
  t_.equal(3.0, SIMD.float32x4.extractLane(yyyy, 3));
  t_.equal(2.0, SIMD.float32x4.extractLane(zzzz, 0));
  t_.equal(2.0, SIMD.float32x4.extractLane(zzzz, 1));
  t_.equal(2.0, SIMD.float32x4.extractLane(zzzz, 2));
  t_.equal(2.0, SIMD.float32x4.extractLane(zzzz, 3));
  t_.equal(1.0, SIMD.float32x4.extractLane(wwww, 0));
  t_.equal(1.0, SIMD.float32x4.extractLane(wwww, 1));
  t_.equal(1.0, SIMD.float32x4.extractLane(wwww, 2));
  t_.equal(1.0, SIMD.float32x4.extractLane(wwww, 3));
  t_.equal(1.0, SIMD.float32x4.extractLane(wzyx, 0));
  t_.equal(2.0, SIMD.float32x4.extractLane(wzyx, 1));
  t_.equal(3.0, SIMD.float32x4.extractLane(wzyx, 2));
  t_.equal(4.0, SIMD.float32x4.extractLane(wzyx, 3));
 t_.end();
});

test('float32x4 abs', function(t_) {
  var a = SIMD.float32x4(-4.0, -3.0, -2.0, -1.0);
  var c = SIMD.float32x4.abs(a);
  t_.equal(4.0, SIMD.float32x4.extractLane(c, 0));
  t_.equal(3.0, SIMD.float32x4.extractLane(c, 1));
  t_.equal(2.0, SIMD.float32x4.extractLane(c, 2));
  t_.equal(1.0, SIMD.float32x4.extractLane(c, 3));
  c = SIMD.float32x4.abs(SIMD.float32x4(4.0, 3.0, 2.0, 1.0));
  t_.equal(4.0, SIMD.float32x4.extractLane(c, 0));
  t_.equal(3.0, SIMD.float32x4.extractLane(c, 1));
  t_.equal(2.0, SIMD.float32x4.extractLane(c, 2));
  t_.equal(1.0, SIMD.float32x4.extractLane(c, 3));

  var d = SIMD.float32x4(NaN, Infinity, 0.0, 1.0);
  var e = SIMD.float32x4.abs(d);
  var f = SIMD.float32x4(-NaN, -Infinity, -0.0, -1.0);
  var g = SIMD.float32x4.abs(f);
  isNaN(t_, SIMD.float32x4.extractLane(e, 0))
  t_.equal(SIMD.float32x4.extractLane(e, 1), Infinity);
  isPositiveZero(t_, SIMD.float32x4.extractLane(e, 2));
  t_.equal(SIMD.float32x4.extractLane(e, 3), 1.0);
  isNaN(t_, SIMD.float32x4.extractLane(g, 0))
  t_.equal(SIMD.float32x4.extractLane(g, 1), Infinity);
  isPositiveZero(t_, SIMD.float32x4.extractLane(g, 2));
  t_.equal(SIMD.float32x4.extractLane(g, 3), 1.0);
 t_.end();
});

test('float32x4 neg', function(t_) {
  var a = SIMD.float32x4(-4.0, -3.0, -2.0, -1.0);
  var c = SIMD.float32x4.neg(a);
  t_.equal(4.0, SIMD.float32x4.extractLane(c, 0));
  t_.equal(3.0, SIMD.float32x4.extractLane(c, 1));
  t_.equal(2.0, SIMD.float32x4.extractLane(c, 2));
  t_.equal(1.0, SIMD.float32x4.extractLane(c, 3));
  c = SIMD.float32x4.neg(SIMD.float32x4(4.0, 3.0, 2.0, 1.0));
  t_.equal(-4.0, SIMD.float32x4.extractLane(c, 0));
  t_.equal(-3.0, SIMD.float32x4.extractLane(c, 1));
  t_.equal(-2.0, SIMD.float32x4.extractLane(c, 2));
  t_.equal(-1.0, SIMD.float32x4.extractLane(c, 3));

  var d = SIMD.float32x4(Infinity, -Infinity, 0.0, -0.0);
  var f = SIMD.float32x4.neg(d);
  t_.equal(-Infinity, SIMD.float32x4.extractLane(f, 0));
  t_.equal(Infinity, SIMD.float32x4.extractLane(f, 1));
  isNegativeZero(t_, SIMD.float32x4.extractLane(f, 2));
  isPositiveZero(t_, SIMD.float32x4.extractLane(f, 3));

  var g = SIMD.float32x4.neg(SIMD.float32x4.splat(NaN));
  isNaN(t_, SIMD.float32x4.extractLane(g, 0))
 t_.end();
});

test('float32x4 add', function(t_) {
  var a = SIMD.float32x4(4.0, 3.0, 2.0, 1.0);
  var b = SIMD.float32x4(10.0, 20.0, 30.0, 40.0);
  var c = SIMD.float32x4.add(a, b);
  t_.equal(14.0, SIMD.float32x4.extractLane(c, 0));
  t_.equal(23.0, SIMD.float32x4.extractLane(c, 1));
  t_.equal(32.0, SIMD.float32x4.extractLane(c, 2));
  t_.equal(41.0, SIMD.float32x4.extractLane(c, 3));
 t_.end();
});

test('float32x4 sub', function(t_) {
  var a = SIMD.float32x4(4.0, 3.0, 2.0, 1.0);
  var b = SIMD.float32x4(10.0, 20.0, 30.0, 40.0);
  var c = SIMD.float32x4.sub(a, b);
  t_.equal(-6.0, SIMD.float32x4.extractLane(c, 0));
  t_.equal(-17.0, SIMD.float32x4.extractLane(c, 1));
  t_.equal(-28.0, SIMD.float32x4.extractLane(c, 2));
  t_.equal(-39.0, SIMD.float32x4.extractLane(c, 3));
 t_.end();
});

test('float32x4 mul', function(t_) {
  var a = SIMD.float32x4(4.0, 3.0, 2.0, 1.0);
  var b = SIMD.float32x4(10.0, 20.0, 30.0, 40.0);
  var c = SIMD.float32x4.mul(a, b);
  t_.equal(40.0, SIMD.float32x4.extractLane(c, 0));
  t_.equal(60.0, SIMD.float32x4.extractLane(c, 1));
  t_.equal(60.0, SIMD.float32x4.extractLane(c, 2));
  t_.equal(40.0, SIMD.float32x4.extractLane(c, 3));
 t_.end();
});

test('float32x4 div', function(t_) {
  var a = SIMD.float32x4(4.0, 9.0, 8.0, 1.0);
  var b = SIMD.float32x4(2.0, 3.0, 1.0, 0.5);
  var c = SIMD.float32x4.div(a, b);
  t_.equal(2.0, SIMD.float32x4.extractLane(c, 0));
  t_.equal(3.0, SIMD.float32x4.extractLane(c, 1));
  t_.equal(8.0, SIMD.float32x4.extractLane(c, 2));
  t_.equal(2.0, SIMD.float32x4.extractLane(c, 3));

  var d = SIMD.float32x4(1.0, 0.0, Infinity, NaN);
  var e = SIMD.float32x4(Infinity, 0.0, Infinity, 1.0);
  var f = SIMD.float32x4.div(d, e);
  isPositiveZero(t_, SIMD.float32x4.extractLane(f, 0));
  isNaN(t_, SIMD.float32x4.extractLane(f, 1))
  isNaN(t_, SIMD.float32x4.extractLane(f, 2))
  isNaN(t_, SIMD.float32x4.extractLane(f, 3))

  var g = SIMD.float32x4(1.0, 1.0, -1.0, -1.0);
  var h = SIMD.float32x4(0.0, -0.0, 0.0, -0.0);
  var i = SIMD.float32x4.div(g, h);
  t_.equal(SIMD.float32x4.extractLane(i, 0), Infinity);
  t_.equal(SIMD.float32x4.extractLane(i, 1), -Infinity);
  t_.equal(SIMD.float32x4.extractLane(i, 2), -Infinity);
  t_.equal(SIMD.float32x4.extractLane(i, 3), Infinity);
 t_.end();
});

test('float32x4 min', function(t_) {
  var a = SIMD.float32x4(-20.0, 10.0, 30.0, 0.5);
  var lower = SIMD.float32x4(2.0, 1.0, 50.0, 0.0);
  var c = SIMD.float32x4.min(a, lower);
  t_.equal(-20.0, SIMD.float32x4.extractLane(c, 0));
  t_.equal(1.0, SIMD.float32x4.extractLane(c, 1));
  t_.equal(30.0, SIMD.float32x4.extractLane(c, 2));
  isPositiveZero(t_, SIMD.float32x4.extractLane(c, 3));

  var x = SIMD.float32x4(-0, 0, NaN, 0);
  var y = SIMD.float32x4(0, -0, 0, NaN);
  var z = SIMD.float32x4.min(x, y);
  isNegativeZero(t_, SIMD.float32x4.extractLane(z, 0));
  isNegativeZero(t_, SIMD.float32x4.extractLane(z, 1));
  isNaN(t_, SIMD.float32x4.extractLane(z, 2))
  isNaN(t_, SIMD.float32x4.extractLane(z, 3))
 t_.end();
});

test('float32x4 minNum', function(t_) {
  var a = SIMD.float32x4(-20.0, 10.0, 30.0, 0.5);
  var lower = SIMD.float32x4(2.0, 1.0, 50.0, 0.0);
  var c = SIMD.float32x4.minNum(a, lower);
  t_.equal(-20.0, SIMD.float32x4.extractLane(c, 0));
  t_.equal(1.0, SIMD.float32x4.extractLane(c, 1));
  t_.equal(30.0, SIMD.float32x4.extractLane(c, 2));
  isPositiveZero(t_, SIMD.float32x4.extractLane(c, 3));

  var x = SIMD.float32x4(-0, 0, NaN, 0);
  var y = SIMD.float32x4(0, -0, 0, NaN);
  var z = SIMD.float32x4.minNum(x, y);
  isNegativeZero(t_, SIMD.float32x4.extractLane(z, 0));
  isNegativeZero(t_, SIMD.float32x4.extractLane(z, 1));
  isPositiveZero(t_, SIMD.float32x4.extractLane(z, 2));
  isPositiveZero(t_, SIMD.float32x4.extractLane(z, 3));
 t_.end();
});

test('float32x4 min exceptions', function(t_) {
  var ok    = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var notOk = 1;
  t_['throws'](function () {
    SIMD.float32x4.min(ok, notOk);
  });
  t_['throws'](function () {
    SIMD.float32x4.min(notOk, ok);
  });
 t_.end();
});

test('float32x4 max', function(t_) {
  var a = SIMD.float32x4(-20.0, 10.0, 30.0, 0.5);
  var upper = SIMD.float32x4(2.5, 5.0, 55.0, 1.0);
  var c = SIMD.float32x4.max(a, upper);
  t_.equal(2.5, SIMD.float32x4.extractLane(c, 0));
  t_.equal(10.0, SIMD.float32x4.extractLane(c, 1));
  t_.equal(55.0, SIMD.float32x4.extractLane(c, 2));
  t_.equal(1.0, SIMD.float32x4.extractLane(c, 3));

  var x = SIMD.float32x4(-0, 0, NaN, 0);
  var y = SIMD.float32x4(0, -0, 0, NaN);
  var z = SIMD.float32x4.max(x, y);
  isPositiveZero(t_, SIMD.float32x4.extractLane(z, 0));
  isPositiveZero(t_, SIMD.float32x4.extractLane(z, 1));
  isNaN(t_, SIMD.float32x4.extractLane(z, 2))
  isNaN(t_, SIMD.float32x4.extractLane(z, 3))
 t_.end();
});

test('float32x4 maxNum', function(t_) {
  var a = SIMD.float32x4(-20.0, 10.0, 30.0, 0.5);
  var upper = SIMD.float32x4(2.5, 5.0, 55.0, 1.0);
  var c = SIMD.float32x4.maxNum(a, upper);
  t_.equal(2.5, SIMD.float32x4.extractLane(c, 0));
  t_.equal(10.0, SIMD.float32x4.extractLane(c, 1));
  t_.equal(55.0, SIMD.float32x4.extractLane(c, 2));
  t_.equal(1.0, SIMD.float32x4.extractLane(c, 3));

  var x = SIMD.float32x4(-0, 0, NaN, 0);
  var y = SIMD.float32x4(0, -0, 0, NaN);
  var z = SIMD.float32x4.maxNum(x, y);
  isPositiveZero(t_, SIMD.float32x4.extractLane(z, 0));
  isPositiveZero(t_, SIMD.float32x4.extractLane(z, 1));
  isPositiveZero(t_, SIMD.float32x4.extractLane(z, 2));
  isPositiveZero(t_, SIMD.float32x4.extractLane(z, 3));
 t_.end();
});

test('float32x4 max exceptions', function(t_) {
  var ok    = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var notOk = 1;
  t_['throws'](function () {
    SIMD.float32x4.max(ok, notOk);
  });
  t_['throws'](function () {
    SIMD.float32x4.max(notOk, ok);
  });
 t_.end();
});

test('float32x4 reciprocal approximation', function(t_) {
  var a = SIMD.float32x4(8.0, 4.0, 2.0, -2.0);
  var c = SIMD.float32x4.reciprocalApproximation(a);
  almostEqual(t_, 0.125, SIMD.float32x4.extractLane(c, 0));
  almostEqual(t_, 0.250, SIMD.float32x4.extractLane(c, 1));
  almostEqual(t_, 0.5, SIMD.float32x4.extractLane(c, 2));
  almostEqual(t_, -0.5, SIMD.float32x4.extractLane(c, 3));
  a = SIMD.float32x4(NaN, Infinity, -Infinity, -0);
  c = SIMD.float32x4.reciprocalApproximation(a);
  isNaN(t_, SIMD.float32x4.extractLane(c, 0))
  isPositiveZero(t_, SIMD.float32x4.extractLane(c, 1));
  isNegativeZero(t_, SIMD.float32x4.extractLane(c, 2));
  t_.equal(-Infinity, SIMD.float32x4.extractLane(c, 3));
  a = SIMD.float32x4(0, 2.3, -4.5, 7.8);
  c = SIMD.float32x4.reciprocalApproximation(a);
  t_.equal(Infinity, SIMD.float32x4.extractLane(c, 0));
  almostEqual(t_, 1/SIMD.float32x4.extractLane(a, 1), SIMD.float32x4.extractLane(c, 1));
  almostEqual(t_, 1/SIMD.float32x4.extractLane(a, 2), SIMD.float32x4.extractLane(c, 2));
  almostEqual(t_, 1/SIMD.float32x4.extractLane(a, 3), SIMD.float32x4.extractLane(c, 3));
 t_.end();
});

test('float32x4 reciprocal sqrt approximation', function(t_) {
  var a = SIMD.float32x4(1.0, 0.25, 0.111111, 0.0625);
  var c = SIMD.float32x4.reciprocalSqrtApproximation(a);
  almostEqual(t_, 1.0, SIMD.float32x4.extractLane(c, 0));
  almostEqual(t_, 2.0, SIMD.float32x4.extractLane(c, 1));
  almostEqual(t_, 3.0, SIMD.float32x4.extractLane(c, 2));
  almostEqual(t_, 4.0, SIMD.float32x4.extractLane(c, 3));
  a = SIMD.float32x4(-Infinity, Infinity, NaN, 0);
  c = SIMD.float32x4.reciprocalSqrtApproximation(a);
  isNaN(t_, SIMD.float32x4.extractLane(c, 0))
  isPositiveZero(t_, SIMD.float32x4.extractLane(c, 1));
  isNaN(t_, SIMD.float32x4.extractLane(c, 2))
  t_.equal(Infinity, SIMD.float32x4.extractLane(c, 3));
  a = SIMD.float32x4(-0, -1, 121, 144);
  c = SIMD.float32x4.reciprocalSqrtApproximation(a);
  t_.equal(-Infinity, SIMD.float32x4.extractLane(c, 0));
  isNaN(t_, SIMD.float32x4.extractLane(c, 1))
  almostEqual(t_, 1/11, SIMD.float32x4.extractLane(c, 2));
  almostEqual(t_, 1/12, SIMD.float32x4.extractLane(c, 3));
 t_.end();
});

test('float32x4 sqrt', function(t_) {
  var a = SIMD.float32x4(16.0, 9.0, 4.0, 1.0);
  var c = SIMD.float32x4.sqrt(a);
  t_.equal(4.0, SIMD.float32x4.extractLane(c, 0));
  t_.equal(3.0, SIMD.float32x4.extractLane(c, 1));
  t_.equal(2.0, SIMD.float32x4.extractLane(c, 2));
  t_.equal(1.0, SIMD.float32x4.extractLane(c, 3));
  a = SIMD.float32x4(0.0, -0.0, Infinity, -Infinity);
  c = SIMD.float32x4.sqrt(a);
  isPositiveZero(t_, SIMD.float32x4.extractLane(c, 0));
  isNegativeZero(t_, SIMD.float32x4.extractLane(c, 1));
  t_.equal(Infinity, SIMD.float32x4.extractLane(c, 2));
  isNaN(t_, SIMD.float32x4.extractLane(c, 3))
  a = SIMD.float32x4(NaN, 2.0, 0.5, 121.0);
  c = SIMD.float32x4.sqrt(a);
  isNaN(t_, SIMD.float32x4.extractLane(c, 0))
  t_.equal(Math.fround(Math.SQRT2), SIMD.float32x4.extractLane(c, 1));
  t_.equal(Math.fround(Math.SQRT1_2), SIMD.float32x4.extractLane(c, 2));
  t_.equal(11.0, SIMD.float32x4.extractLane(c, 3));
 t_.end();
});

test('float32x4 shuffle', function(t_) {
  var a    = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var b    = SIMD.float32x4(5.0, 6.0, 7.0, 8.0);
  var xyxy = SIMD.float32x4.shuffle(a, b, 0, 1, 4, 5);
  var zwzw = SIMD.float32x4.shuffle(a, b, 2, 3, 6, 7);
  var xxxx = SIMD.float32x4.shuffle(a, b, 0, 0, 4, 4);
  t_.equal(1.0, SIMD.float32x4.extractLane(xyxy, 0));
  t_.equal(2.0, SIMD.float32x4.extractLane(xyxy, 1));
  t_.equal(5.0, SIMD.float32x4.extractLane(xyxy, 2));
  t_.equal(6.0, SIMD.float32x4.extractLane(xyxy, 3));
  t_.equal(3.0, SIMD.float32x4.extractLane(zwzw, 0));
  t_.equal(4.0, SIMD.float32x4.extractLane(zwzw, 1));
  t_.equal(7.0, SIMD.float32x4.extractLane(zwzw, 2));
  t_.equal(8.0, SIMD.float32x4.extractLane(zwzw, 3));
  t_.equal(1.0, SIMD.float32x4.extractLane(xxxx, 0));
  t_.equal(1.0, SIMD.float32x4.extractLane(xxxx, 1));
  t_.equal(5.0, SIMD.float32x4.extractLane(xxxx, 2));
  t_.equal(5.0, SIMD.float32x4.extractLane(xxxx, 3));

  var c = SIMD.float32x4.shuffle(a, b, 0, 4, 5, 1);
  var d = SIMD.float32x4.shuffle(a, b, 2, 6, 3, 7);
  var e = SIMD.float32x4.shuffle(a, b, 0, 4, 0, 4);
  t_.equal(1.0, SIMD.float32x4.extractLane(c, 0));
  t_.equal(5.0, SIMD.float32x4.extractLane(c, 1));
  t_.equal(6.0, SIMD.float32x4.extractLane(c, 2));
  t_.equal(2.0, SIMD.float32x4.extractLane(c, 3));
  t_.equal(3.0, SIMD.float32x4.extractLane(d, 0));
  t_.equal(7.0, SIMD.float32x4.extractLane(d, 1));
  t_.equal(4.0, SIMD.float32x4.extractLane(d, 2));
  t_.equal(8.0, SIMD.float32x4.extractLane(d, 3));
  t_.equal(1.0, SIMD.float32x4.extractLane(e, 0));
  t_.equal(5.0, SIMD.float32x4.extractLane(e, 1));
  t_.equal(1.0, SIMD.float32x4.extractLane(e, 2));
  t_.equal(5.0, SIMD.float32x4.extractLane(e, 3));

  function testIndexCheck(index) {
      t_['throws'](function() { SIMD.float32x4.shuffle(a, b, index, 0, 0, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(8);
 t_.end();
});

test('float32x4 replaceLane', function(t_) {
    var a = SIMD.float32x4(16.0, 9.0, 4.0, 1.0);
    var c = SIMD.float32x4.replaceLane(a, 0, 20.0);
    t_.equal(20.0, SIMD.float32x4.extractLane(c, 0));
    t_.equal(9.0, SIMD.float32x4.extractLane(c, 1));
    t_.equal(4.0, SIMD.float32x4.extractLane(c, 2));
    t_.equal(1.0, SIMD.float32x4.extractLane(c, 3));
    c = SIMD.float32x4.replaceLane(a, 1, 20.0);
    t_.equal(16.0, SIMD.float32x4.extractLane(c, 0));
    t_.equal(20.0, SIMD.float32x4.extractLane(c, 1));
    t_.equal(4.0, SIMD.float32x4.extractLane(c, 2));
    t_.equal(1.0, SIMD.float32x4.extractLane(c, 3));
    c = SIMD.float32x4.replaceLane(a, 2, 20.0);
    t_.equal(16.0, SIMD.float32x4.extractLane(c, 0));
    t_.equal(9.0, SIMD.float32x4.extractLane(c, 1));
    t_.equal(20.0, SIMD.float32x4.extractLane(c, 2));
    t_.equal(1.0, SIMD.float32x4.extractLane(c, 3));
    c = SIMD.float32x4.replaceLane(a, 3, 20.0);
    t_.equal(16.0, SIMD.float32x4.extractLane(c, 0));
    t_.equal(9.0, SIMD.float32x4.extractLane(c, 1));
    t_.equal(4.0, SIMD.float32x4.extractLane(c, 2));
    t_.equal(20.0, SIMD.float32x4.extractLane(c, 3));

    function testIndexCheck(index) {
      t_['throws'](function() { SIMD.float32x4.replaceLane(a, index, 0.0); });
    }
    testIndexCheck(13.37);
    testIndexCheck(null);
    testIndexCheck(undefined);
    testIndexCheck({});
    testIndexCheck(true);
    testIndexCheck('yo');
    testIndexCheck(-1);
    testIndexCheck(8);
 t_.end();
});

test('float32x4 comparisons', function(t_) {
  var m = SIMD.float32x4(1.0, 2.0, 0.1, 0.001);
  var n = SIMD.float32x4(2.0, 2.0, 0.001, 0.1);
  var cmp;
  cmp = SIMD.float32x4.lessThan(m, n);
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 3));

  cmp = SIMD.float32x4.lessThanOrEqual(m, n);
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 3));

  cmp = SIMD.float32x4.equal(m, n);
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 3));

  cmp = SIMD.float32x4.notEqual(m, n);
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 3));

  cmp = SIMD.float32x4.greaterThanOrEqual(m, n);
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 3));

  cmp = SIMD.float32x4.greaterThan(m, n);
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 3));

  var o = SIMD.float32x4(0.0, -0.0, 0.0, NaN);
  var p = SIMD.float32x4(-0.0, 0.0, NaN, 0.0);
  cmp = SIMD.float32x4.lessThan(o, p);
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 3));

  cmp = SIMD.float32x4.lessThanOrEqual(o, p);
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 3));

  cmp = SIMD.float32x4.equal(o, p);
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 3));

  cmp = SIMD.float32x4.notEqual(o, p);
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 3));

  cmp = SIMD.float32x4.greaterThanOrEqual(o, p);
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 3));

  cmp = SIMD.float32x4.greaterThan(o, p);
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 3));
 t_.end();
});

test('float32x4 select', function(t_) {
  var m = SIMD.int32x4(0xaaaaaaaa, 0xaaaaaaaa, 0x55555555, 0x55555555);
  var t = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var f = SIMD.float32x4(5.0, 6.0, 7.0, 8.0);
  var s = SIMD.float32x4.select(m, t, f);
  t_.equal(1.0, SIMD.float32x4.extractLane(s, 0));
  t_.equal(2.0, SIMD.float32x4.extractLane(s, 1));
  t_.equal(7.0, SIMD.float32x4.extractLane(s, 2));
  t_.equal(8.0, SIMD.float32x4.extractLane(s, 3));
 t_.end();
});

test('float32x4 selectBits', function(t_) {
  var m = SIMD.int32x4(0xaaaaaaaa, 0xaaaaaaaa, 0x55555555, 0x55555555);
  var t = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var f = SIMD.float32x4(5.0, 6.0, 7.0, 8.0);
  var s = SIMD.float32x4.selectBits(m, t, f);
  t_.equal(7.737125245533627e+25, SIMD.float32x4.extractLane(s, 0));
  t_.equal(3.0, SIMD.float32x4.extractLane(s, 1));
  t_.equal(7.0, SIMD.float32x4.extractLane(s, 2));
  t_.equal(2.0, SIMD.float32x4.extractLane(s, 3));
 t_.end();
});

test('float32x4 int32x4 bit conversion', function(t_) {
  var m = SIMD.int32x4(0x3F800000, 0x40000000, 0x40400000, 0x40800000);
  var n = SIMD.float32x4.fromInt32x4Bits(m);
  t_.equal(1.0, SIMD.float32x4.extractLane(n, 0));
  t_.equal(2.0, SIMD.float32x4.extractLane(n, 1));
  t_.equal(3.0, SIMD.float32x4.extractLane(n, 2));
  t_.equal(4.0, SIMD.float32x4.extractLane(n, 3));
  n = SIMD.float32x4(5.0, 6.0, 7.0, 8.0);
  m = SIMD.int32x4.fromFloat32x4Bits(n);
  t_.equal(0x40A00000, SIMD.int32x4.extractLane(m, 0));
  t_.equal(0x40C00000, SIMD.int32x4.extractLane(m, 1));
  t_.equal(0x40E00000, SIMD.int32x4.extractLane(m, 2));
  t_.equal(0x41000000, SIMD.int32x4.extractLane(m, 3));
  // Flip sign using bit-wise operators.
  n = SIMD.float32x4(9.0, 10.0, 11.0, 12.0);
  m = SIMD.int32x4(0x80000000, 0x80000000, 0x80000000, 0x80000000);
  var nMask = SIMD.int32x4.fromFloat32x4Bits(n);
  nMask = SIMD.int32x4.xor(nMask, m); // flip sign.
  n = SIMD.float32x4.fromInt32x4Bits(nMask);
  t_.equal(-9.0, SIMD.float32x4.extractLane(n, 0));
  t_.equal(-10.0, SIMD.float32x4.extractLane(n, 1));
  t_.equal(-11.0, SIMD.float32x4.extractLane(n, 2));
  t_.equal(-12.0, SIMD.float32x4.extractLane(n, 3));
  nMask = SIMD.int32x4.fromFloat32x4Bits(n);
  nMask = SIMD.int32x4.xor(nMask, m); // flip sign.
  n = SIMD.float32x4.fromInt32x4Bits(nMask);
  t_.equal(9.0, SIMD.float32x4.extractLane(n, 0));
  t_.equal(10.0, SIMD.float32x4.extractLane(n, 1));
  t_.equal(11.0, SIMD.float32x4.extractLane(n, 2));
  t_.equal(12.0, SIMD.float32x4.extractLane(n, 3));
  // Should stay unmodified across bit conversions
  m = SIMD.int32x4(0xFFFFFFFF, 0xFFFF0000, 0x80000000, 0x0);
  var m2 = SIMD.int32x4.fromFloat32x4Bits(SIMD.float32x4.fromInt32x4Bits(m));
  //equal(SIMD.float32x4.extractLane(m, 0), m2SIMD.float32x4.extractLane(m2, 0)); // FIXME: These get NaN-canonicalized
  //equal(SIMD.float32x4.extractLane(m, 1), m2SIMD.float32x4.extractLane(m2, 1)); // FIXME: These get NaN-canonicalized
  t_.equal(SIMD.int32x4.extractLane(m, 2), SIMD.int32x4.extractLane(m2, 2));
  t_.equal(SIMD.int32x4.extractLane(m, 3), SIMD.int32x4.extractLane(m2, 3));
 t_.end();
});

test('float32x4 float64x2 conversion', function(t_) {
  var m = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var n = SIMD.float64x2.fromFloat32x4(m);
  t_.equal(1.0, SIMD.float64x2.extractLane(n, 0));
  t_.equal(2.0, SIMD.float64x2.extractLane(n, 1));
 t_.end();
});

test('float32x4 load', function(t_) {
  var a = new Float32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 3; i++) {
    var v = SIMD.float32x4.load(a, i);
    t_.equal(i, SIMD.float32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.float32x4.extractLane(v, 1));
    t_.equal(i+2, SIMD.float32x4.extractLane(v, 2));
    t_.equal(i+3, SIMD.float32x4.extractLane(v, 3));
  }
 t_.end();
});

test('float32x4 overaligned load', function(t_) {
  var b = new ArrayBuffer(40);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 3; i += 2) {
    var v = SIMD.float32x4.load(af, i / 2);
    t_.equal(i, SIMD.float32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.float32x4.extractLane(v, 1));
    t_.equal(i+2, SIMD.float32x4.extractLane(v, 2));
    t_.equal(i+3, SIMD.float32x4.extractLane(v, 3));
  }
 t_.end();
});

test('float32x4 unaligned load', function(t_) {
  var a = new Float32Array(8);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length - 3; i++) {
    var v = SIMD.float32x4.load(b, i * 4 + 1);
    t_.equal(i, SIMD.float32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.float32x4.extractLane(v, 1));
    t_.equal(i+2, SIMD.float32x4.extractLane(v, 2));
    t_.equal(i+3, SIMD.float32x4.extractLane(v, 3));
  }
 t_.end();
});

test('float32x4 load1', function(t_) {
  var a = new Float32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length; i++) {
    var v = SIMD.float32x4.load1(a, i);
    t_.equal(i, SIMD.float32x4.extractLane(v, 0));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 1));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 2));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 3));
  }
 t_.end();
});

test('float32x4 overaligned load1', function(t_) {
  var b = new ArrayBuffer(40);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length; i += 2) {
    var v = SIMD.float32x4.load1(af, i / 2);
    t_.equal(i, SIMD.float32x4.extractLane(v, 0));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 1));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 2));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 3));
  }
 t_.end();
});

test('float32x4 unaligned load1', function(t_) {
  var a = new Float32Array(8);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length; i++) {
    var v = SIMD.float32x4.load1(b, i * 4 + 1);
    t_.equal(i, SIMD.float32x4.extractLane(v, 0));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 1));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 2));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 3));
  }
 t_.end();
});

test('float32x4 load2', function(t_) {
  var a = new Float32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.float32x4.load2(a, i);
    t_.equal(i, SIMD.float32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.float32x4.extractLane(v, 1));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 2));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 3));
  }
 t_.end();
});

test('float32x4 overaligned load2', function(t_) {
  var b = new ArrayBuffer(40);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i += 2) {
    var v = SIMD.float32x4.load2(af, i / 2);
    t_.equal(i, SIMD.float32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.float32x4.extractLane(v, 1));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 2));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 3));
  }
 t_.end();
});

test('float32x4 unaligned load2', function(t_) {
  var a = new Float32Array(8);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.float32x4.load2(b, i * 4 + 1);
    t_.equal(i, SIMD.float32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.float32x4.extractLane(v, 1));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 2));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 3));
  }
 t_.end();
});

test('float32x4 load3', function(t_) {
  var a = new Float32Array(9);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 2; i++) {
    var v = SIMD.float32x4.load3(a, i);
    t_.equal(i, SIMD.float32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.float32x4.extractLane(v, 1));
    t_.equal(i+2, SIMD.float32x4.extractLane(v, 2));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 3));
  }
 t_.end();
});

test('float32x4 overaligned load3', function(t_) {
  var b = new ArrayBuffer(48);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 2; i += 2) {
    var v = SIMD.float32x4.load3(af, i / 2);
    t_.equal(i, SIMD.float32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.float32x4.extractLane(v, 1));
    t_.equal(i+2, SIMD.float32x4.extractLane(v, 2));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 3));
  }
 t_.end();
});

test('float32x4 unaligned load3', function(t_) {
  var a = new Float32Array(9);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length - 2; i++) {
    var v = SIMD.float32x4.load3(b, i * 4 + 1);
    t_.equal(i, SIMD.float32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.float32x4.extractLane(v, 1));
    t_.equal(i+2, SIMD.float32x4.extractLane(v, 2));
    isPositiveZero(t_, SIMD.float32x4.extractLane(v, 3));
  }
 t_.end();
});

test('float32x4 store', function(t_) {
  var a = new Float32Array(12);
  SIMD.float32x4.store(a, 0, SIMD.float32x4(0, 1, 2, 3));
  SIMD.float32x4.store(a, 4, SIMD.float32x4(4, 5, 6, 7));
  SIMD.float32x4.store(a, 8, SIMD.float32x4(8, 9, 10, 11));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('float32x4 overaligned store', function(t_) {
  var b = new ArrayBuffer(56);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  SIMD.float32x4.store(af, 0, SIMD.float32x4(0, 1, 2, 3));
  SIMD.float32x4.store(af, 2, SIMD.float32x4(4, 5, 6, 7));
  SIMD.float32x4.store(af, 4, SIMD.float32x4(8, 9, 10, 11));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('float32x4 unaligned store', function(t_) {
  var c = new Int8Array(48 + 1);
  SIMD.float32x4.store(c, 0 + 1, SIMD.float32x4(0, 1, 2, 3));
  SIMD.float32x4.store(c, 16 + 1, SIMD.float32x4(4, 5, 6, 7));
  SIMD.float32x4.store(c, 32 + 1, SIMD.float32x4(8, 9, 10, 11));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Float32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('float32x4 store1', function(t_) {
  var a = new Float32Array(4);
  SIMD.float32x4.store1(a, 0, SIMD.float32x4(0, -1, -1, -1));
  SIMD.float32x4.store1(a, 1, SIMD.float32x4(1, -1, -1, -1));
  SIMD.float32x4.store1(a, 2, SIMD.float32x4(2, -1, -1, -1));
  SIMD.float32x4.store1(a, 3, SIMD.float32x4(3, -1, -1, -1));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('float32x4 overaligned store1', function(t_) {
  var b = new ArrayBuffer(24);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  a[1] = -2;
  a[3] = -2;
  SIMD.float32x4.store1(af, 0, SIMD.float32x4(0, -1, -1, -1));
  SIMD.float32x4.store1(af, 1, SIMD.float32x4(2, -1, -1, -1));
  for (var i = 0; i < a.length; i++) {
    if (i % 2 == 0) {
      t_.equal(i, a[i]);
    } else {
      t_.equal(-2, a[i]);
    }
  }
 t_.end();
});

test('float32x4 unaligned store1', function(t_) {
  var c = new Int8Array(16 + 1);
  SIMD.float32x4.store1(c, 0 + 1, SIMD.float32x4(0, -1, -1, -1));
  SIMD.float32x4.store1(c, 4 + 1, SIMD.float32x4(1, -1, -1, -1));
  SIMD.float32x4.store1(c, 8 + 1, SIMD.float32x4(2, -1, -1, -1));
  SIMD.float32x4.store1(c, 12 + 1, SIMD.float32x4(3, -1, -1, -1));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Float32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('float32x4 store2', function(t_) {
  var a = new Float32Array(8);
  SIMD.float32x4.store2(a, 0, SIMD.float32x4(0, 1, -1, -1));
  SIMD.float32x4.store2(a, 2, SIMD.float32x4(2, 3, -1, -1));
  SIMD.float32x4.store2(a, 4, SIMD.float32x4(4, 5, -1, -1));
  SIMD.float32x4.store2(a, 6, SIMD.float32x4(6, 7, -1, -1));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('float32x4 overaligned store2', function(t_) {
  var b = new ArrayBuffer(40);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  SIMD.float32x4.store2(af, 0, SIMD.float32x4(0, 1, -1, -1));
  SIMD.float32x4.store2(af, 1, SIMD.float32x4(2, 3, -1, -1));
  SIMD.float32x4.store2(af, 2, SIMD.float32x4(4, 5, -1, -1));
  SIMD.float32x4.store2(af, 3, SIMD.float32x4(6, 7, -1, -1));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('float32x4 unaligned store2', function(t_) {
  var c = new Int8Array(32 + 1);
  SIMD.float32x4.store2(c, 0 + 1, SIMD.float32x4(0, 1, -1, -1));
  SIMD.float32x4.store2(c, 8 + 1, SIMD.float32x4(2, 3, -1, -1));
  SIMD.float32x4.store2(c, 16 + 1, SIMD.float32x4(4, 5, -1, -1));
  SIMD.float32x4.store2(c, 24 + 1, SIMD.float32x4(6, 7, -1, -1));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Float32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('float32x4 store3', function(t_) {
  var a = new Float32Array(9);
  SIMD.float32x4.store3(a, 0, SIMD.float32x4(0, 1, 2, -1));
  SIMD.float32x4.store3(a, 3, SIMD.float32x4(3, 4, 5, -1));
  SIMD.float32x4.store3(a, 6, SIMD.float32x4(6, 7, 8, -1));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('float32x4 overaligned store3', function(t_) {
  var b = new ArrayBuffer(56);
  var a = new Float32Array(b, 8);
  var af = new Float64Array(b, 8);
  a[3] = -2;
  a[7] = -2;
  a[11] = -2;
  SIMD.float32x4.store3(af, 0, SIMD.float32x4(0, 1, 2, -1));
  SIMD.float32x4.store3(af, 2, SIMD.float32x4(4, 5, 6, -1));
  SIMD.float32x4.store3(af, 4, SIMD.float32x4(8, 9, 10, -1));
  for (var i = 0; i < a.length; i++) {
    if (i % 4 != 3) {
      t_.equal(i, a[i]);
    } else {
      t_.equal(-2, a[i]);
    }
  }
 t_.end();
});

test('float32x4 unaligned store3', function(t_) {
  var c = new Int8Array(36 + 1);
  SIMD.float32x4.store3(c, 0 + 1, SIMD.float32x4(0, 1, 2, -1));
  SIMD.float32x4.store3(c, 12 + 1, SIMD.float32x4(3, 4, 5, -1));
  SIMD.float32x4.store3(c, 24 + 1, SIMD.float32x4(6, 7, 8, -1));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Float32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('float32x4 load exceptions', function (t_) {
  var a = new Float32Array(8);
  t_['throws'](function () {
    var f = SIMD.float32x4.load(a, -1);
  });
  t_['throws'](function () {
    var f = SIMD.float32x4.load(a, 5);
  });
  t_['throws'](function () {
    var f = SIMD.float32x4.load(a.buffer, 1);
  });
  t_['throws'](function () {
    var f = SIMD.float32x4.load(a, "a");
  });
 t_.end();
});

test('float32x4 load1 exceptions', function (t_) {
  var a = new Float32Array(8);
  t_['throws'](function () {
    var f = SIMD.float32x4.load1(a, -1);
  });
  t_['throws'](function () {
    var f = SIMD.float32x4.load1(a, 8);
  });
  t_['throws'](function () {
    var f = SIMD.float32x4.load1(a.buffer, 1);
  });
  t_['throws'](function () {
    var f = SIMD.float32x4.load1(a, "a");
  });
 t_.end();
});

test('float32x4 load2 exceptions', function (t_) {
  var a = new Float32Array(8);
  t_['throws'](function () {
    var f = SIMD.float32x4.load2(a, -1);
  });
  t_['throws'](function () {
    var f = SIMD.float32x4.load2(a, 7);
  });
  t_['throws'](function () {
    var f = SIMD.float32x4.load2(a.buffer, 1);
  });
  t_['throws'](function () {
    var f = SIMD.float32x4.load2(a, "a");
  });
 t_.end();
});

test('float32x4 load3 exceptions', function (t_) {
  var a = new Float32Array(8);
  t_['throws'](function () {
    var f = SIMD.float32x4.load3(a, -1);
  });
  t_['throws'](function () {
    var f = SIMD.float32x4.load3(a, 6);
  });
  t_['throws'](function () {
    var f = SIMD.float32x4.load3(a.buffer, 1);
  });
  t_['throws'](function () {
    var f = SIMD.float32x4.load3(a, "a");
  });
 t_.end();
});

test('float32x4 store exceptions', function (t_) {
  var a = new Float32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  t_['throws'](function () {
    SIMD.float32x4.store(a, -1, f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store(a, 5, f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store(a.buffer, 1, f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store(a, "a", f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store(a, 1, i);
  });
 t_.end();
});

test('float32x4 store1 exceptions', function (t_) {
  var a = new Float32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  t_['throws'](function () {
    SIMD.float32x4.store1(a, -1, f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store1(a, 8, f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store1(a.buffer, 1, f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store1(a, "a", f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store1(a, 1, i);
  });
 t_.end();
});

test('float32x4 store2 exceptions', function (t_) {
  var a = new Float32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  t_['throws'](function () {
    SIMD.float32x4.store2(a, -1, f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store2(a, 7, f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store2(a.buffer, 1, f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store2(a, "a", f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store2(a, 1, i);
  });
 t_.end();
});

test('float32x4 store3 exceptions', function (t_) {
  var a = new Float32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  t_['throws'](function () {
    SIMD.float32x4.store3(a, -1, f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store3(a, 6, f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store3(a.buffer, 1, f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store3(a, "a", f);
  });
  t_['throws'](function () {
    SIMD.float32x4.store3(a, 1, i);
  });
 t_.end();
});

test('float64x2 constructor', function(t_) {
  t_.equal('function', typeof SIMD.float64x2);
  var m = SIMD.float64x2(1.0, 2.0);
  t_.equal(1.0, SIMD.float64x2.extractLane(m, 0));
  t_.equal(2.0, SIMD.float64x2.extractLane(m, 1));

  m = SIMD.float64x2('hello', 'world');
  isNaN(t_, SIMD.float64x2.extractLane(m, 0))
  isNaN(t_, SIMD.float64x2.extractLane(m, 1))
 t_.end();
});

test('float64x2 splat constructor', function(t_) {
  t_.equal('function', typeof SIMD.float64x2.splat);
  var m = SIMD.float64x2.splat(3.0);
  t_.equal(3.0, SIMD.float64x2.extractLane(m, 0));
  t_.equal(SIMD.float64x2.extractLane(m, 0), SIMD.float64x2.extractLane(m, 1));
 t_.end();
});

test('float64x2 fromFloat32x4 constructor', function(t_) {
  var m = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var n = SIMD.float64x2.fromFloat32x4(m);
  t_.equal(1.0, SIMD.float64x2.extractLane(n, 0));
  t_.equal(2.0, SIMD.float64x2.extractLane(n, 1));
 t_.end();
});

test('float64x2 fromInt32x4 constructor', function(t_) {
  var m = SIMD.int32x4(1, 2, 3, 4);
  var n = SIMD.float64x2.fromInt32x4(m);
  t_.equal(1.0, SIMD.float64x2.extractLane(n, 0));
  t_.equal(2.0, SIMD.float64x2.extractLane(n, 1));
 t_.end();
});

test('float64x2 fromFloat32x4Bits constructor', function(t_) {
  var m = SIMD.float32x4.fromInt32x4Bits(SIMD.int32x4(0x00000000, 0x3ff00000, 0x0000000, 0x40000000));
  var n = SIMD.float64x2.fromFloat32x4Bits(m);
  t_.equal(1.0, SIMD.float64x2.extractLane(n, 0));
  t_.equal(2.0, SIMD.float64x2.extractLane(n, 1));
 t_.end();
});

test('float64x2 fromInt64x2Bits constructor', function(t_) {
  var m = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x00000000, 0x3ff00000, 0x00000000, 0x40000000));
  var n = SIMD.float64x2.fromInt64x2Bits(m);
  t_.equal(1.0, SIMD.float64x2.extractLane(n, 0));
  t_.equal(2.0, SIMD.float64x2.extractLane(n, 1));
 t_.end();
});

test('float64x2 fromInt32x4Bits constructor', function(t_) {
  var m = SIMD.int32x4(0x00000000, 0x3ff00000, 0x00000000, 0x40000000);
  var n = SIMD.float64x2.fromInt32x4Bits(m);
  t_.equal(1.0, SIMD.float64x2.extractLane(n, 0));
  t_.equal(2.0, SIMD.float64x2.extractLane(n, 1));
 t_.end();
});

test('float64x2 fromInt16x8Bits constructor', function(t_) {
  var m = SIMD.int16x8(0x0000, 0x0000, 0x0000, 0x3ff0, 0x0000, 0x0000, 0x0000, 0x4000);
  var n = SIMD.float64x2.fromInt16x8Bits(m);
  t_.equal(1.0, SIMD.float64x2.extractLane(n, 0));
  t_.equal(2.0, SIMD.float64x2.extractLane(n, 1));
 t_.end();
});

test('float64x2 fromInt8x16Bits constructor', function(t_) {
  var m = SIMD.int8x16(0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40);
  var n = SIMD.float64x2.fromInt8x16Bits(m);
  t_.equal(1.0, SIMD.float64x2.extractLane(n, 0));
  t_.equal(2.0, SIMD.float64x2.extractLane(n, 1));
 t_.end();
});

test('float64x2 scalar getters', function(t_) {
  var m = SIMD.float64x2(1.0, 2.0);
  t_.equal(1.0, SIMD.float64x2.extractLane(m, 0));
  t_.equal(2.0, SIMD.float64x2.extractLane(m, 1));
 t_.end();
});

test('float64x2 abs', function(t_) {
  var a = SIMD.float64x2(-2.0, -1.0);
  var c = SIMD.float64x2.abs(a);
  t_.equal(2.0, SIMD.float64x2.extractLane(c, 0));
  t_.equal(1.0, SIMD.float64x2.extractLane(c, 1));
  c = SIMD.float64x2.abs(SIMD.float64x2(2.0, 1.0));
  t_.equal(2.0, SIMD.float64x2.extractLane(c, 0));
  t_.equal(1.0, SIMD.float64x2.extractLane(c, 1));

  var d0 = SIMD.float64x2(NaN, Infinity);
  var d1 = SIMD.float64x2(0.0, 1.0);
  var e0 = SIMD.float64x2.abs(d0);
  var e1 = SIMD.float64x2.abs(d1);
  var f0 = SIMD.float64x2(-NaN, -Infinity);
  var f1 = SIMD.float64x2(-0.0, -1.0);
  var g0 = SIMD.float64x2.abs(f0);
  var g1 = SIMD.float64x2.abs(f1);
  isNaN(t_, SIMD.float64x2.extractLane(e0, 0))
  t_.equal(SIMD.float64x2.extractLane(e0, 1), Infinity);
  isPositiveZero(t_, SIMD.float64x2.extractLane(e1, 0), 0.0);
  t_.equal(SIMD.float64x2.extractLane(e1, 1), 1.0);
  isNaN(t_, SIMD.float64x2.extractLane(g0, 0))
  t_.equal(SIMD.float64x2.extractLane(g0, 1), Infinity);
  isPositiveZero(t_, SIMD.float64x2.extractLane(g1, 0));
  t_.equal(SIMD.float64x2.extractLane(g1, 1), 1.0);
 t_.end();
});

test('float64x2 neg', function(t_) {
  var a = SIMD.float64x2(-2.0, -1.0);
  var c = SIMD.float64x2.neg(a);
  t_.equal(2.0, SIMD.float64x2.extractLane(c, 0));
  t_.equal(1.0, SIMD.float64x2.extractLane(c, 1));
  c = SIMD.float64x2.neg(SIMD.float64x2(2.0, 1.0));
  t_.equal(-2.0, SIMD.float64x2.extractLane(c, 0));
  t_.equal(-1.0, SIMD.float64x2.extractLane(c, 1));

  var d0 = SIMD.float64x2(Infinity, -Infinity);
  var d1 = SIMD.float64x2(0.0, -0.0);
  var f0 = SIMD.float64x2.neg(d0);
  var f1 = SIMD.float64x2.neg(d1);
  t_.equal(-Infinity, SIMD.float64x2.extractLane(f0, 0));
  t_.equal(Infinity, SIMD.float64x2.extractLane(f0, 1));
  isNegativeZero(t_, SIMD.float64x2.extractLane(f1, 0));
  isPositiveZero(t_, SIMD.float64x2.extractLane(f1, 1));

  var g = SIMD.float64x2.neg(SIMD.float64x2.splat(NaN));
  isNaN(t_, SIMD.float64x2.extractLane(g, 0))
 t_.end();
});

test('float64x2 add', function(t_) {
  var a = SIMD.float64x2(2.0, 1.0);
  var b = SIMD.float64x2(10.0, 20.0);
  var c = SIMD.float64x2.add(a, b);
  t_.equal(12.0, SIMD.float64x2.extractLane(c, 0));
  t_.equal(21.0, SIMD.float64x2.extractLane(c, 1));
 t_.end();
});

test('float64x2 sub', function(t_) {
  var a = SIMD.float64x2(2.0, 1.0);
  var b = SIMD.float64x2(10.0, 20.0);
  var c = SIMD.float64x2.sub(a, b);
  t_.equal(-8.0, SIMD.float64x2.extractLane(c, 0));
  t_.equal(-19.0, SIMD.float64x2.extractLane(c, 1));
 t_.end();
});

test('float64x2 mul', function(t_) {
  var a = SIMD.float64x2(2.0, 1.0);
  var b = SIMD.float64x2(10.0, 20.0);
  var c = SIMD.float64x2.mul(a, b);
  t_.equal(20.0, SIMD.float64x2.extractLane(c, 0));
  t_.equal(20.0, SIMD.float64x2.extractLane(c, 1));
 t_.end();
});

test('float64x2 div', function(t_) {
  var a = SIMD.float64x2(4.0, 9.0);
  var b = SIMD.float64x2(2.0, 3.0);
  var c = SIMD.float64x2.div(a, b);
  t_.equal(2.0, SIMD.float64x2.extractLane(c, 0));
  t_.equal(3.0, SIMD.float64x2.extractLane(c, 1));

  var d0 = SIMD.float64x2(1.0, 0.0);
  var d1 = SIMD.float64x2(Infinity, NaN);
  var e0 = SIMD.float64x2(0.0, 0.0);
  var e1 = SIMD.float64x2(Infinity, 1.0);
  var f0 = SIMD.float64x2.div(d0, e0);
  var f1 = SIMD.float64x2.div(d1, e1);
  t_.equal(SIMD.float64x2.extractLane(f0, 0), Infinity);
  isNaN(t_, SIMD.float64x2.extractLane(f0, 1))
  isNaN(t_, SIMD.float64x2.extractLane(f1, 0))
  isNaN(t_, SIMD.float64x2.extractLane(f1, 1))

  var g0 = SIMD.float64x2(1.0, 1.0);
  var g1 = SIMD.float64x2(-1.0, -1.0);
  var h0 = SIMD.float64x2(0.0, -0.0);
  var h1 = SIMD.float64x2(0.0, -0.0);
  var i0 = SIMD.float64x2.div(g0, h0);
  var i1 = SIMD.float64x2.div(g1, h1);
  t_.equal(SIMD.float64x2.extractLane(i0, 0), Infinity);
  t_.equal(SIMD.float64x2.extractLane(i0, 1), -Infinity);
  t_.equal(SIMD.float64x2.extractLane(i1, 0), -Infinity);
  t_.equal(SIMD.float64x2.extractLane(i1, 1), Infinity);
 t_.end();
});

test('float64x2 min', function(t_) {
  var a = SIMD.float64x2(-20.0, 10.0);
  var lower = SIMD.float64x2(2.0, 1.0);
  var c = SIMD.float64x2.min(a, lower);
  t_.equal(-20.0, SIMD.float64x2.extractLane(c, 0));
  t_.equal(1.0, SIMD.float64x2.extractLane(c, 1));

  var x = SIMD.float64x2(-0, 0);
  var y = SIMD.float64x2(0, -0);
  var z = SIMD.float64x2.min(x, y);
  isNegativeZero(t_, SIMD.float64x2.extractLane(z, 0));
  isNegativeZero(t_, SIMD.float64x2.extractLane(z, 1));
  x = SIMD.float64x2(NaN, 0);
  y = SIMD.float64x2(0, NaN);
  z = SIMD.float64x2.min(x, y);
  isNaN(t_, SIMD.float64x2.extractLane(z, 0))
  isNaN(t_, SIMD.float64x2.extractLane(z, 1))
 t_.end();
});

test('float64x2 minNum', function(t_) {
  var a = SIMD.float64x2(-20.0, 10.0);
  var lower = SIMD.float64x2(2.0, 1.0);
  var c = SIMD.float64x2.minNum(a, lower);
  t_.equal(-20.0, SIMD.float64x2.extractLane(c, 0));
  t_.equal(1.0, SIMD.float64x2.extractLane(c, 1));

  var x = SIMD.float64x2(-0, 0);
  var y = SIMD.float64x2(0, -0);
  var z = SIMD.float64x2.minNum(x, y);
  isNegativeZero(t_, SIMD.float64x2.extractLane(z, 0));
  isNegativeZero(t_, SIMD.float64x2.extractLane(z, 1));
  x = SIMD.float64x2(NaN, 0);
  y = SIMD.float64x2(0, NaN);
  z = SIMD.float64x2.minNum(x, y);
  isPositiveZero(t_, SIMD.float64x2.extractLane(z, 0));
  isPositiveZero(t_, SIMD.float64x2.extractLane(z, 1));
 t_.end();
});

test('float64x2 min exceptions', function(t_) {
  var ok    = SIMD.float64x2(1.0, 2.0);
  var notOk = 1;
  t_['throws'](function() {
    SIMD.float64x2.min(ok, notOk);
  });
  t_['throws'](function() {
    SIMD.float64x2.min(notOk, ok);
  });
 t_.end();
});

test('float64x2 max', function(t_) {
  var a = SIMD.float64x2(-20.0, 10.0);
  var upper = SIMD.float64x2(2.5, 5.0);
  var c = SIMD.float64x2.max(a, upper);
  t_.equal(2.5, SIMD.float64x2.extractLane(c, 0));
  t_.equal(10.0, SIMD.float64x2.extractLane(c, 1));

  var x = SIMD.float64x2(-0, 0);
  var y = SIMD.float64x2(0, -0);
  var z = SIMD.float64x2.max(x, y);
  isPositiveZero(t_, SIMD.float64x2.extractLane(z, 0));
  isPositiveZero(t_, SIMD.float64x2.extractLane(z, 1));
  x = SIMD.float64x2(NaN, 0);
  y = SIMD.float64x2(0, NaN);
  z = SIMD.float64x2.max(x, y);
  isNaN(t_, SIMD.float64x2.extractLane(z, 0))
  isNaN(t_, SIMD.float64x2.extractLane(z, 1))
 t_.end();
});

test('float64x2 maxNum', function(t_) {
  var a = SIMD.float64x2(-20.0, 10.0);
  var upper = SIMD.float64x2(2.5, 5.0);
  var c = SIMD.float64x2.maxNum(a, upper);
  t_.equal(2.5, SIMD.float64x2.extractLane(c, 0));
  t_.equal(10.0, SIMD.float64x2.extractLane(c, 1));

  var x = SIMD.float64x2(-0, 0);
  var y = SIMD.float64x2(0, -0);
  var z = SIMD.float64x2.maxNum(x, y);
  isPositiveZero(t_, SIMD.float64x2.extractLane(z, 0));
  isPositiveZero(t_, SIMD.float64x2.extractLane(z, 1));
  x = SIMD.float64x2(NaN, 0);
  y = SIMD.float64x2(0, NaN);
  z = SIMD.float64x2.maxNum(x, y);
  isPositiveZero(t_, SIMD.float64x2.extractLane(z, 0));
  isPositiveZero(t_, SIMD.float64x2.extractLane(z, 1));
 t_.end();
});

test('float64x2 max exceptions', function(t_) {
  var ok    = SIMD.float64x2(1.0, 2.0);
  var notOk = 1;
  t_['throws'](function() {
    SIMD.float64x2.max(ok, notOk);
  });
  t_['throws'](function() {
    SIMD.float64x2.max(notOk, ok);
  });
 t_.end();
});

test('float64x2 reciprocal approximation', function(t_) {
  var a = SIMD.float64x2(2.0, -2.0);
  var c = SIMD.float64x2.reciprocalApproximation(a);
  almostEqual(t_, 0.5, SIMD.float64x2.extractLane(c, 0));
  almostEqual(t_, -0.5, SIMD.float64x2.extractLane(c, 1));
  a = SIMD.float64x2(NaN, Infinity);
  c = SIMD.float64x2.reciprocalApproximation(a);
  isNaN(t_, SIMD.float64x2.extractLane(c, 0))
  isPositiveZero(t_, SIMD.float64x2.extractLane(c, 1));
  a = SIMD.float64x2(-Infinity, -0);
  c = SIMD.float64x2.reciprocalApproximation(a);
  isNegativeZero(t_, SIMD.float64x2.extractLane(c, 0));
  t_.equal(-Infinity, SIMD.float64x2.extractLane(c, 1));
  a = SIMD.float64x2(0, 2.3);
  c = SIMD.float64x2.reciprocalApproximation(a);
  t_.equal(Infinity, SIMD.float64x2.extractLane(c, 0));
  almostEqual(t_, 1/SIMD.float64x2.extractLane(a, 1), SIMD.float64x2.extractLane(c, 1));
  a = SIMD.float64x2(-4.5, 7.8);
  c = SIMD.float64x2.reciprocalApproximation(a);
  almostEqual(t_, 1/SIMD.float64x2.extractLane(a, 0), SIMD.float64x2.extractLane(c, 0));
  almostEqual(t_, 1/SIMD.float64x2.extractLane(a, 1), SIMD.float64x2.extractLane(c, 1));
 t_.end();
});

test('float64x2 reciprocal sqrt approximation', function(t_) {
  var a = SIMD.float64x2(1.0, 0.25);
  var c = SIMD.float64x2.reciprocalSqrtApproximation(a);
  almostEqual(t_, 1.0, SIMD.float64x2.extractLane(c, 0));
  almostEqual(t_, 2.0, SIMD.float64x2.extractLane(c, 1));
  a = SIMD.float64x2(-Infinity, Infinity);
  c = SIMD.float64x2.reciprocalSqrtApproximation(a);
  isNaN(t_, SIMD.float64x2.extractLane(c, 0))
  isPositiveZero(t_, SIMD.float64x2.extractLane(c, 1));
  a = SIMD.float64x2(NaN, 0);
  c = SIMD.float64x2.reciprocalSqrtApproximation(a);
  isNaN(t_, SIMD.float64x2.extractLane(c, 0))
  t_.equal(Infinity, SIMD.float64x2.extractLane(c, 1));
  a = SIMD.float64x2(-0, -1);
  c = SIMD.float64x2.reciprocalSqrtApproximation(a);
  t_.equal(-Infinity, SIMD.float64x2.extractLane(c, 0));
  isNaN(t_, SIMD.float64x2.extractLane(c, 1))
  a = SIMD.float64x2(121, 144);
  c = SIMD.float64x2.reciprocalSqrtApproximation(a);
  almostEqual(t_, 1/11, SIMD.float64x2.extractLane(c, 0));
  almostEqual(t_, 1/12, SIMD.float64x2.extractLane(c, 1));
 t_.end();
});

test('float64x2 sqrt', function(t_) {
  var a = SIMD.float64x2(16.0, 9.0);
  var c = SIMD.float64x2.sqrt(a);
  t_.equal(4.0, SIMD.float64x2.extractLane(c, 0));
  t_.equal(3.0, SIMD.float64x2.extractLane(c, 1));
  a = SIMD.float64x2(0.0, -0.0);
  c = SIMD.float64x2.sqrt(a);
  isPositiveZero(t_, SIMD.float64x2.extractLane(c, 0));
  isNegativeZero(t_, SIMD.float64x2.extractLane(c, 1));
  a = SIMD.float64x2(Infinity, -Infinity);
  c = SIMD.float64x2.sqrt(a);
  t_.equal(Infinity, SIMD.float64x2.extractLane(c, 0));
  isNaN(t_, SIMD.float64x2.extractLane(c, 1));
  a = SIMD.float64x2(NaN, 2.0);
  c = SIMD.float64x2.sqrt(a);
  isNaN(t_, SIMD.float64x2.extractLane(c, 0));
  t_.equal(Math.SQRT2, SIMD.float64x2.extractLane(c, 1));
  a = SIMD.float64x2(0.5, 121.0);
  c = SIMD.float64x2.sqrt(a);
  t_.equal(Math.SQRT1_2, SIMD.float64x2.extractLane(c, 0));
  t_.equal(11.0, SIMD.float64x2.extractLane(c, 1));
 t_.end();
});

test('float64x2 swizzle', function(t_) {
  var a  = SIMD.float64x2(1.0, 2.0);
  var xx = SIMD.float64x2.swizzle(a, 0, 0);
  var xy = SIMD.float64x2.swizzle(a, 0, 1);
  var yx = SIMD.float64x2.swizzle(a, 1, 0);
  var yy = SIMD.float64x2.swizzle(a, 1, 1);
  t_.equal(1.0, SIMD.float64x2.extractLane(xx, 0));
  t_.equal(1.0, SIMD.float64x2.extractLane(xx, 1));
  t_.equal(1.0, SIMD.float64x2.extractLane(xy, 0));
  t_.equal(2.0, SIMD.float64x2.extractLane(xy, 1));
  t_.equal(2.0, SIMD.float64x2.extractLane(yx, 0));
  t_.equal(1.0, SIMD.float64x2.extractLane(yx, 1));
  t_.equal(2.0, SIMD.float64x2.extractLane(yy, 0));
  t_.equal(2.0, SIMD.float64x2.extractLane(yy, 1));

  function testIndexCheck(index) {
      t_['throws'](function() { SIMD.float64x2.swizzle(a, index, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(2);
 t_.end();
});

test('float64x2 shuffle', function(t_) {
  var a  = SIMD.float64x2(1.0, 2.0);
  var b  = SIMD.float64x2(3.0, 4.0);
  var xx = SIMD.float64x2.shuffle(a, b, 0, 2);
  var xy = SIMD.float64x2.shuffle(a, b, 0, 3);
  var yx = SIMD.float64x2.shuffle(a, b, 1, 0);
  var yy = SIMD.float64x2.shuffle(a, b, 1, 3);
  t_.equal(1.0, SIMD.float64x2.extractLane(xx, 0));
  t_.equal(3.0, SIMD.float64x2.extractLane(xx, 1));
  t_.equal(1.0, SIMD.float64x2.extractLane(xy, 0));
  t_.equal(4.0, SIMD.float64x2.extractLane(xy, 1));
  t_.equal(2.0, SIMD.float64x2.extractLane(yx, 0));
  t_.equal(1.0, SIMD.float64x2.extractLane(yx, 1));
  t_.equal(2.0, SIMD.float64x2.extractLane(yy, 0));
  t_.equal(4.0, SIMD.float64x2.extractLane(yy, 1));

  var c = SIMD.float64x2.shuffle(a, b, 1, 0);
  var d = SIMD.float64x2.shuffle(a, b, 3, 2);
  var e = SIMD.float64x2.shuffle(a, b, 0, 1);
  var f = SIMD.float64x2.shuffle(a, b, 0, 2);
  t_.equal(2.0, SIMD.float64x2.extractLane(c, 0));
  t_.equal(1.0, SIMD.float64x2.extractLane(c, 1));
  t_.equal(4.0, SIMD.float64x2.extractLane(d, 0));
  t_.equal(3.0, SIMD.float64x2.extractLane(d, 1));
  t_.equal(1.0, SIMD.float64x2.extractLane(e, 0));
  t_.equal(2.0, SIMD.float64x2.extractLane(e, 1));
  t_.equal(1.0, SIMD.float64x2.extractLane(f, 0));
  t_.equal(3.0, SIMD.float64x2.extractLane(f, 1));

  function testIndexCheck(index) {
      t_['throws'](function() { SIMD.float64x2.shuffle(a, b, index, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(4);
 t_.end();
});

test('float64x2 replaceLane', function(t_) {
    var a = SIMD.float64x2(16.0, 9.0);
    var c = SIMD.float64x2.replaceLane(a, 0, 20.0);
    t_.equal(20.0, SIMD.float64x2.extractLane(c, 0));
    t_.equal(9.0, SIMD.float64x2.extractLane(c, 1));
    c = SIMD.float64x2.replaceLane(a, 1, 20.0);
    t_.equal(16.0, SIMD.float64x2.extractLane(c, 0));
    t_.equal(20.0, SIMD.float64x2.extractLane(c, 1));

    function testIndexCheck(index) {
      t_['throws'](function() { SIMD.float64x2.replaceLane(a, index, 0.0); });
    }
    testIndexCheck(13.37);
    testIndexCheck(null);
    testIndexCheck(undefined);
    testIndexCheck({});
    testIndexCheck(true);
    testIndexCheck('yo');
    testIndexCheck(-1);
    testIndexCheck(8);
 t_.end();
});

test('float64x2 comparisons', function(t_) {
  var m = SIMD.float64x2(1.0, 2.0);
  var n = SIMD.float64x2(2.0, 2.0);
  var o = SIMD.float64x2(0.1, 0.001);
  var p = SIMD.float64x2(0.001, 0.1);

  var cmp;
  cmp = SIMD.float64x2.lessThan(m, n);
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 1));
  cmp = SIMD.float64x2.lessThan(o, p);
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 1));

  cmp = SIMD.float64x2.lessThanOrEqual(m, n);
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 1));
  cmp = SIMD.float64x2.lessThanOrEqual(o, p);
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 1));

  cmp = SIMD.float64x2.equal(m, n);
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 1));
  cmp = SIMD.float64x2.equal(o, p);
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 1));

  cmp = SIMD.float64x2.notEqual(m, n);
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 1));
  cmp = SIMD.float64x2.notEqual(o, p);
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 1));

  cmp = SIMD.float64x2.greaterThanOrEqual(m, n);
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 1));
  cmp = SIMD.float64x2.greaterThanOrEqual(o, p);
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 1));

  cmp = SIMD.float64x2.greaterThan(m, n);
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 1));
  cmp = SIMD.float64x2.greaterThan(o, p);
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 1));

  var o = SIMD.float64x2(0.0, -0.0);
  var p = SIMD.float64x2(-0.0, 0.0);
  var q = SIMD.float64x2(0.0, NaN);
  var r = SIMD.float64x2(NaN, 0.0);
  cmp = SIMD.float64x2.lessThan(o, p);
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 1));
  cmp = SIMD.float64x2.lessThan(q, r);
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 1));

  cmp = SIMD.float64x2.lessThanOrEqual(o, p);
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 1));
  cmp = SIMD.float64x2.lessThanOrEqual(q, r);
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 1));

  cmp = SIMD.float64x2.equal(o, p);
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 1));
  cmp = SIMD.float64x2.equal(q, r);
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 1));

  cmp = SIMD.float64x2.notEqual(o, p);
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 1));
  cmp = SIMD.float64x2.notEqual(q, r);
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 1));

  cmp = SIMD.float64x2.greaterThanOrEqual(o, p);
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 1));
  cmp = SIMD.float64x2.greaterThanOrEqual(q, r);
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 1));

  cmp = SIMD.float64x2.greaterThan(o, p);
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 1));
  cmp = SIMD.float64x2.greaterThan(q, r);
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 1));
 t_.end();
});

test('float64x2 select', function(t_) {
  var m = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0xaaaaaaaa, 0xaaaaaaaa,
                                                    0x55555555, 0x55555555));
  var t = SIMD.float64x2(1.0, 2.0);
  var f = SIMD.float64x2(3.0, 4.0);
  var s = SIMD.float64x2.select(m, t, f);
  t_.equal(1.0, SIMD.float64x2.extractLane(s, 0));
  t_.equal(4.0, SIMD.float64x2.extractLane(s, 1));
 t_.end();
});

test('float64x2 selectBits', function(t_) {
  var m = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0xaaaaaaaa, 0xaaaaaaaa,
                                                    0x55555555, 0x55555555));
  var t = SIMD.float64x2(1.0, 2.0);
  var f = SIMD.float64x2(3.0, 4.0);
  var s = SIMD.float64x2.selectBits(m, t, f);
  t_.equal(4.013165208090495e+205, SIMD.float64x2.extractLane(s, 0));
  t_.equal(2.0, SIMD.float64x2.extractLane(s, 1));
 t_.end();
});

test('float64x2 load', function(t_) {
  var a = new Float64Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.float64x2.load(a, i);
    t_.equal(i, SIMD.float64x2.extractLane(v, 0));
    t_.equal(i+1, SIMD.float64x2.extractLane(v, 1));
  }
 t_.end();
});

test('float64x2 unaligned load', function(t_) {
  var a = new Float64Array(8);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.float64x2.load(b, i * 8 + 1);
    t_.equal(i, SIMD.float64x2.extractLane(v, 0));
    t_.equal(i+1, SIMD.float64x2.extractLane(v, 1));
  }
 t_.end();
});

test('float64x2 load1', function(t_) {
  var a = new Float64Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length; i++) {
    var v = SIMD.float64x2.load1(a, i);
    t_.equal(i, SIMD.float64x2.extractLane(v, 0));
    isPositiveZero(t_, SIMD.float64x2.extractLane(v, 1));
  }
 t_.end();
});

test('float64x2 unaligned load1', function(t_) {
  var a = new Float64Array(8);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Copy the values unaligned.
  for (var i = 0; i < a.length; i++) {
    var v = SIMD.float64x2.load1(b, i * 8 + 1);
    t_.equal(i, SIMD.float64x2.extractLane(v, 0));
    isPositiveZero(t_, SIMD.float64x2.extractLane(v, 1));
  }
 t_.end();
});

test('float64x2 store', function(t_) {
  var a = new Float64Array(6);
  SIMD.float64x2.store(a, 0, SIMD.float64x2(0, 1));
  SIMD.float64x2.store(a, 2, SIMD.float64x2(2, 3));
  SIMD.float64x2.store(a, 4, SIMD.float64x2(4, 5));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('float64x2 unaligned store', function(t_) {
  var c = new Int8Array(48 + 1);
  SIMD.float64x2.store(c, 0 + 1, SIMD.float64x2(0, 1));
  SIMD.float64x2.store(c, 16 + 1, SIMD.float64x2(2, 3));
  SIMD.float64x2.store(c, 32 + 1, SIMD.float64x2(4, 5));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Float64Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('float64x2 store1', function(t_) {
  var a = new Float64Array(4);
  SIMD.float64x2.store1(a, 0, SIMD.float64x2(0, -1));
  SIMD.float64x2.store1(a, 1, SIMD.float64x2(1, -1));
  SIMD.float64x2.store1(a, 2, SIMD.float64x2(2, -1));
  SIMD.float64x2.store1(a, 3, SIMD.float64x2(3, -1));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('float64x2 unaligned store1', function(t_) {
  var c = new Int8Array(32 + 1);
  SIMD.float64x2.store1(c, 0 + 1, SIMD.float64x2(0, -1));
  SIMD.float64x2.store1(c, 8 + 1, SIMD.float64x2(1, -1));
  SIMD.float64x2.store1(c, 16 + 1, SIMD.float64x2(2, -1));
  SIMD.float64x2.store1(c, 24 + 1, SIMD.float64x2(3, -1));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Float64Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('float64x2 load exceptions', function (t_) {
  var a = new Float64Array(8);
  t_['throws'](function () {
    var f = SIMD.float64x2.load(a, -1);
  });
  t_['throws'](function () {
    var f = SIMD.float64x2.load(a, 7);
  });
  t_['throws'](function () {
    var f = SIMD.float64x2.load(a.buffer, 1);
  });
  t_['throws'](function () {
    var f = SIMD.float64x2.load(a, "a");
  });
 t_.end();
});

test('float64x2 load1 exceptions', function (t_) {
  var a = new Float64Array(8);
  t_['throws'](function () {
    var f = SIMD.float64x2.load1(a, -1);
  });
  t_['throws'](function () {
    var f = SIMD.float64x2.load1(a, 8);
  });
  t_['throws'](function () {
    var f = SIMD.float64x2.load1(a.buffer, 1);
  });
  t_['throws'](function () {
    var f = SIMD.float64x2.load1(a, "a");
  });
 t_.end();
});

test('float64x2 store exceptions', function (t_) {
  var a = new Float64Array(8);
  var f = SIMD.float64x2(1, 2);
  var i = SIMD.int32x4(1, 2, 3, 4);
  t_['throws'](function () {
    SIMD.float64x2.store(a, -1, f);
  });
  t_['throws'](function () {
    SIMD.float64x2.store(a, 7, f);
  });
  t_['throws'](function () {
    SIMD.float64x2.store(a.buffer, 1, f);
  });
  t_['throws'](function () {
    SIMD.float64x2.store(a, "a", f);
  });
  t_['throws'](function () {
    SIMD.float64x2.store(a, 1, i);
  });
 t_.end();
});

test('float64x2 store1 exceptions', function (t_) {
  var a = new Float64Array(8);
  var f = SIMD.float64x2(1, 2);
  var i = SIMD.int32x4(1, 2, 3, 4);
  t_['throws'](function () {
    SIMD.float64x2.store1(a, -1, f);
  });
  t_['throws'](function () {
    SIMD.float64x2.store1(a, 8, f);
  });
  t_['throws'](function () {
    SIMD.float64x2.store1(a.buffer, 1, f);
  });
  t_['throws'](function () {
    SIMD.float64x2.store1(a, "a", f);
  });
  t_['throws'](function () {
    SIMD.float64x2.store1(a, 1, i);
  });
 t_.end();
});

test('int64x2 allTrue', function (t_) {
  var v0000 = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x00000000, 0x7FFFFFFF, 0x00000001, 0x5A5A5A5A));
  var v0001 = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x00000000, 0x7FFFFFFF, 0x00000001, 0xA5A5A5A5));
  var v0010 = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x00000000, 0x7FFFFFFF, 0x80000001, 0x5A5A5A5A));
  var v0100 = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x00000000, 0xFFFFFFFF, 0x00000001, 0x5A5A5A5A));
  var v1000 = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x80000000, 0x7FFFFFFF, 0x00000001, 0x5A5A5A5A));
  var v0011 = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x00000000, 0x7FFFFFFF, 0x80000001, 0xA5A5A5A5));
  var v0111 = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x00000000, 0xFFFFFFFF, 0x80000001, 0xA5A5A5A5));
  var v1111 = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x80000000, 0xFFFFFFFF, 0x80000001, 0xA5A5A5A5));
  t_.equal(SIMD.int64x2.allTrue(v0000), false);
  t_.equal(SIMD.int64x2.allTrue(v0001), false);
  t_.equal(SIMD.int64x2.allTrue(v0010), false);
  t_.equal(SIMD.int64x2.allTrue(v0100), false);
  t_.equal(SIMD.int64x2.allTrue(v1000), false);
  t_.equal(SIMD.int64x2.allTrue(v0011), false);
  t_.equal(SIMD.int64x2.allTrue(v0111), false);
  t_.equal(SIMD.int64x2.allTrue(v1111), true);
 t_.end();
});

test('int64x2 fromFloat64x2Bits constructor', function(t_) {
  var m = SIMD.float64x2(1.0, 2.0);
  var n = SIMD.int64x2.fromFloat64x2Bits(m);
  var v = SIMD.int32x4.fromInt64x2Bits(n);
  t_.equal(0x00000000, SIMD.int32x4.extractLane(v, 0));
  t_.equal(0x3FF00000, SIMD.int32x4.extractLane(v, 1));
  t_.equal(0x00000000, SIMD.int32x4.extractLane(v, 2));
  t_.equal(0x40000000, SIMD.int32x4.extractLane(v, 3));
 t_.end();
});

test('int64x2 anyTrue', function (t_) {
  var v00 = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x00000000, 0x7FFFFFFF, 0x00000001, 0x5A5A5A5A));
  var v01 = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x00000000, 0x7FFFFFFF, 0x80000001, 0x5A5A5A5A));
  var v10 = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x80000000, 0x7FFFFFFF, 0x00000001, 0x5A5A5A5A));
  var v11 = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x80000000, 0x7FFFFFFF, 0x80000001, 0x5A5A5A5A));
  t_.equal(SIMD.int64x2.anyTrue(v00), false);
  t_.equal(SIMD.int64x2.anyTrue(v01), true);
  t_.equal(SIMD.int64x2.anyTrue(v10), true);
  t_.equal(SIMD.int64x2.anyTrue(v11), true);
 t_.end();
});

test('int64x2 and', function(t_) {
  var m = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0xAAAAAAAA, 0xAAAAAAAA, -1431655766, 0xAAAAAAAA));
  var n = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555));
  var o = SIMD.int64x2.and(m,n);  // and
  var p = SIMD.int32x4.fromInt64x2Bits(o);
  t_.equal(0x0, SIMD.int32x4.extractLane(p, 0));
  t_.equal(0x0, SIMD.int32x4.extractLane(p, 1));
  t_.equal(0x0, SIMD.int32x4.extractLane(p, 2));
  t_.equal(0x0, SIMD.int32x4.extractLane(p, 3));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(o, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(o, 1));
 t_.end();
});

test('int64x2 or', function(t_) {
  var m = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA));
  var n = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555));
  var o = SIMD.int64x2.or(m,n);  // or
  var p = SIMD.int32x4.fromInt64x2Bits(o);
  t_.equal(-1, SIMD.int32x4.extractLane(p, 0));
  t_.equal(-1, SIMD.int32x4.extractLane(p, 1));
  t_.equal(-1, SIMD.int32x4.extractLane(p, 2));
  t_.equal(-1, SIMD.int32x4.extractLane(p, 3));
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(o, 0));
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(o, 1));
 t_.end();
});

test('int64x2 xor', function(t_) {
  var m = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA));
  var n = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555));
  var o = SIMD.int64x2.xor(m,n);  // xor
  var p = SIMD.int32x4.fromInt64x2Bits(o);
  t_.equal(-1, SIMD.int32x4.extractLane(p, 0));
  t_.equal(-1, SIMD.int32x4.extractLane(p, 1));
  t_.equal(-1, SIMD.int32x4.extractLane(p, 2));
  t_.equal(-1, SIMD.int32x4.extractLane(p, 3));
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(o, 0));
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(o, 1));
 t_.end();
});

test('int64x2 comparisons', function(t_) {
  var m = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(1000, 2000, 100, 100));
  var n = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(-2000, 2000, 100, 100));
  var cmp;

  cmp = SIMD.int64x2.equal(m, n);
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 1));

  cmp = SIMD.int64x2.notEqual(m, n);
  t_.equal(true, SIMD.int64x2.extractLaneAsBool(cmp, 0));
  t_.equal(false, SIMD.int64x2.extractLaneAsBool(cmp, 1));
 t_.end();
});

test('int64x2 load', function(t_) {
  var a = new Int32Array(16);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 3; i++) {
    var v = SIMD.int64x2.load(a, i);
    var w = SIMD.int32x4.fromInt64x2Bits(v);
    t_.equal(i, SIMD.int32x4.extractLane(w, 0));
    t_.equal(i+1, SIMD.int32x4.extractLane(w, 1));
    t_.equal(i+2, SIMD.int32x4.extractLane(w, 2));
    t_.equal(i+3, SIMD.int32x4.extractLane(w, 3));
  }
 t_.end();
});

test('int64x2 unaligned load', function(t_) {
  var a = new Int32Array(16);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length - 3; i++) {
    var v = SIMD.int64x2.load(b, i * 4 + 1);
    var w = SIMD.int32x4.fromInt64x2Bits(v);
    t_.equal(i, SIMD.int32x4.extractLane(w, 0));
    t_.equal(i+1, SIMD.int32x4.extractLane(w, 1));
    t_.equal(i+2, SIMD.int32x4.extractLane(w, 2));
    t_.equal(i+3, SIMD.int32x4.extractLane(w, 3));
  }
 t_.end();
});

test('int64x2 load1', function(t_) {
  var a = new Int32Array(16);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.int64x2.load1(a, i);
    var w = SIMD.int32x4.fromInt64x2Bits(v);
    t_.equal(i, SIMD.int32x4.extractLane(w, 0));
    t_.equal(i+1, SIMD.int32x4.extractLane(w, 1));
    isPositiveZero(t_, SIMD.int32x4.extractLane(w, 2));
    isPositiveZero(t_, SIMD.int32x4.extractLane(w, 3));
  }
 t_.end();
});

test('int64x2 unaligned load1', function(t_) {
  var a = new Int32Array(16);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Copy the values unaligned.
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.int64x2.load1(b, i * 4 + 1);
    var w = SIMD.int32x4.fromInt64x2Bits(v);
    t_.equal(i, SIMD.int32x4.extractLane(w, 0));
    t_.equal(i+1, SIMD.int32x4.extractLane(w, 1));
    isPositiveZero(t_, SIMD.int32x4.extractLane(w, 2));
    isPositiveZero(t_, SIMD.int32x4.extractLane(w, 3));
  }
 t_.end();
});

test('int64x2 store', function(t_) {
  var a = new Int32Array(12);
  SIMD.int64x2.store(a, 0, SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0, 1, 2, 3)));
  SIMD.int64x2.store(a, 4, SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(4, 5, 6, 7)));
  SIMD.int64x2.store(a, 8, SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(8, 9, 10, 11)));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('int64x2 unaligned store', function(t_) {
  var c = new Int8Array(48 + 1);
  SIMD.int64x2.store(c, 0 + 1, SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0, 1, 2, 3)));
  SIMD.int64x2.store(c, 16 + 1, SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(4, 5, 6, 7)));
  SIMD.int64x2.store(c, 32 + 1, SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(8, 9, 10, 11)));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Int32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('int64x2 store1', function(t_) {
  var a = new Int32Array(8);
  SIMD.int64x2.store1(a, 0, SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0, 1, -1, -1)));
  SIMD.int64x2.store1(a, 2, SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(2, 3, -1, -1)));
  SIMD.int64x2.store1(a, 4, SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(4, 5, -1, -1)));
  SIMD.int64x2.store1(a, 6, SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(6, 7, -1, -1)));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('int64x2 unaligned store1', function(t_) {
  var c = new Int8Array(32 + 1);
  SIMD.int64x2.store1(c, 0 + 1, SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0, 1, -1, -1)));
  SIMD.int64x2.store1(c, 8 + 1, SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(2, 3, -1, -1)));
  SIMD.int64x2.store1(c, 16 + 1, SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(4, 5, -1, -1)));
  SIMD.int64x2.store1(c, 24 + 1, SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(6, 7, -1, -1)));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Int32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('int64x2 load exceptions', function (t_) {
  var a = new Float64Array(8);
  t_['throws'](function () {
    var f = SIMD.int64x2.load(a, -1);
  });
  t_['throws'](function () {
    var f = SIMD.int64x2.load(a, 7);
  });
  t_['throws'](function () {
    var f = SIMD.int64x2.load(a.buffer, 1);
  });
  t_['throws'](function () {
    var f = SIMD.int64x2.load(a, "a");
  });
 t_.end();
});

test('int64x2 load1 exceptions', function (t_) {
  var a = new Float64Array(8);
  t_['throws'](function () {
    var f = SIMD.int64x2.load1(a, -1);
  });
  t_['throws'](function () {
    var f = SIMD.int64x2.load1(a, 8);
  });
  t_['throws'](function () {
    var f = SIMD.int64x2.load1(a.buffer, 1);
  });
  t_['throws'](function () {
    var f = SIMD.int64x2.load1(a, "a");
  });
 t_.end();
});

test('int64x2 store exceptions', function (t_) {
  var a = new Float64Array(8);
  var f = SIMD.int64x2(1, 2);
  var i = SIMD.int32x4(1, 2, 3, 4);
  t_['throws'](function () {
    SIMD.int64x2.store(a, -1, f);
  });
  t_['throws'](function () {
    SIMD.int64x2.store(a, 7, f);
  });
  t_['throws'](function () {
    SIMD.int64x2.store(a.buffer, 1, f);
  });
  t_['throws'](function () {
    SIMD.int64x2.store(a, "a", f);
  });
  t_['throws'](function () {
    SIMD.int64x2.store(a, 1, i);
  });
 t_.end();
});

test('int64x2 store1 exceptions', function (t_) {
  var a = new Float64Array(8);
  var f = SIMD.int64x2(1, 2);
  var i = SIMD.int32x4(1, 2, 3, 4);
  t_['throws'](function () {
    SIMD.int64x2.store1(a, -1, f);
  });
  t_['throws'](function () {
    SIMD.int64x2.store1(a, 8, f);
  });
  t_['throws'](function () {
    SIMD.int64x2.store1(a.buffer, 1, f);
  });
  t_['throws'](function () {
    SIMD.int64x2.store1(a, "a", f);
  });
  t_['throws'](function () {
    SIMD.int64x2.store1(a, 1, i);
  });
 t_.end();
});

test('int32x4 fromFloat32x4 constructor', function(t_) {
  var m = SIMD.float32x4(1.0, 2.2, 3.6, 4.8);
  var n = SIMD.int32x4.fromFloat32x4(m);
  t_.equal(1, SIMD.int32x4.extractLane(n, 0));
  t_.equal(2, SIMD.int32x4.extractLane(n, 1));
  t_.equal(3, SIMD.int32x4.extractLane(n, 2));
  t_.equal(4, SIMD.int32x4.extractLane(n, 3));

  m = SIMD.float32x4(0.0, -0.0, -1.2, -3.8);
  n = SIMD.int32x4.fromFloat32x4(m);
  t_.equal(0, SIMD.int32x4.extractLane(n, 0));
  t_.equal(0, SIMD.int32x4.extractLane(n, 1));
  t_.equal(-1, SIMD.int32x4.extractLane(n, 2));
  t_.equal(-3, SIMD.int32x4.extractLane(n, 3));

  t_['throws'](function() {
    SIMD.int32x4.fromFloat32x4(SIMD.float32x4(0x7fffffff, 0, 0, 0));
  });
  t_['throws'](function() {
    SIMD.int32x4.fromFloat32x4(SIMD.float32x4(0, -0x80000081, 0, 0));
  });
  t_['throws'](function() {
    SIMD.int32x4.fromFloat32x4(SIMD.float32x4(0, 0, 2147483648, 0));
  });
  t_['throws'](function() {
    SIMD.int32x4.fromFloat32x4(SIMD.float32x4(0, 0, 0, -2147483904));
  });
  t_['throws'](function() {
    SIMD.int32x4.fromFloat32x4(SIMD.float32x4(Infinity, 0, 0, 0));
  });
  t_['throws'](function() {
    SIMD.int32x4.fromFloat32x4(SIMD.float32x4(0, -Infinity, 0, 0));
  });
  t_['throws'](function() {
    SIMD.int32x4.fromFloat32x4(SIMD.float32x4(0, 0, NaN, 0));
  });
 t_.end();
});

test('int32x4 fromFloat64x2 constructor', function(t_) {
  var m = SIMD.float64x2(1.0, 2.2);
  var n = SIMD.int32x4.fromFloat64x2(m);
  t_.equal(1, SIMD.int32x4.extractLane(n, 0));
  t_.equal(2, SIMD.int32x4.extractLane(n, 1));
  t_.equal(0, SIMD.int32x4.extractLane(n, 2));
  t_.equal(0, SIMD.int32x4.extractLane(n, 3));

  m = SIMD.float64x2(3.6, 4.8);
  n = SIMD.int32x4.fromFloat64x2(m);
  t_.equal(3, SIMD.int32x4.extractLane(n, 0));
  t_.equal(4, SIMD.int32x4.extractLane(n, 1));
  t_.equal(0, SIMD.int32x4.extractLane(n, 2));
  t_.equal(0, SIMD.int32x4.extractLane(n, 3));

  m = SIMD.float64x2(0.0, -0.0);
  n = SIMD.int32x4.fromFloat64x2(m);
  t_.equal(0, SIMD.int32x4.extractLane(n, 0));
  t_.equal(0, SIMD.int32x4.extractLane(n, 1));
  t_.equal(0, SIMD.int32x4.extractLane(n, 2));
  t_.equal(0, SIMD.int32x4.extractLane(n, 3));

  m = SIMD.float64x2(-1.2, -3.8);
  n = SIMD.int32x4.fromFloat64x2(m);
  t_.equal(-1, SIMD.int32x4.extractLane(n, 0));
  t_.equal(-3, SIMD.int32x4.extractLane(n, 1));
  t_.equal(0, SIMD.int32x4.extractLane(n, 2));
  t_.equal(0, SIMD.int32x4.extractLane(n, 3));

  m = SIMD.float64x2(2147483647.9, -2147483648.9);
  n = SIMD.int32x4.fromFloat64x2(m);
  t_.equal(2147483647, SIMD.int32x4.extractLane(n, 0));
  t_.equal(-2147483648, SIMD.int32x4.extractLane(n, 1));

  t_['throws'](function() {
    SIMD.int32x4.fromFloat64x2(SIMD.float64x2(0x80000000, 0));
  });
  t_['throws'](function() {
    SIMD.int32x4.fromFloat64x2(SIMD.float64x2(0, -0x80000001));
  });
  t_['throws'](function() {
    SIMD.int32x4.fromFloat64x2(SIMD.float64x2(Infinity, 0));
  });
  t_['throws'](function() {
    SIMD.int32x4.fromFloat64x2(SIMD.float64x2(0, -Infinity));
  });
  t_['throws'](function() {
    SIMD.int32x4.fromFloat64x2(SIMD.float64x2(NaN, 0));
  });
 t_.end();
});

test('int32x4 fromInt64x2Bits constructor', function(t_) {
  var m = SIMD.int64x2.fromInt32x4Bits(SIMD.int32x4(0, 1, 2, 3));
  var n = SIMD.int32x4.fromInt64x2Bits(m);
  t_.equal(0, SIMD.int32x4.extractLane(n, 0));
  t_.equal(1, SIMD.int32x4.extractLane(n, 1));
  t_.equal(2, SIMD.int32x4.extractLane(n, 2));
  t_.equal(3, SIMD.int32x4.extractLane(n, 3));
 t_.end();
});

test('int32x4 fromFloat32x4Bits constructor', function(t_) {
  var m = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var n = SIMD.int32x4.fromFloat32x4Bits(m);
  t_.equal(0x3F800000, SIMD.int32x4.extractLane(n, 0));
  t_.equal(0x40000000, SIMD.int32x4.extractLane(n, 1));
  t_.equal(0x40400000, SIMD.int32x4.extractLane(n, 2));
  t_.equal(0x40800000, SIMD.int32x4.extractLane(n, 3));
 t_.end();
});

test('int32x4 fromFloat64x2Bits constructor', function(t_) {
  var m = SIMD.float64x2(1.0, 2.0);
  var n = SIMD.int32x4.fromFloat64x2Bits(m);
  t_.equal(0x00000000, SIMD.int32x4.extractLane(n, 0));
  t_.equal(0x3FF00000, SIMD.int32x4.extractLane(n, 1));
  t_.equal(0x00000000, SIMD.int32x4.extractLane(n, 2));
  t_.equal(0x40000000, SIMD.int32x4.extractLane(n, 3));
 t_.end();
});

test('int32x4 swizzle', function(t_) {
  var a    = SIMD.int32x4(1, 2, 3, 2147483647);
  var xyxy = SIMD.int32x4.swizzle(a, 0, 1, 0, 1);
  var zwzw = SIMD.int32x4.swizzle(a, 2, 3, 2, 3);
  var xxxx = SIMD.int32x4.swizzle(a, 0, 0, 0, 0);
  t_.equal(1, SIMD.int32x4.extractLane(xyxy, 0));
  t_.equal(2, SIMD.int32x4.extractLane(xyxy, 1));
  t_.equal(1, SIMD.int32x4.extractLane(xyxy, 2));
  t_.equal(2, SIMD.int32x4.extractLane(xyxy, 3));
  t_.equal(3, SIMD.int32x4.extractLane(zwzw, 0));
  t_.equal(2147483647, SIMD.int32x4.extractLane(zwzw, 1));
  t_.equal(3, SIMD.int32x4.extractLane(zwzw, 2));
  t_.equal(2147483647, SIMD.int32x4.extractLane(zwzw, 3));
  t_.equal(1, SIMD.int32x4.extractLane(xxxx, 0));
  t_.equal(1, SIMD.int32x4.extractLane(xxxx, 1));
  t_.equal(1, SIMD.int32x4.extractLane(xxxx, 2));
  t_.equal(1, SIMD.int32x4.extractLane(xxxx, 3));

  function testIndexCheck(index) {
      t_['throws'](function() { SIMD.int32x4.swizzle(a, index, 0, 0, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(4);
 t_.end();
});

test('int32x4 shuffle', function(t_) {
  var a    = SIMD.int32x4(1, 2, 3, 4);
  var b    = SIMD.int32x4(5, 6, 7, 2147483647);
  var xyxy = SIMD.int32x4.shuffle(a, b, 0, 1, 4, 5);
  var zwzw = SIMD.int32x4.shuffle(a, b, 2, 3, 6, 7);
  var xxxx = SIMD.int32x4.shuffle(a, b, 0, 0, 4, 4);
  t_.equal(1, SIMD.int32x4.extractLane(xyxy, 0));
  t_.equal(2, SIMD.int32x4.extractLane(xyxy, 1));
  t_.equal(5, SIMD.int32x4.extractLane(xyxy, 2));
  t_.equal(6, SIMD.int32x4.extractLane(xyxy, 3));
  t_.equal(3, SIMD.int32x4.extractLane(zwzw, 0));
  t_.equal(4, SIMD.int32x4.extractLane(zwzw, 1));
  t_.equal(7, SIMD.int32x4.extractLane(zwzw, 2));
  t_.equal(2147483647, SIMD.int32x4.extractLane(zwzw, 3));
  t_.equal(1, SIMD.int32x4.extractLane(xxxx, 0));
  t_.equal(1, SIMD.int32x4.extractLane(xxxx, 1));
  t_.equal(5, SIMD.int32x4.extractLane(xxxx, 2));
  t_.equal(5, SIMD.int32x4.extractLane(xxxx, 3));

  var c = SIMD.int32x4.shuffle(a, b, 0, 4, 5, 1);
  var d = SIMD.int32x4.shuffle(a, b, 2, 6, 3, 7);
  var e = SIMD.int32x4.shuffle(a, b, 0, 4, 0, 4);
  t_.equal(1, SIMD.int32x4.extractLane(c, 0));
  t_.equal(5, SIMD.int32x4.extractLane(c, 1));
  t_.equal(6, SIMD.int32x4.extractLane(c, 2));
  t_.equal(2, SIMD.int32x4.extractLane(c, 3));
  t_.equal(3, SIMD.int32x4.extractLane(d, 0));
  t_.equal(7, SIMD.int32x4.extractLane(d, 1));
  t_.equal(4, SIMD.int32x4.extractLane(d, 2));
  t_.equal(2147483647, SIMD.int32x4.extractLane(d, 3));
  t_.equal(1, SIMD.int32x4.extractLane(e, 0));
  t_.equal(5, SIMD.int32x4.extractLane(e, 1));
  t_.equal(1, SIMD.int32x4.extractLane(e, 2));
  t_.equal(5, SIMD.int32x4.extractLane(e, 3));

  function testIndexCheck(index) {
      t_['throws'](function() { SIMD.int32x4.shuffle(a, b, index, 0, 0, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(8);
 t_.end();
});

test('int32x4 replaceLane', function(t_) {
    var a = SIMD.int32x4(1, 2, 3, 4);
    var c = SIMD.int32x4.replaceLane(a, 0, 20);
    t_.equal(20, SIMD.int32x4.extractLane(c, 0));
    t_.equal(2, SIMD.int32x4.extractLane(c, 1));
    t_.equal(3, SIMD.int32x4.extractLane(c, 2));
    t_.equal(4, SIMD.int32x4.extractLane(c, 3));
    c = SIMD.int32x4.replaceLane(a, 1, 20);
    t_.equal(1, SIMD.int32x4.extractLane(c, 0));
    t_.equal(20, SIMD.int32x4.extractLane(c, 1));
    t_.equal(3, SIMD.int32x4.extractLane(c, 2));
    t_.equal(4, SIMD.int32x4.extractLane(c, 3));
    c = SIMD.int32x4.replaceLane(a, 2, 20);
    t_.equal(1, SIMD.int32x4.extractLane(c, 0));
    t_.equal(2, SIMD.int32x4.extractLane(c, 1));
    t_.equal(20, SIMD.int32x4.extractLane(c, 2));
    t_.equal(4, SIMD.int32x4.extractLane(c, 3));
    c = SIMD.int32x4.replaceLane(a, 3, 20);
    t_.equal(1, SIMD.int32x4.extractLane(c, 0));
    t_.equal(2, SIMD.int32x4.extractLane(c, 1));
    t_.equal(3, SIMD.int32x4.extractLane(c, 2));
    t_.equal(20, SIMD.int32x4.extractLane(c, 3));

    function testIndexCheck(index) {
      t_['throws'](function() { SIMD.int32x4.replaceLane(a, index, 0.0); });
    }
    testIndexCheck(13.37);
    testIndexCheck(null);
    testIndexCheck(undefined);
    testIndexCheck({});
    testIndexCheck(true);
    testIndexCheck('yo');
    testIndexCheck(-1);
    testIndexCheck(8);
 t_.end();
});

test('int32x4 and', function(t_) {
  var m = SIMD.int32x4(0xAAAAAAAA, 0xAAAAAAAA, -1431655766, 0xAAAAAAAA);
  var n = SIMD.int32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
  t_.equal(-1431655766, SIMD.int32x4.extractLane(m, 0));
  t_.equal(-1431655766, SIMD.int32x4.extractLane(m, 1));
  t_.equal(-1431655766, SIMD.int32x4.extractLane(m, 2));
  t_.equal(-1431655766, SIMD.int32x4.extractLane(m, 3));
  t_.equal(0x55555555, SIMD.int32x4.extractLane(n, 0));
  t_.equal(0x55555555, SIMD.int32x4.extractLane(n, 1));
  t_.equal(0x55555555, SIMD.int32x4.extractLane(n, 2));
  t_.equal(0x55555555, SIMD.int32x4.extractLane(n, 3));
  t_.equal(true, toBool(SIMD.int32x4.extractLane(m, 0)));
  t_.equal(true, toBool(SIMD.int32x4.extractLane(m, 1)));
  t_.equal(true, toBool(SIMD.int32x4.extractLane(m, 2)));
  t_.equal(true, toBool(SIMD.int32x4.extractLane(m, 3)));
  t_.equal(false, toBool(SIMD.int32x4.extractLane(n, 0)));
  t_.equal(false, toBool(SIMD.int32x4.extractLane(n, 1)));
  t_.equal(false, toBool(SIMD.int32x4.extractLane(n, 2)));
  t_.equal(false, toBool(SIMD.int32x4.extractLane(n, 3)));
  var o = SIMD.int32x4.and(m,n);  // and
  t_.equal(0x0, SIMD.int32x4.extractLane(o, 0));
  t_.equal(0x0, SIMD.int32x4.extractLane(o, 1));
  t_.equal(0x0, SIMD.int32x4.extractLane(o, 2));
  t_.equal(0x0, SIMD.int32x4.extractLane(o, 3));
  t_.equal(false, toBool(SIMD.int32x4.extractLane(o, 0)));
  t_.equal(false, toBool(SIMD.int32x4.extractLane(o, 1)));
  t_.equal(false, toBool(SIMD.int32x4.extractLane(o, 2)));
  t_.equal(false, toBool(SIMD.int32x4.extractLane(o, 3)));
 t_.end();
});

test('int32x4 or', function(t_) {
  var m = SIMD.int32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA);
  var n = SIMD.int32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
  var o = SIMD.int32x4.or(m,n);  // or
  t_.equal(-1, SIMD.int32x4.extractLane(o, 0));
  t_.equal(-1, SIMD.int32x4.extractLane(o, 1));
  t_.equal(-1, SIMD.int32x4.extractLane(o, 2));
  t_.equal(-1, SIMD.int32x4.extractLane(o, 3));
  t_.equal(true, toBool(SIMD.int32x4.extractLane(o, 0)));
  t_.equal(true, toBool(SIMD.int32x4.extractLane(o, 1)));
  t_.equal(true, toBool(SIMD.int32x4.extractLane(o, 2)));
  t_.equal(true, toBool(SIMD.int32x4.extractLane(o, 3)));
 t_.end();
});

test('int32x4 xor', function(t_) {
  var m = SIMD.int32x4(0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA, 0xAAAAAAAA);
  var n = SIMD.int32x4(0x55555555, 0x55555555, 0x55555555, 0x55555555);
  n = SIMD.int32x4.replaceLane(n, 0, 0xAAAAAAAA);
  n = SIMD.int32x4.replaceLane(n, 1, 0xAAAAAAAA);
  n = SIMD.int32x4.replaceLane(n, 2, 0xAAAAAAAA);
  n = SIMD.int32x4.replaceLane(n, 3, 0xAAAAAAAA);
  t_.equal(-1431655766, SIMD.int32x4.extractLane(n, 0));
  t_.equal(-1431655766, SIMD.int32x4.extractLane(n, 1));
  t_.equal(-1431655766, SIMD.int32x4.extractLane(n, 2));
  t_.equal(-1431655766, SIMD.int32x4.extractLane(n, 3));
  var o = SIMD.int32x4.xor(m,n);  // xor
  t_.equal(0x0, SIMD.int32x4.extractLane(o, 0));
  t_.equal(0x0, SIMD.int32x4.extractLane(o, 1));
  t_.equal(0x0, SIMD.int32x4.extractLane(o, 2));
  t_.equal(0x0, SIMD.int32x4.extractLane(o, 3));
  t_.equal(false, toBool(SIMD.int32x4.extractLane(o, 0)));
  t_.equal(false, toBool(SIMD.int32x4.extractLane(o, 1)));
  t_.equal(false, toBool(SIMD.int32x4.extractLane(o, 2)));
  t_.equal(false, toBool(SIMD.int32x4.extractLane(o, 3)));
 t_.end();
});

test('int32x4 neg', function(t_) {
  var m = SIMD.int32x4(16, -32, 64, -128);
  m = SIMD.int32x4.neg(m);
  t_.equal(-16, SIMD.int32x4.extractLane(m, 0));
  t_.equal(32, SIMD.int32x4.extractLane(m, 1));
  t_.equal(-64, SIMD.int32x4.extractLane(m, 2));
  t_.equal(128, SIMD.int32x4.extractLane(m, 3));

  var n = SIMD.int32x4(0, 0x7fffffff, -1, 0x80000000);
  n = SIMD.int32x4.neg(n);
  t_.equal(0, SIMD.int32x4.extractLane(n, 0));
  t_.equal(-2147483647, SIMD.int32x4.extractLane(n, 1));
  t_.equal(1, SIMD.int32x4.extractLane(n, 2));
  t_.equal(-2147483648, SIMD.int32x4.extractLane(n, 3));
 t_.end();
});

test('int32x4 allTrue', function (t_) {
  var v0000 = SIMD.int32x4(0x00000000, 0x7FFFFFFF, 0x00000001, 0x5A5A5A5A);
  var v0001 = SIMD.int32x4(0x00000000, 0x7FFFFFFF, 0x00000001, 0xA5A5A5A5);
  var v0010 = SIMD.int32x4(0x00000000, 0x7FFFFFFF, 0x80000001, 0x5A5A5A5A);
  var v0100 = SIMD.int32x4(0x00000000, 0xFFFFFFFF, 0x00000001, 0x5A5A5A5A);
  var v1000 = SIMD.int32x4(0x80000000, 0x7FFFFFFF, 0x00000001, 0x5A5A5A5A);
  var v0011 = SIMD.int32x4(0x00000000, 0x7FFFFFFF, 0x80000001, 0xA5A5A5A5);
  var v0111 = SIMD.int32x4(0x00000000, 0xFFFFFFFF, 0x80000001, 0xA5A5A5A5);
  var v1111 = SIMD.int32x4(0x80000000, 0xFFFFFFFF, 0x80000001, 0xA5A5A5A5);
  t_.equal(SIMD.int32x4.allTrue(v0000), false);
  t_.equal(SIMD.int32x4.allTrue(v0001), false);
  t_.equal(SIMD.int32x4.allTrue(v0010), false);
  t_.equal(SIMD.int32x4.allTrue(v0100), false);
  t_.equal(SIMD.int32x4.allTrue(v1000), false);
  t_.equal(SIMD.int32x4.allTrue(v0011), false);
  t_.equal(SIMD.int32x4.allTrue(v0111), false);
  t_.equal(SIMD.int32x4.allTrue(v1111), true);
 t_.end();
});

test('int32x4 anyTrue', function (t_) {
  var v0000 = SIMD.int32x4(0x00000000, 0x7FFFFFFF, 0x00000001, 0x5A5A5A5A);
  var v0001 = SIMD.int32x4(0x00000000, 0x7FFFFFFF, 0x00000001, 0xA5A5A5A5);
  var v0010 = SIMD.int32x4(0x00000000, 0x7FFFFFFF, 0x80000001, 0x5A5A5A5A);
  var v0100 = SIMD.int32x4(0x00000000, 0xFFFFFFFF, 0x00000001, 0x5A5A5A5A);
  var v1000 = SIMD.int32x4(0x80000000, 0x7FFFFFFF, 0x00000001, 0x5A5A5A5A);
  var v0011 = SIMD.int32x4(0x00000000, 0x7FFFFFFF, 0x80000001, 0xA5A5A5A5);
  var v0111 = SIMD.int32x4(0x00000000, 0xFFFFFFFF, 0x80000001, 0xA5A5A5A5);
  var v1111 = SIMD.int32x4(0x80000000, 0xFFFFFFFF, 0x80000001, 0xA5A5A5A5);
  t_.equal(SIMD.int32x4.anyTrue(v0000), false);
  t_.equal(SIMD.int32x4.anyTrue(v0001), true);
  t_.equal(SIMD.int32x4.anyTrue(v0010), true);
  t_.equal(SIMD.int32x4.anyTrue(v0100), true);
  t_.equal(SIMD.int32x4.anyTrue(v1000), true);
  t_.equal(SIMD.int32x4.anyTrue(v0011), true);
  t_.equal(SIMD.int32x4.anyTrue(v0111), true);
  t_.equal(SIMD.int32x4.anyTrue(v1111), true);
 t_.end();
});

test('int32x4 vector getters', function (t_) {
  var a = SIMD.int32x4(4, 3, 2, 1);
  var xxxx = SIMD.int32x4.swizzle(a, 0, 0, 0, 0);
  var yyyy = SIMD.int32x4.swizzle(a, 1, 1, 1, 1);
  var zzzz = SIMD.int32x4.swizzle(a, 2, 2, 2, 2);
  var wwww = SIMD.int32x4.swizzle(a, 3, 3, 3, 3);
  var wzyx = SIMD.int32x4.swizzle(a, 3, 2, 1, 0);
  t_.equal(4, SIMD.int32x4.extractLane(xxxx, 0));
  t_.equal(4, SIMD.int32x4.extractLane(xxxx, 1));
  t_.equal(4, SIMD.int32x4.extractLane(xxxx, 2));
  t_.equal(4, SIMD.int32x4.extractLane(xxxx, 3));
  t_.equal(3, SIMD.int32x4.extractLane(yyyy, 0));
  t_.equal(3, SIMD.int32x4.extractLane(yyyy, 1));
  t_.equal(3, SIMD.int32x4.extractLane(yyyy, 2));
  t_.equal(3, SIMD.int32x4.extractLane(yyyy, 3));
  t_.equal(2, SIMD.int32x4.extractLane(zzzz, 0));
  t_.equal(2, SIMD.int32x4.extractLane(zzzz, 1));
  t_.equal(2, SIMD.int32x4.extractLane(zzzz, 2));
  t_.equal(2, SIMD.int32x4.extractLane(zzzz, 3));
  t_.equal(1, SIMD.int32x4.extractLane(wwww, 0));
  t_.equal(1, SIMD.int32x4.extractLane(wwww, 1));
  t_.equal(1, SIMD.int32x4.extractLane(wwww, 2));
  t_.equal(1, SIMD.int32x4.extractLane(wwww, 3));
  t_.equal(1, SIMD.int32x4.extractLane(wzyx, 0));
  t_.equal(2, SIMD.int32x4.extractLane(wzyx, 1));
  t_.equal(3, SIMD.int32x4.extractLane(wzyx, 2));
  t_.equal(4, SIMD.int32x4.extractLane(wzyx, 3));
 t_.end();
});

test('int32x4 add', function(t_) {
  var a = SIMD.int32x4(0xFFFFFFFF, 0xFFFFFFFF, 0x7fffffff, 0x0);
  var b = SIMD.int32x4(0x1, 0xFFFFFFFF, 0x1, 0xFFFFFFFF);
  var c = SIMD.int32x4.add(a, b);
  t_.equal(0x0, SIMD.int32x4.extractLane(c, 0));
  t_.equal(-2, SIMD.int32x4.extractLane(c, 1));
  t_.equal(-0x80000000, SIMD.int32x4.extractLane(c, 2));
  t_.equal(-1, SIMD.int32x4.extractLane(c, 3));
 t_.end();
});

test('int32x4 sub', function(t_) {
  var a = SIMD.int32x4(0xFFFFFFFF, 0xFFFFFFFF, 0x80000000, 0x0);
  var b = SIMD.int32x4(0x1, 0xFFFFFFFF, 0x1, 0xFFFFFFFF);
  var c = SIMD.int32x4.sub(a, b);
  t_.equal(-2, SIMD.int32x4.extractLane(c, 0));
  t_.equal(0x0, SIMD.int32x4.extractLane(c, 1));
  t_.equal(0x7FFFFFFF, SIMD.int32x4.extractLane(c, 2));
  t_.equal(0x1, SIMD.int32x4.extractLane(c, 3));
 t_.end();
});

test('int32x4 mul', function(t_) {
  var a = SIMD.int32x4(0xFFFFFFFF, 0xFFFFFFFF, 0x80000000, 0x0);
  var b = SIMD.int32x4(0x1, 0xFFFFFFFF, 0x80000000, 0xFFFFFFFF);
  var c = SIMD.int32x4.mul(a, b);
  t_.equal(-1, SIMD.int32x4.extractLane(c, 0));
  t_.equal(0x1, SIMD.int32x4.extractLane(c, 1));
  t_.equal(0x0, SIMD.int32x4.extractLane(c, 2));
  t_.equal(0x0, SIMD.int32x4.extractLane(c, 3));
 t_.end();
});

test('int32x4 comparisons', function(t_) {
  var m = SIMD.int32x4(1000, 2000, 100, 1);
  var n = SIMD.int32x4(-2000, 2000, 1, 100);
  var cmp;
  cmp = SIMD.int32x4.lessThan(m, n);
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 3));

  cmp = SIMD.int32x4.lessThanOrEqual(m, n);
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 3));

  cmp = SIMD.int32x4.equal(m, n);
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 3));

  cmp = SIMD.int32x4.notEqual(m, n);
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 3));

  cmp = SIMD.int32x4.greaterThan(m, n);
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 3));

  cmp = SIMD.int32x4.greaterThanOrEqual(m, n);
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 0));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 1));
  t_.equal(-1, SIMD.int32x4.extractLane(cmp, 2));
  t_.equal(0x0, SIMD.int32x4.extractLane(cmp, 3));
 t_.end();
});

test('int32x4 shiftLeftByScalar', function(t_) {
  var a = SIMD.int32x4(0xffffffff, 0x7fffffff, 0x1, 0x0);
  var b;

  b = SIMD.int32x4.shiftLeftByScalar(a, 1);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0xfffffffe|0);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0xfffffffe|0);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x00000002);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.int32x4.shiftLeftByScalar(a, 2);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0xfffffffc|0);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0xfffffffc|0);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x00000004);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.int32x4.shiftLeftByScalar(a, 30);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0xc0000000|0);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0xc0000000|0);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x40000000);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.int32x4.shiftLeftByScalar(a, 31);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0x80000000|0);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0x80000000|0);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x80000000|0);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x0);
  b = SIMD.int32x4.shiftLeftByScalar(a, 32);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0x0);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0x0);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x0);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x0);
  b = SIMD.int32x4.shiftLeftByScalar(a, -1);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0x0);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0x0);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x0);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x0);
 t_.end();
});

test('int32x4 shiftRightArithmeticByScalar', function(t_) {
  var a = SIMD.int32x4(0xffffffff, 0x7fffffff, 0x1, 0x0);
  var b;

  b = SIMD.int32x4.shiftRightArithmeticByScalar(a, 1);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0xffffffff|0);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0x3fffffff);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.int32x4.shiftRightArithmeticByScalar(a, 2);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0xffffffff|0);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0x1fffffff);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.int32x4.shiftRightArithmeticByScalar(a, 30);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0xffffffff|0);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0x00000001);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.int32x4.shiftRightArithmeticByScalar(a, 31);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0xffffffff|0);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.int32x4.shiftRightArithmeticByScalar(a, 32);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0xffffffff|0);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.int32x4.shiftRightArithmeticByScalar(a, -1);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0xffffffff|0);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x00000000);
 t_.end();
});

test('int32x4 shiftRightLogicalByScalar', function(t_) {
  var a = SIMD.int32x4(0xffffffff, 0x7fffffff, 0x1, 0x0);
  var b;

  b = SIMD.int32x4.shiftRightLogicalByScalar(a, 1);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0x7fffffff);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0x3fffffff);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.int32x4.shiftRightLogicalByScalar(a, 2);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0x3fffffff);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0x1fffffff);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.int32x4.shiftRightLogicalByScalar(a, 30);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0x00000003);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0x00000001);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.int32x4.shiftRightLogicalByScalar(a, 31);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0x00000001);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.int32x4.shiftRightLogicalByScalar(a, 32);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x00000000);
  b = SIMD.int32x4.shiftRightLogicalByScalar(a, -1);
  t_.equal(SIMD.int32x4.extractLane(b, 0), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 1), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 2), 0x00000000);
  t_.equal(SIMD.int32x4.extractLane(b, 3), 0x00000000);
 t_.end();
});

test('int32x4 select', function(t_) {
  var m = SIMD.int32x4(0xaaaaaaaa, 0xaaaaaaaa, 0x55555555, 0x55555555);
  var t = SIMD.int32x4(1, 2, 3, 4);
  var f = SIMD.int32x4(5, 6, 7, 8);
  var s = SIMD.int32x4.select(m, t, f);
  t_.equal(1, SIMD.int32x4.extractLane(s, 0));
  t_.equal(2, SIMD.int32x4.extractLane(s, 1));
  t_.equal(7, SIMD.int32x4.extractLane(s, 2));
  t_.equal(8, SIMD.int32x4.extractLane(s, 3));
 t_.end();
});

test('int32x4 selectBits', function(t_) {
  var m = SIMD.int32x4(0xaaaaaaaa, 0xaaaaaaaa, 0x55555555, 0x55555555);
  var t = SIMD.int32x4(1, 2, 3, 4);
  var f = SIMD.int32x4(5, 6, 7, 8);
  var s = SIMD.int32x4.selectBits(m, t, f);
  t_.equal(5, SIMD.int32x4.extractLane(s, 0));
  t_.equal(6, SIMD.int32x4.extractLane(s, 1));
  t_.equal(3, SIMD.int32x4.extractLane(s, 2));
  t_.equal(12, SIMD.int32x4.extractLane(s, 3));
 t_.end();
});

test('int32x4 load', function(t_) {
  var a = new Int32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 3; i++) {
    var v = SIMD.int32x4.load(a, i);
    t_.equal(i, SIMD.int32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.int32x4.extractLane(v, 1));
    t_.equal(i+2, SIMD.int32x4.extractLane(v, 2));
    t_.equal(i+3, SIMD.int32x4.extractLane(v, 3));
  }
 t_.end();
});

test('int32x4 overaligned load', function(t_) {
  var b = new ArrayBuffer(40);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 3; i += 2) {
    var v = SIMD.int32x4.load(af, i / 2);
    t_.equal(i, SIMD.int32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.int32x4.extractLane(v, 1));
    t_.equal(i+2, SIMD.int32x4.extractLane(v, 2));
    t_.equal(i+3, SIMD.int32x4.extractLane(v, 3));
  }
 t_.end();
});

test('int32x4 unaligned load', function(t_) {
  var a = new Int32Array(8);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length - 3; i++) {
    var v = SIMD.int32x4.load(b, i * 4 + 1);
    t_.equal(i, SIMD.int32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.int32x4.extractLane(v, 1));
    t_.equal(i+2, SIMD.int32x4.extractLane(v, 2));
    t_.equal(i+3, SIMD.int32x4.extractLane(v, 3));
  }
 t_.end();
});

test('int32x4 load1', function(t_) {
  var a = new Int32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length ; i++) {
    var v = SIMD.int32x4.load1(a, i);
    t_.equal(i, SIMD.int32x4.extractLane(v, 0));
    t_.equal(0, SIMD.int32x4.extractLane(v, 1));
    t_.equal(0, SIMD.int32x4.extractLane(v, 2));
    t_.equal(0, SIMD.int32x4.extractLane(v, 3));
  }
 t_.end();
});

test('int32x4 overaligned load1', function(t_) {
  var b = new ArrayBuffer(40);
  var a = new Int32Array(b, 8);
  var af = new Int32Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length; i++) {
    var v = SIMD.int32x4.load1(af, i);
    t_.equal(i, SIMD.int32x4.extractLane(v, 0));
    t_.equal(0, SIMD.int32x4.extractLane(v, 1));
    t_.equal(0, SIMD.int32x4.extractLane(v, 2));
    t_.equal(0, SIMD.int32x4.extractLane(v, 3));
  }
 t_.end();
});

test('int32x4 unaligned load1', function(t_) {
  var a = new Int32Array(8);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length ; i++) {
    var v = SIMD.int32x4.load1(b, i * 4 + 1);
    t_.equal(i, SIMD.int32x4.extractLane(v, 0));
    t_.equal(0, SIMD.int32x4.extractLane(v, 1));
    t_.equal(0, SIMD.int32x4.extractLane(v, 2));
    t_.equal(0, SIMD.int32x4.extractLane(v, 3));
  }
 t_.end();
});

test('int32x4 load2', function(t_) {
  var a = new Int32Array(8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.int32x4.load2(a, i);
    t_.equal(i, SIMD.int32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.int32x4.extractLane(v, 1));
    t_.equal(0, SIMD.int32x4.extractLane(v, 2));
    t_.equal(0, SIMD.int32x4.extractLane(v, 3));
  }
 t_.end();
});

test('int32x4 overaligned load2', function(t_) {
  var b = new ArrayBuffer(40);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 1; i += 2) {
    var v = SIMD.int32x4.load2(af, i / 2);
    t_.equal(i, SIMD.int32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.int32x4.extractLane(v, 1));
    t_.equal(0, SIMD.int32x4.extractLane(v, 2));
    t_.equal(0, SIMD.int32x4.extractLane(v, 3));
  }
 t_.end();
});

test('int32x4 unaligned load2', function(t_) {
  var a = new Int32Array(8);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length - 1; i++) {
    var v = SIMD.int32x4.load2(b, i * 4 + 1);
    t_.equal(i, SIMD.int32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.int32x4.extractLane(v, 1));
    t_.equal(0, SIMD.int32x4.extractLane(v, 2));
    t_.equal(0, SIMD.int32x4.extractLane(v, 3));
  }
 t_.end();
});

test('int32x4 load3', function(t_) {
  var a = new Int32Array(9);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 2; i++) {
    var v = SIMD.int32x4.load3(a, i);
    t_.equal(i, SIMD.int32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.int32x4.extractLane(v, 1));
    t_.equal(i+2, SIMD.int32x4.extractLane(v, 2));
    t_.equal(0, SIMD.int32x4.extractLane(v, 3));
  }
 t_.end();
});

test('int32x4 overaligned load3', function(t_) {
  var b = new ArrayBuffer(48);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }
  for (var i = 0; i < a.length - 2; i += 2) {
    var v = SIMD.int32x4.load3(af, i / 2);
    t_.equal(i, SIMD.int32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.int32x4.extractLane(v, 1));
    t_.equal(i+2, SIMD.int32x4.extractLane(v, 2));
    t_.equal(0, SIMD.int32x4.extractLane(v, 3));
  }
 t_.end();
});

test('int32x4 load3', function(t_) {
  var a = new Int32Array(9);
  var ai = new Int8Array(a.buffer);
  for (var i = 0; i < a.length; i++) {
    a[i] = i;
  }

  // Copy the bytes, offset by 1.
  var b = new Int8Array(ai.length + 1);
  for (var i = 0; i < ai.length; i++) {
    b[i + 1] = ai[i];
  }

  // Load the values unaligned.
  for (var i = 0; i < a.length - 2; i++) {
    var v = SIMD.int32x4.load3(b, i * 4 + 1);
    t_.equal(i, SIMD.int32x4.extractLane(v, 0));
    t_.equal(i+1, SIMD.int32x4.extractLane(v, 1));
    t_.equal(i+2, SIMD.int32x4.extractLane(v, 2));
    t_.equal(0, SIMD.int32x4.extractLane(v, 3));
  }
 t_.end();
});

test('int32x4 store', function(t_) {
  var a = new Int32Array(12);
  SIMD.int32x4.store(a, 0, SIMD.int32x4(0, 1, 2, 3));
  SIMD.int32x4.store(a, 4, SIMD.int32x4(4, 5, 6, 7));
  SIMD.int32x4.store(a, 8, SIMD.int32x4(8, 9, 10, 11));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('int32x4 overaligned store', function(t_) {
  var b = new ArrayBuffer(56);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  SIMD.int32x4.store(af, 0, SIMD.int32x4(0, 1, 2, 3));
  SIMD.int32x4.store(af, 2, SIMD.int32x4(4, 5, 6, 7));
  SIMD.int32x4.store(af, 4, SIMD.int32x4(8, 9, 10, 11));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('int32x4 unaligned store', function(t_) {
  var c = new Int8Array(48 + 1);
  SIMD.int32x4.store(c, 0 + 1, SIMD.int32x4(0, 1, 2, 3));
  SIMD.int32x4.store(c, 16 + 1, SIMD.int32x4(4, 5, 6, 7));
  SIMD.int32x4.store(c, 32 + 1, SIMD.int32x4(8, 9, 10, 11));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Int32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('int32x4 store1', function(t_) {
  var a = new Int32Array(4);
  SIMD.int32x4.store1(a, 0, SIMD.int32x4(0, -1, -1, -1));
  SIMD.int32x4.store1(a, 1, SIMD.int32x4(1, -1, -1, -1));
  SIMD.int32x4.store1(a, 2, SIMD.int32x4(2, -1, -1, -1));
  SIMD.int32x4.store1(a, 3, SIMD.int32x4(3, -1, -1, -1));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('int32x4 overaligned store1', function(t_) {
  var b = new ArrayBuffer(24);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  a[1] = -2;
  a[3] = -2;
  SIMD.int32x4.store1(af, 0, SIMD.int32x4(0, -1, -1, -1));
  SIMD.int32x4.store1(af, 1, SIMD.int32x4(2, -1, -1, -1));
  for (var i = 0; i < a.length; i++) {
    if (i % 2 == 0) {
      t_.equal(i, a[i]);
    } else {
      t_.equal(-2, a[i]);
    }
  }
 t_.end();
});

test('int32x4 unaligned store1', function(t_) {
  var c = new Int8Array(16 + 1);
  SIMD.int32x4.store1(c, 0 + 1, SIMD.int32x4(0, -1, -1, -1));
  SIMD.int32x4.store1(c, 4 + 1, SIMD.int32x4(1, -1, -1, -1));
  SIMD.int32x4.store1(c, 8 + 1, SIMD.int32x4(2, -1, -1, -1));
  SIMD.int32x4.store1(c, 12 + 1, SIMD.int32x4(3, -1, -1, -1));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Int32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('int32x4 store2', function(t_) {
  var a = new Int32Array(8);
  SIMD.int32x4.store2(a, 0, SIMD.int32x4(0, 1, -1, -1));
  SIMD.int32x4.store2(a, 2, SIMD.int32x4(2, 3, -1, -1));
  SIMD.int32x4.store2(a, 4, SIMD.int32x4(4, 5, -1, -1));
  SIMD.int32x4.store2(a, 6, SIMD.int32x4(6, 7, -1, -1));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('int32x4 store2', function(t_) {
  var a = new Int32Array(8);
  var af = new Float64Array(a.buffer);
  SIMD.int32x4.store2(af, 0, SIMD.int32x4(0, 1, -1, -1));
  SIMD.int32x4.store2(af, 1, SIMD.int32x4(2, 3, -1, -1));
  SIMD.int32x4.store2(af, 2, SIMD.int32x4(4, 5, -1, -1));
  SIMD.int32x4.store2(af, 3, SIMD.int32x4(6, 7, -1, -1));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('int32x4 unaligned store2', function(t_) {
  var c = new Int8Array(32 + 1);
  SIMD.int32x4.store2(c, 0 + 1, SIMD.int32x4(0, 1, -1, -1));
  SIMD.int32x4.store2(c, 8 + 1, SIMD.int32x4(2, 3, -1, -1));
  SIMD.int32x4.store2(c, 16 + 1, SIMD.int32x4(4, 5, -1, -1));
  SIMD.int32x4.store2(c, 24 + 1, SIMD.int32x4(6, 7, -1, -1));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Int32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('int32x4 store3', function(t_) {
  var a = new Int32Array(9);
  SIMD.int32x4.store3(a, 0, SIMD.int32x4(0, 1, 2, -1));
  SIMD.int32x4.store3(a, 3, SIMD.int32x4(3, 4, 5, -1));
  SIMD.int32x4.store3(a, 6, SIMD.int32x4(6, 7, 8, -1));
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('int32x4 overaligned store3', function(t_) {
  var b = new ArrayBuffer(56);
  var a = new Int32Array(b, 8);
  var af = new Float64Array(b, 8);
  a[3] = -2;
  a[7] = -2;
  a[11] = -2;
  SIMD.int32x4.store3(af, 0, SIMD.int32x4(0, 1, 2, -1));
  SIMD.int32x4.store3(af, 2, SIMD.int32x4(4, 5, 6, -1));
  SIMD.int32x4.store3(af, 4, SIMD.int32x4(8, 9, 10, -1));
  for (var i = 0; i < a.length; i++) {
    if (i % 4 != 3) {
      t_.equal(i, a[i]);
    } else {
      t_.equal(-2, a[i]);
    }
  }
 t_.end();
});

test('int32x4 unaligned store3', function(t_) {
  var c = new Int8Array(36 + 1);
  SIMD.int32x4.store3(c, 0 + 1, SIMD.int32x4(0, 1, 2, -1));
  SIMD.int32x4.store3(c, 12 + 1, SIMD.int32x4(3, 4, 5, -1));
  SIMD.int32x4.store3(c, 24 + 1, SIMD.int32x4(6, 7, 8, -1));

  // Copy the bytes, offset by 1.
  var b = new Int8Array(c.length - 1);
  for (var i = 1; i < c.length; i++) {
      b[i - 1] = c[i];
  }

  var a = new Int32Array(b.buffer);
  for (var i = 0; i < a.length; i++) {
    t_.equal(i, a[i]);
  }
 t_.end();
});

test('int32x4 load exceptions', function (t_) {
  var a = new Int32Array(8);
  t_['throws'](function () {
    var f = SIMD.int32x4.load(a, -1);
  });
  t_['throws'](function () {
    var f = SIMD.int32x4.load(a, 5);
  });
  t_['throws'](function () {
    var f = SIMD.int32x4.load(a.buffer, 1);
  });
  t_['throws'](function () {
    var f = SIMD.int32x4.load(a, "a");
  });
 t_.end();
});

test('int32x4 load1 exceptions', function (t_) {
  var a = new Int32Array(8);
  t_['throws'](function () {
    var f = SIMD.int32x4.load1(a, -1);
  });
  t_['throws'](function () {
    var f = SIMD.int32x4.load1(a, 8);
  });
  t_['throws'](function () {
    var f = SIMD.int32x4.load1(a.buffer, 1);
  });
  t_['throws'](function () {
    var f = SIMD.int32x4.load1(a, "a");
  });
 t_.end();
});

test('int32x4 load2 exceptions', function (t_) {
  var a = new Int32Array(8);
  t_['throws'](function () {
    var f = SIMD.int32x4.load2(a, -1);
  });
  t_['throws'](function () {
    var f = SIMD.int32x4.load2(a, 7);
  });
  t_['throws'](function () {
    var f = SIMD.int32x4.load2(a.buffer, 1);
  });
  t_['throws'](function () {
    var f = SIMD.int32x4.load2(a, "a");
  });
 t_.end();
});

test('int32x4 load3 exceptions', function (t_) {
  var a = new Int32Array(8);
  t_['throws'](function () {
    var f = SIMD.int32x4.load3(a, -1);
  });
  t_['throws'](function () {
    var f = SIMD.int32x4.load3(a, 6);
  });
  t_['throws'](function () {
    var f = SIMD.int32x4.load3(a.buffer, 1);
  });
  t_['throws'](function () {
    var f = SIMD.int32x4.load3(a, "a");
  });
 t_.end();
});

test('int32x4 store exceptions', function (t_) {
  var a = new Int32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  t_['throws'](function () {
    SIMD.int32x4.store(a, -1, i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store(a, 5, i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store(a.buffer, 1, i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store(a, "a", i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store(a, 1, f);
  });
 t_.end();
});

test('int32x4 store1 exceptions', function (t_) {
  var a = new Int32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  t_['throws'](function () {
    SIMD.int32x4.store1(a, -1, i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store1(a, 8, i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store1(a.buffer, 1, i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store1(a, "a", i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store1(a, 1, f);
  });
 t_.end();
});

test('int32x4 store2 exceptions', function (t_) {
  var a = new Int32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  t_['throws'](function () {
    SIMD.int32x4.store2(a, -1, i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store2(a, 7, i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store2(a.buffer, 1, i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store2(a, "a", i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store2(a, 1, f);
  });
 t_.end();
});

test('int32x4 store3 exceptions', function (t_) {
  var a = new Int32Array(8);
  var f = SIMD.float32x4(1, 2, 3, 4);
  var i = SIMD.int32x4(1, 2, 3, 4);
  t_['throws'](function () {
    SIMD.int32x4.store3(a, -1, i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store3(a, 6, i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store3(a.buffer, 1, i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store3(a, "a", i);
  });
  t_['throws'](function () {
    SIMD.int32x4.store3(a, 1, f);
  });
 t_.end();
});

test('int16x8 fromFloat32x4Bits constructor', function(t_) {
  var m = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var n = SIMD.int16x8.fromFloat32x4Bits(m);
  t_.equal(0x0000, SIMD.int16x8.extractLane(n, 0));
  t_.equal(0x3F80, SIMD.int16x8.extractLane(n, 1));
  t_.equal(0x0000, SIMD.int16x8.extractLane(n, 2));
  t_.equal(0x4000, SIMD.int16x8.extractLane(n, 3));
  t_.equal(0x0000, SIMD.int16x8.extractLane(n, 4));
  t_.equal(0x4040, SIMD.int16x8.extractLane(n, 5));  
  t_.equal(0x0000, SIMD.int16x8.extractLane(n, 6));
  t_.equal(0x4080, SIMD.int16x8.extractLane(n, 7));
 t_.end();
});

test('int16x8 swizzle', function(t_) {
  var a    = SIMD.int16x8(1, 2, 3, 2147483647, 5, 6, 7, -37);
  var xyxy = SIMD.int16x8.swizzle(a, 0, 1, 0, 1, 0, 1, 0, 1);
  var zwzw = SIMD.int16x8.swizzle(a, 4, 5, 4, 5, 4, 5, 4, 5);
  var xxxx = SIMD.int16x8.swizzle(a, 0, 0, 0, 0, 0, 0, 0, 0);
  t_.equal(1, SIMD.int16x8.extractLane(xyxy, 0));
  t_.equal(2, SIMD.int16x8.extractLane(xyxy, 1));
  t_.equal(1, SIMD.int16x8.extractLane(xyxy, 2));
  t_.equal(2, SIMD.int16x8.extractLane(xyxy, 3));
  t_.equal(1, SIMD.int16x8.extractLane(xyxy, 4));
  t_.equal(2, SIMD.int16x8.extractLane(xyxy, 5));
  t_.equal(1, SIMD.int16x8.extractLane(xyxy, 6));
  t_.equal(2, SIMD.int16x8.extractLane(xyxy, 7));
  t_.equal(5, SIMD.int16x8.extractLane(zwzw, 0));
  t_.equal(6, SIMD.int16x8.extractLane(zwzw, 1));
  t_.equal(5, SIMD.int16x8.extractLane(zwzw, 2));
  t_.equal(6, SIMD.int16x8.extractLane(zwzw, 3));
  t_.equal(5, SIMD.int16x8.extractLane(zwzw, 4));
  t_.equal(6, SIMD.int16x8.extractLane(zwzw, 5));
  t_.equal(5, SIMD.int16x8.extractLane(zwzw, 6));
  t_.equal(6, SIMD.int16x8.extractLane(zwzw, 7));
  t_.equal(1, SIMD.int16x8.extractLane(xxxx, 0));
  t_.equal(1, SIMD.int16x8.extractLane(xxxx, 1));
  t_.equal(1, SIMD.int16x8.extractLane(xxxx, 2));
  t_.equal(1, SIMD.int16x8.extractLane(xxxx, 3));
  t_.equal(1, SIMD.int16x8.extractLane(xxxx, 4));
  t_.equal(1, SIMD.int16x8.extractLane(xxxx, 5));
  t_.equal(1, SIMD.int16x8.extractLane(xxxx, 6));
  t_.equal(1, SIMD.int16x8.extractLane(xxxx, 7));

  function testIndexCheck(index) {
      t_['throws'](function() { SIMD.int16x8.swizzle(a, index, 0, 0, 0, 0, 0, 0, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(8);
 t_.end();
});

test('int16x8 shuffle', function(t_) {
  var a    = SIMD.int16x8(1, 2, 3, 4, 5, 6, 7, 8);
  var b    = SIMD.int16x8(9, 10, 11, 12, 13, 14, 15, 32767);
  var xyxy = SIMD.int16x8.shuffle(a, b, 0, 1, 2, 3, 8, 9, 10, 11);
  var zwzw = SIMD.int16x8.shuffle(a, b, 4, 5, 6, 7, 12, 13, 14, 15);
  var xxxx = SIMD.int16x8.shuffle(a, b, 0, 0, 0, 0, 8, 8, 8, 8);
  t_.equal(1, SIMD.int16x8.extractLane(xyxy, 0));
  t_.equal(2, SIMD.int16x8.extractLane(xyxy, 1));
  t_.equal(3, SIMD.int16x8.extractLane(xyxy, 2));
  t_.equal(4, SIMD.int16x8.extractLane(xyxy, 3));
  t_.equal(9, SIMD.int16x8.extractLane(xyxy, 4));
  t_.equal(10, SIMD.int16x8.extractLane(xyxy, 5));
  t_.equal(11, SIMD.int16x8.extractLane(xyxy, 6));
  t_.equal(12, SIMD.int16x8.extractLane(xyxy, 7));
  t_.equal(5, SIMD.int16x8.extractLane(zwzw, 0));
  t_.equal(6, SIMD.int16x8.extractLane(zwzw, 1));
  t_.equal(7, SIMD.int16x8.extractLane(zwzw, 2));
  t_.equal(8, SIMD.int16x8.extractLane(zwzw, 3));
  t_.equal(13, SIMD.int16x8.extractLane(zwzw, 4));
  t_.equal(14, SIMD.int16x8.extractLane(zwzw, 5));
  t_.equal(15, SIMD.int16x8.extractLane(zwzw, 6));
  t_.equal(32767, SIMD.int16x8.extractLane(zwzw, 7));
  t_.equal(1, SIMD.int16x8.extractLane(xxxx, 0));
  t_.equal(1, SIMD.int16x8.extractLane(xxxx, 1));
  t_.equal(1, SIMD.int16x8.extractLane(xxxx, 2));
  t_.equal(1, SIMD.int16x8.extractLane(xxxx, 3));
  t_.equal(9, SIMD.int16x8.extractLane(xxxx, 4));
  t_.equal(9, SIMD.int16x8.extractLane(xxxx, 5));
  t_.equal(9, SIMD.int16x8.extractLane(xxxx, 6));
  t_.equal(9, SIMD.int16x8.extractLane(xxxx, 7));

  function testIndexCheck(index) {
      t_['throws'](function() { SIMD.int16x8.shuffle(a, b, index, 0, 0, 0, 0, 0, 0, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(16);
 t_.end();
});

test('int16x8 and', function(t_) {
  var m = SIMD.int16x8(0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 43690, 43690, 0xAAAA, 0xAAAA);
  var n = SIMD.int16x8(0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555);
  t_.equal(-21846, SIMD.int16x8.extractLane(m, 0));
  t_.equal(-21846, SIMD.int16x8.extractLane(m, 1));
  t_.equal(-21846, SIMD.int16x8.extractLane(m, 2));
  t_.equal(-21846, SIMD.int16x8.extractLane(m, 3));
  t_.equal(-21846, SIMD.int16x8.extractLane(m, 4));
  t_.equal(-21846, SIMD.int16x8.extractLane(m, 5));
  t_.equal(-21846, SIMD.int16x8.extractLane(m, 6));
  t_.equal(-21846, SIMD.int16x8.extractLane(m, 7));
  t_.equal(0x5555, SIMD.int16x8.extractLane(n, 0));
  t_.equal(0x5555, SIMD.int16x8.extractLane(n, 1));
  t_.equal(0x5555, SIMD.int16x8.extractLane(n, 2));
  t_.equal(0x5555, SIMD.int16x8.extractLane(n, 3));
  t_.equal(0x5555, SIMD.int16x8.extractLane(n, 4));
  t_.equal(0x5555, SIMD.int16x8.extractLane(n, 5));
  t_.equal(0x5555, SIMD.int16x8.extractLane(n, 6));
  t_.equal(0x5555, SIMD.int16x8.extractLane(n, 7));
  var o = SIMD.int16x8.and(m,n);  // and
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 0));
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 1));
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 2));
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 3));
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 4));
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 5));
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 6));
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 7));
 t_.end();
});

test('int16x8 or', function(t_) {
  var m = SIMD.int16x8(0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA);
  var n = SIMD.int16x8(0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555);
  var o = SIMD.int16x8.or(m,n);  // or
  t_.equal(-1, SIMD.int16x8.extractLane(o, 0));
  t_.equal(-1, SIMD.int16x8.extractLane(o, 1));
  t_.equal(-1, SIMD.int16x8.extractLane(o, 2));
  t_.equal(-1, SIMD.int16x8.extractLane(o, 3));
  t_.equal(-1, SIMD.int16x8.extractLane(o, 4));
  t_.equal(-1, SIMD.int16x8.extractLane(o, 5));
  t_.equal(-1, SIMD.int16x8.extractLane(o, 6));
  t_.equal(-1, SIMD.int16x8.extractLane(o, 7));
 t_.end();
});

test('int16x8 xor', function(t_) {
  var m = SIMD.int16x8(0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA, 0xAAAA);
  var n = SIMD.int16x8(0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555, 0x5555);
  var o = SIMD.int16x8.xor(m,n);  // xor
  t_.equal(-1, SIMD.int16x8.extractLane(o, 0));
  t_.equal(-1, SIMD.int16x8.extractLane(o, 1));
  t_.equal(-1, SIMD.int16x8.extractLane(o, 2));
  t_.equal(-1, SIMD.int16x8.extractLane(o, 3));
  t_.equal(-1, SIMD.int16x8.extractLane(o, 4));
  t_.equal(-1, SIMD.int16x8.extractLane(o, 5));
  t_.equal(-1, SIMD.int16x8.extractLane(o, 6));
  t_.equal(-1, SIMD.int16x8.extractLane(o, 7));
  o = SIMD.int16x8.xor(m,m);  // xor
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 0));
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 1));
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 2));
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 3));
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 4));
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 5));
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 6));
  t_.equal(0x0, SIMD.int16x8.extractLane(o, 7));
 t_.end();
});

test('int16x8 neg', function(t_) {
  var m = SIMD.int16x8(16, -32, 64, -128, 256, -512, 1024, -2048);
  m = SIMD.int16x8.neg(m);
  t_.equal(-16, SIMD.int16x8.extractLane(m, 0));
  t_.equal(32, SIMD.int16x8.extractLane(m, 1));
  t_.equal(-64, SIMD.int16x8.extractLane(m, 2));
  t_.equal(128, SIMD.int16x8.extractLane(m, 3));
  t_.equal(-256, SIMD.int16x8.extractLane(m, 4));
  t_.equal(512, SIMD.int16x8.extractLane(m, 5));
  t_.equal(-1024, SIMD.int16x8.extractLane(m, 6));
  t_.equal(2048, SIMD.int16x8.extractLane(m, 7));

  var n = SIMD.int16x8(0, 0, 0x7fff, 0xffff, -1, -1, 0x8000, 0x0000);
  n = SIMD.int16x8.neg(n);
  t_.equal(0, SIMD.int16x8.extractLane(n, 0));
  t_.equal(0, SIMD.int16x8.extractLane(n, 1));
  t_.equal(-32767, SIMD.int16x8.extractLane(n, 2));
  t_.equal(1, SIMD.int16x8.extractLane(n, 3));
  t_.equal(1, SIMD.int16x8.extractLane(n, 4));
  t_.equal(1, SIMD.int16x8.extractLane(n, 5));
  t_.equal(-32768, SIMD.int16x8.extractLane(n, 6));
  t_.equal(0, SIMD.int16x8.extractLane(n, 7));
 t_.end();
});

test('int16x8 allTrue', function (t_) {
  var v0000 = SIMD.int16x8(0x0000, 0x0000, 0x7FFF, 0x7FFF, 0x0001, 0x0001, 0x5A5A, 0x5A5A);
  var v0001 = SIMD.int16x8(0x0000, 0x0000, 0x7FFF, 0x7FFF, 0x0001, 0x0001, 0xA5A5, 0xA5A5);
  var v0010 = SIMD.int16x8(0x0000, 0x0000, 0x7FFF, 0x7FFF, 0x8000, 0x8001, 0x5A5A, 0x5A5A);
  var v0100 = SIMD.int16x8(0x0000, 0x0000, 0xFFFF, 0xFFFF, 0x0001, 0x0001, 0x5A5A, 0x5A5A);
  var v1000 = SIMD.int16x8(0x8000, 0x0000, 0x7FFF, 0x7FFF, 0x0001, 0x0001, 0x5A5A, 0x5A5A);
  var v0011 = SIMD.int16x8(0x0000, 0x0000, 0x7FFF, 0x7FFF, 0x8001, 0x8001, 0xA5A5, 0xA5A5);
  var v0111 = SIMD.int16x8(0x0000, 0x0000, 0xFFFF, 0xFFFF, 0x8000, 0x8001, 0xA5A5, 0xA5A5);
  var v1111 = SIMD.int16x8(0x8000, 0x8000, 0xFFFF, 0xFFFF, 0x8001, 0x8001, 0xA5A5, 0xA5A5);
  t_.equal(SIMD.int16x8.allTrue(v0000), false);
  t_.equal(SIMD.int16x8.allTrue(v0001), false);
  t_.equal(SIMD.int16x8.allTrue(v0010), false);
  t_.equal(SIMD.int16x8.allTrue(v0100), false);
  t_.equal(SIMD.int16x8.allTrue(v1000), false);
  t_.equal(SIMD.int16x8.allTrue(v0011), false);
  t_.equal(SIMD.int16x8.allTrue(v0111), false);
  t_.equal(SIMD.int16x8.allTrue(v1111), true);
 t_.end();
});

test('int16x8 anyTrue', function (t_) {
  var v0000 = SIMD.int16x8(0x0000, 0x0000, 0x7FFF, 0x7FFF, 0x0001, 0x0001, 0x5A5A, 0x5A5A);
  var v0001 = SIMD.int16x8(0x0000, 0x0000, 0x7FFF, 0x7FFF, 0x0001, 0x0001, 0xA5A5, 0xA5A5);
  var v0010 = SIMD.int16x8(0x0000, 0x0000, 0x7FFF, 0x7FFF, 0x8000, 0x8001, 0x5A5A, 0x5A5A);
  var v0100 = SIMD.int16x8(0x0000, 0x0000, 0xFFFF, 0xFFFF, 0x0001, 0x0001, 0x5A5A, 0x5A5A);
  var v1000 = SIMD.int16x8(0x8000, 0x0000, 0x7FFF, 0x7FFF, 0x0001, 0x0001, 0x5A5A, 0x5A5A);
  var v0011 = SIMD.int16x8(0x0000, 0x0000, 0x7FFF, 0x7FFF, 0x8001, 0x8001, 0xA5A5, 0xA5A5);
  var v0111 = SIMD.int16x8(0x0000, 0x0000, 0xFFFF, 0xFFFF, 0x8000, 0x8001, 0xA5A5, 0xA5A5);
  var v1111 = SIMD.int16x8(0x8000, 0x8000, 0xFFFF, 0xFFFF, 0x8001, 0x8001, 0xA5A5, 0xA5A5);
  t_.equal(SIMD.int16x8.anyTrue(v0000), false);
  t_.equal(SIMD.int16x8.anyTrue(v0001), true);
  t_.equal(SIMD.int16x8.anyTrue(v0010), true);
  t_.equal(SIMD.int16x8.anyTrue(v0100), true);
  t_.equal(SIMD.int16x8.anyTrue(v1000), true);
  t_.equal(SIMD.int16x8.anyTrue(v0011), true);
  t_.equal(SIMD.int16x8.anyTrue(v0111), true);
  t_.equal(SIMD.int16x8.anyTrue(v1111), true);
 t_.end();
});

test('int16x8 add', function(t_) {
  var a = SIMD.int16x8(0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x7fff, 0xffff, 0x0, 0x0);
  var b = SIMD.int16x8(0x0, 0x1, 0xFFFF, 0xFFFF, 0x0, 0x1, 0xFFFF, 0xFFFF);
  var c = SIMD.int16x8.add(a, b);
  t_.equal(-1, SIMD.int16x8.extractLane(c, 0));
  t_.equal(0, SIMD.int16x8.extractLane(c, 1));
  t_.equal(-2, SIMD.int16x8.extractLane(c, 2));
  t_.equal(-2, SIMD.int16x8.extractLane(c, 3));
  t_.equal(0x7fff, SIMD.int16x8.extractLane(c, 4));
  t_.equal(0, SIMD.int16x8.extractLane(c, 5));
  t_.equal(-1, SIMD.int16x8.extractLane(c, 6));
  t_.equal(-1, SIMD.int16x8.extractLane(c, 7));
 t_.end();
});

test('int16x8 sub', function(t_) {
  var a = SIMD.int16x8(0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x8000, 0x0000, 0x0, 0x0);
  var b = SIMD.int16x8(0x0, 0x1, 0xFFFF, 0x0FFFF, 0x0, 0x1, 0xFFFF, 0xFFFF);
  var c = SIMD.int16x8.sub(a, b);
  t_.equal(-1, SIMD.int16x8.extractLane(c, 0));
  t_.equal(-2, SIMD.int16x8.extractLane(c, 1));
  t_.equal(0, SIMD.int16x8.extractLane(c, 2));
  t_.equal(0, SIMD.int16x8.extractLane(c, 3));
  t_.equal(-32768, SIMD.int16x8.extractLane(c, 4));
  t_.equal(-1, SIMD.int16x8.extractLane(c, 5));
  t_.equal(1, SIMD.int16x8.extractLane(c, 6));
  t_.equal(1, SIMD.int16x8.extractLane(c, 7));
 t_.end();
});

test('int16x8 mul', function(t_) {
  var a = SIMD.int16x8(0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x8000, 0x0000, 0x0, 0x0);
  var b = SIMD.int16x8(0x0, 0x1, 0xFFFF, 0xFFFF, 0x8000, 0x0000, 0xFFFF, 0xFFFF);
  var c = SIMD.int16x8.mul(a, b);
  t_.equal(0, SIMD.int16x8.extractLane(c, 0));
  t_.equal(-1, SIMD.int16x8.extractLane(c, 1));
  t_.equal(1, SIMD.int16x8.extractLane(c, 2));
  t_.equal(1, SIMD.int16x8.extractLane(c, 3));
  t_.equal(0, SIMD.int16x8.extractLane(c, 4));
  t_.equal(0, SIMD.int16x8.extractLane(c, 5));
  t_.equal(0, SIMD.int16x8.extractLane(c, 6));
  t_.equal(0, SIMD.int16x8.extractLane(c, 7));
 t_.end();
});

test('int16x8 addSaturate', function(t_) {
  var a = SIMD.int16x8(0, 1, 0x7fff, 0x8000, -1, 0x7ffe, 0x8001, 10);
  var b = SIMD.int16x8.splat(1);
  var c = SIMD.int16x8.splat(-1);
  var d = SIMD.int16x8.addSaturate(a, b);
  var e = SIMD.int16x8.addSaturate(a, c);
  t_.equal(1, SIMD.int16x8.extractLane(d, 0));
  t_.equal(2, SIMD.int16x8.extractLane(d, 1));
  t_.equal(0x7fff, SIMD.int16x8.extractLane(d, 2));
  t_.equal(-0x7fff, SIMD.int16x8.extractLane(d, 3));
  t_.equal(0, SIMD.int16x8.extractLane(d, 4));
  t_.equal(0x7fff, SIMD.int16x8.extractLane(d, 5));
  t_.equal(-0x7ffe, SIMD.int16x8.extractLane(d, 6));
  t_.equal(11, SIMD.int16x8.extractLane(d, 7));
  t_.equal(-1, SIMD.int16x8.extractLane(e, 0));
  t_.equal(0, SIMD.int16x8.extractLane(e, 1));
  t_.equal(0x7ffe, SIMD.int16x8.extractLane(e, 2));
  t_.equal(-0x8000, SIMD.int16x8.extractLane(e, 3));
  t_.equal(-2, SIMD.int16x8.extractLane(e, 4));
  t_.equal(0x7ffd, SIMD.int16x8.extractLane(e, 5));
  t_.equal(-0x8000, SIMD.int16x8.extractLane(e, 6));
  t_.equal(9, SIMD.int16x8.extractLane(e, 7));
 t_.end();
});

test('int16x8 subSaturate', function(t_) {
  var a = SIMD.int16x8(0, 1, 0x7fff, 0x8000, -1, 0x7ffe, 0x8001, 10);
  var b = SIMD.int16x8.splat(1);
  var c = SIMD.int16x8.splat(-1);
  var d = SIMD.int16x8.subSaturate(a, b);
  var e = SIMD.int16x8.subSaturate(a, c);
  t_.equal(-1, SIMD.int16x8.extractLane(d, 0));
  t_.equal(0, SIMD.int16x8.extractLane(d, 1));
  t_.equal(0x7ffe, SIMD.int16x8.extractLane(d, 2));
  t_.equal(-0x8000, SIMD.int16x8.extractLane(d, 3));
  t_.equal(-2, SIMD.int16x8.extractLane(d, 4));
  t_.equal(0x7ffd, SIMD.int16x8.extractLane(d, 5));
  t_.equal(-0x8000, SIMD.int16x8.extractLane(d, 6));
  t_.equal(9, SIMD.int16x8.extractLane(d, 7));
  t_.equal(1, SIMD.int16x8.extractLane(e, 0));
  t_.equal(2, SIMD.int16x8.extractLane(e, 1));
  t_.equal(0x7fff, SIMD.int16x8.extractLane(e, 2));
  t_.equal(-0x7fff, SIMD.int16x8.extractLane(e, 3));
  t_.equal(0, SIMD.int16x8.extractLane(e, 4));
  t_.equal(0x7fff, SIMD.int16x8.extractLane(e, 5));
  t_.equal(-0x7ffe, SIMD.int16x8.extractLane(e, 6));
  t_.equal(11, SIMD.int16x8.extractLane(e, 7));
 t_.end();
});

test('int16x8 comparisons', function(t_) {
  var m = SIMD.int16x8(1000, 2000, 100, 1, -1000, -2000, -100, 1);
  var n = SIMD.int16x8(-2000, 2000, 1, 100, 2000, -2000, -1, -100);
  var cmp;
  cmp = SIMD.int16x8.lessThan(m, n);
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 0));
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 2));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 3));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 4));
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 5));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 6));
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 7));

  cmp = SIMD.int16x8.lessThanOrEqual(m, n);
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 0));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 2));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 3));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 4));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 5));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 6));
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 7));

  cmp = SIMD.int16x8.equal(m, n);
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 0));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 2));
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 3));
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 4));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 5));
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 6));
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 7));

  cmp = SIMD.int16x8.notEqual(m, n);
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 0));
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 1));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 2));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 3));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 4));
  t_.equal(0x0, SIMD.int16x8.extractLane(cmp, 5));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 6));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 7));

  cmp = SIMD.int16x8.greaterThan(m, n);
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 0));
  t_.equal(0, SIMD.int16x8.extractLane(cmp, 1));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 2));
  t_.equal(0, SIMD.int16x8.extractLane(cmp, 3));
  t_.equal(0, SIMD.int16x8.extractLane(cmp, 4));
  t_.equal(0, SIMD.int16x8.extractLane(cmp, 5));
  t_.equal(0, SIMD.int16x8.extractLane(cmp, 6));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 7));

  cmp = SIMD.int16x8.greaterThanOrEqual(m, n);
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 0));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 1));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 2));
  t_.equal(0, SIMD.int16x8.extractLane(cmp, 3));
  t_.equal(0, SIMD.int16x8.extractLane(cmp, 4));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 5));
  t_.equal(0, SIMD.int16x8.extractLane(cmp, 6));
  t_.equal(-1, SIMD.int16x8.extractLane(cmp, 7));
 t_.end();
});

test('int16x8 shiftLeftByScalar', function(t_) {
  var a = SIMD.int16x8(0xffff, 0xffff, 0x7fff, 0xffff, 0x0, 0x1, 0x0, 0x0);
  var b;

  b = SIMD.int16x8.shiftLeftByScalar(a, 1);
  t_.equal(SIMD.int16x8.extractLane(b, 0), -2);
  t_.equal(SIMD.int16x8.extractLane(b, 1), -2);
  t_.equal(SIMD.int16x8.extractLane(b, 2), -2);
  t_.equal(SIMD.int16x8.extractLane(b, 3), -2);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0002);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.int16x8.shiftLeftByScalar(a, 2);
  t_.equal(SIMD.int16x8.extractLane(b, 0), -4);
  t_.equal(SIMD.int16x8.extractLane(b, 1), -4);
  t_.equal(SIMD.int16x8.extractLane(b, 2), -4);
  t_.equal(SIMD.int16x8.extractLane(b, 3), -4);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0004);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.int16x8.shiftLeftByScalar(a, 14);
  t_.equal(SIMD.int16x8.extractLane(b, 0), -16384);
  t_.equal(SIMD.int16x8.extractLane(b, 1), -16384);
  t_.equal(SIMD.int16x8.extractLane(b, 2), -16384);
  t_.equal(SIMD.int16x8.extractLane(b, 3), -16384);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x4000);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.int16x8.shiftLeftByScalar(a, 15);
  t_.equal(SIMD.int16x8.extractLane(b, 0), -32768);
  t_.equal(SIMD.int16x8.extractLane(b, 1), -32768);
  t_.equal(SIMD.int16x8.extractLane(b, 2), -32768);
  t_.equal(SIMD.int16x8.extractLane(b, 3), -32768);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 5), -32768);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.int16x8.shiftLeftByScalar(a, 16);
  t_.equal(SIMD.int16x8.extractLane(b, 0), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 1), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 2), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 3), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0);
  b = SIMD.int16x8.shiftLeftByScalar(a, -1);
  t_.equal(SIMD.int16x8.extractLane(b, 0), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 1), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 2), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 3), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0);
 t_.end();
});

test('int16x8 shiftRightArithmeticByScalar', function(t_) {
  var a = SIMD.int16x8(0xffff, 0xffff, 0x7fff, 0xffff, 0x0, 0x1, 0x0, 0x0);
  var b;

  b = SIMD.int16x8.shiftRightArithmeticByScalar(a, 1);
  t_.equal(SIMD.int16x8.extractLane(b, 0), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 1), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 2), 0x3fff);
  t_.equal(SIMD.int16x8.extractLane(b, 3), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.int16x8.shiftRightArithmeticByScalar(a, 2);
  t_.equal(SIMD.int16x8.extractLane(b, 0), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 1), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 2), 0x1fff);
  t_.equal(SIMD.int16x8.extractLane(b, 3), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.int16x8.shiftRightArithmeticByScalar(a, 14);
  t_.equal(SIMD.int16x8.extractLane(b, 0), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 1), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 2), 0x0001);
  t_.equal(SIMD.int16x8.extractLane(b, 3), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.int16x8.shiftRightArithmeticByScalar(a, 15);
  t_.equal(SIMD.int16x8.extractLane(b, 0), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 1), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 2), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 3), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.int16x8.shiftRightArithmeticByScalar(a, 16);
  t_.equal(SIMD.int16x8.extractLane(b, 0), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 1), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 2), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 3), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0);
  b = SIMD.int16x8.shiftRightArithmeticByScalar(a, -1);
  t_.equal(SIMD.int16x8.extractLane(b, 0), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 1), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 2), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 3), -1);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0);
 t_.end();
});

test('int16x8 shiftRightLogicalByScalar', function(t_) {
  var a = SIMD.int16x8(0xffff, 0xffff, 0x7fff, 0xffff, 0x0, 0x1, 0x0, 0x0);
  var b;

  b = SIMD.int16x8.shiftRightLogicalByScalar(a, 1);
  t_.equal(SIMD.int16x8.extractLane(b, 0), 0x7fff);
  t_.equal(SIMD.int16x8.extractLane(b, 1), 0x7fff);
  t_.equal(SIMD.int16x8.extractLane(b, 2), 0x3fff);
  t_.equal(SIMD.int16x8.extractLane(b, 3), 0x7fff);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.int16x8.shiftRightLogicalByScalar(a, 2);
  t_.equal(SIMD.int16x8.extractLane(b, 0), 0x3fff);
  t_.equal(SIMD.int16x8.extractLane(b, 1), 0x3fff);
  t_.equal(SIMD.int16x8.extractLane(b, 2), 0x1fff);
  t_.equal(SIMD.int16x8.extractLane(b, 3), 0x3fff);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.int16x8.shiftRightLogicalByScalar(a, 14);
  t_.equal(SIMD.int16x8.extractLane(b, 0), 0x0003);
  t_.equal(SIMD.int16x8.extractLane(b, 1), 0x0003);
  t_.equal(SIMD.int16x8.extractLane(b, 2), 0x0001);
  t_.equal(SIMD.int16x8.extractLane(b, 3), 0x0003);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.int16x8.shiftRightLogicalByScalar(a, 15);
  t_.equal(SIMD.int16x8.extractLane(b, 0), 0x0001);
  t_.equal(SIMD.int16x8.extractLane(b, 1), 0x0001);
  t_.equal(SIMD.int16x8.extractLane(b, 2), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 3), 0x0001);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0000);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0000);
  b = SIMD.int16x8.shiftRightLogicalByScalar(a, 16);
  t_.equal(SIMD.int16x8.extractLane(b, 0), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 1), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 2), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 3), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0);
  b = SIMD.int16x8.shiftRightLogicalByScalar(a, -1);
  t_.equal(SIMD.int16x8.extractLane(b, 0), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 1), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 2), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 3), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 4), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 5), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 6), 0x0);
  t_.equal(SIMD.int16x8.extractLane(b, 7), 0x0);
 t_.end();
});

test('int16x8 select', function(t_) {
  var m = SIMD.int16x8.bool(true, true, true, true, false, false, false, false);
  var t = SIMD.int16x8(1, 2, 3, 4, 5, 6, 7, 8);
  var f = SIMD.int16x8(9, 10, 11, 12, 13, 14, 15, 16);
  var s = SIMD.int16x8.select(m, t, f);
  t_.equal(1, SIMD.int16x8.extractLane(s, 0));
  t_.equal(2, SIMD.int16x8.extractLane(s, 1));
  t_.equal(3, SIMD.int16x8.extractLane(s, 2));
  t_.equal(4, SIMD.int16x8.extractLane(s, 3));
  t_.equal(13, SIMD.int16x8.extractLane(s, 4));
  t_.equal(14, SIMD.int16x8.extractLane(s, 5));
  t_.equal(15, SIMD.int16x8.extractLane(s, 6));
  t_.equal(16, SIMD.int16x8.extractLane(s, 7));
 t_.end();
});

test('int16x8 selectBits', function(t_) {
  var m = SIMD.int16x8(0xaaaaaaaa, 0xbbbbbbbb, 0xcccccccc, 0xdddddddd, 0xeeeeeeee, 0xffffffff, 0x00000000, 0x55555555);
  var t = SIMD.int16x8(1, 2, 3, 4, 5, 6, 7, 8);
  var f = SIMD.int16x8(9, 10, 11, 12, 13, 14, 15, 16);
  var s = SIMD.int16x8.selectBits(m, t, f);
  t_.equal(1, SIMD.int16x8.extractLane(s, 0));
  t_.equal(2, SIMD.int16x8.extractLane(s, 1));
  t_.equal(3, SIMD.int16x8.extractLane(s, 2));
  t_.equal(4, SIMD.int16x8.extractLane(s, 3));
  t_.equal(5, SIMD.int16x8.extractLane(s, 4));
  t_.equal(6, SIMD.int16x8.extractLane(s, 5));
  t_.equal(15, SIMD.int16x8.extractLane(s, 6));
  t_.equal(0, SIMD.int16x8.extractLane(s, 7));
 t_.end();
});

test('int8x16 swizzle', function(t_) {
  var a    = SIMD.int8x16(1, 2, 3, 2147483647, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, -37);
  var xyxy = SIMD.int8x16.swizzle(a, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1);
  var zwzw = SIMD.int8x16.swizzle(a, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9);
  var xxxx = SIMD.int8x16.swizzle(a, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  t_.equal(1, SIMD.int8x16.extractLane(xyxy, 0));
  t_.equal(2, SIMD.int8x16.extractLane(xyxy, 1));
  t_.equal(1, SIMD.int8x16.extractLane(xyxy, 2));
  t_.equal(2, SIMD.int8x16.extractLane(xyxy, 3));
  t_.equal(1, SIMD.int8x16.extractLane(xyxy, 4));
  t_.equal(2, SIMD.int8x16.extractLane(xyxy, 5));
  t_.equal(1, SIMD.int8x16.extractLane(xyxy, 6));
  t_.equal(2, SIMD.int8x16.extractLane(xyxy, 7));
  t_.equal(1, SIMD.int8x16.extractLane(xyxy, 8));
  t_.equal(2, SIMD.int8x16.extractLane(xyxy, 9));
  t_.equal(1, SIMD.int8x16.extractLane(xyxy, 10));
  t_.equal(2, SIMD.int8x16.extractLane(xyxy, 11));
  t_.equal(1, SIMD.int8x16.extractLane(xyxy, 12));
  t_.equal(2, SIMD.int8x16.extractLane(xyxy, 13));
  t_.equal(1, SIMD.int8x16.extractLane(xyxy, 14));
  t_.equal(2, SIMD.int8x16.extractLane(xyxy, 15));
  t_.equal(9, SIMD.int8x16.extractLane(zwzw, 0));
  t_.equal(10, SIMD.int8x16.extractLane(zwzw, 1));
  t_.equal(9, SIMD.int8x16.extractLane(zwzw, 2));
  t_.equal(10, SIMD.int8x16.extractLane(zwzw, 3));
  t_.equal(9, SIMD.int8x16.extractLane(zwzw, 4));
  t_.equal(10, SIMD.int8x16.extractLane(zwzw, 5));
  t_.equal(9, SIMD.int8x16.extractLane(zwzw, 6));
  t_.equal(10, SIMD.int8x16.extractLane(zwzw, 7));
  t_.equal(9, SIMD.int8x16.extractLane(zwzw, 8));
  t_.equal(10, SIMD.int8x16.extractLane(zwzw, 9));
  t_.equal(9, SIMD.int8x16.extractLane(zwzw, 10));
  t_.equal(10, SIMD.int8x16.extractLane(zwzw, 11));
  t_.equal(9, SIMD.int8x16.extractLane(zwzw, 12));
  t_.equal(10, SIMD.int8x16.extractLane(zwzw, 13));
  t_.equal(9, SIMD.int8x16.extractLane(zwzw, 14));
  t_.equal(10, SIMD.int8x16.extractLane(zwzw, 15));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 0));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 1));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 2));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 3));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 4));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 5));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 6));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 7));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 8));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 9));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 10));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 11));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 12));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 13));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 14));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 15));

  function testIndexCheck(index) {
      t_['throws'](function() { SIMD.int8x16.swizzle(a, index, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(16);
 t_.end();
});

test('int8x16 shuffle', function(t_) {
  var a    = SIMD.int8x16(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  var b    = SIMD.int8x16(17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127);
  var xyxy = SIMD.int8x16.shuffle(a, b, 0, 1, 2, 3, 4, 5, 6, 7, 16, 17, 18, 19, 20, 21, 22, 23);
  var zwzw = SIMD.int8x16.shuffle(a, b, 8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31);
  var xxxx = SIMD.int8x16.shuffle(a, b, 0, 0, 0, 0, 0, 0, 0, 0, 16, 16, 16, 16, 16, 16, 16, 16);
  t_.equal(1, SIMD.int8x16.extractLane(xyxy, 0));
  t_.equal(2, SIMD.int8x16.extractLane(xyxy, 1));
  t_.equal(3, SIMD.int8x16.extractLane(xyxy, 2));
  t_.equal(4, SIMD.int8x16.extractLane(xyxy, 3));
  t_.equal(5, SIMD.int8x16.extractLane(xyxy, 4));
  t_.equal(6, SIMD.int8x16.extractLane(xyxy, 5));
  t_.equal(7, SIMD.int8x16.extractLane(xyxy, 6));
  t_.equal(8, SIMD.int8x16.extractLane(xyxy, 7));
  t_.equal(17, SIMD.int8x16.extractLane(xyxy, 8));
  t_.equal(18, SIMD.int8x16.extractLane(xyxy, 9));
  t_.equal(19, SIMD.int8x16.extractLane(xyxy, 10));
  t_.equal(20, SIMD.int8x16.extractLane(xyxy, 11));
  t_.equal(21, SIMD.int8x16.extractLane(xyxy, 12));
  t_.equal(22, SIMD.int8x16.extractLane(xyxy, 13));
  t_.equal(23, SIMD.int8x16.extractLane(xyxy, 14));
  t_.equal(24, SIMD.int8x16.extractLane(xyxy, 15));
  t_.equal(9, SIMD.int8x16.extractLane(zwzw, 0));
  t_.equal(10, SIMD.int8x16.extractLane(zwzw, 1));
  t_.equal(11, SIMD.int8x16.extractLane(zwzw, 2));
  t_.equal(12, SIMD.int8x16.extractLane(zwzw, 3));
  t_.equal(13, SIMD.int8x16.extractLane(zwzw, 4));
  t_.equal(14, SIMD.int8x16.extractLane(zwzw, 5));
  t_.equal(15, SIMD.int8x16.extractLane(zwzw, 6));
  t_.equal(16, SIMD.int8x16.extractLane(zwzw, 7));
  t_.equal(25, SIMD.int8x16.extractLane(zwzw, 8));
  t_.equal(26, SIMD.int8x16.extractLane(zwzw, 9));
  t_.equal(27, SIMD.int8x16.extractLane(zwzw, 10));
  t_.equal(28, SIMD.int8x16.extractLane(zwzw, 11));
  t_.equal(29, SIMD.int8x16.extractLane(zwzw, 12));
  t_.equal(30, SIMD.int8x16.extractLane(zwzw, 13));
  t_.equal(31, SIMD.int8x16.extractLane(zwzw, 14));
  t_.equal(127, SIMD.int8x16.extractLane(zwzw, 15));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 0));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 1));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 2));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 3));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 4));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 5));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 6));
  t_.equal(1, SIMD.int8x16.extractLane(xxxx, 7));
  t_.equal(17, SIMD.int8x16.extractLane(xxxx, 8));
  t_.equal(17, SIMD.int8x16.extractLane(xxxx, 9));
  t_.equal(17, SIMD.int8x16.extractLane(xxxx, 10));
  t_.equal(17, SIMD.int8x16.extractLane(xxxx, 11));
  t_.equal(17, SIMD.int8x16.extractLane(xxxx, 12));
  t_.equal(17, SIMD.int8x16.extractLane(xxxx, 13));
  t_.equal(17, SIMD.int8x16.extractLane(xxxx, 14));
  t_.equal(17, SIMD.int8x16.extractLane(xxxx, 15));

  function testIndexCheck(index) {
      t_['throws'](function() { SIMD.int8x16.shuffle(a, b, index, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0); });
  }
  testIndexCheck(13.37);
  testIndexCheck(null);
  testIndexCheck(undefined);
  testIndexCheck({});
  testIndexCheck(true);
  testIndexCheck('yo');
  testIndexCheck(-1);
  testIndexCheck(32);
 t_.end();
});

test('int8x16 and', function(t_) {
  var m = SIMD.int8x16(0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 170, 170, 170, 170, 0xAA, 0xAA, 0xAA, 0xAA);
  var n = SIMD.int8x16(0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55);
  t_.equal(-86, SIMD.int8x16.extractLane(m, 0));
  t_.equal(-86, SIMD.int8x16.extractLane(m, 1));
  t_.equal(-86, SIMD.int8x16.extractLane(m, 2));
  t_.equal(-86, SIMD.int8x16.extractLane(m, 3));
  t_.equal(-86, SIMD.int8x16.extractLane(m, 4));
  t_.equal(-86, SIMD.int8x16.extractLane(m, 5));
  t_.equal(-86, SIMD.int8x16.extractLane(m, 6));
  t_.equal(-86, SIMD.int8x16.extractLane(m, 7));
  t_.equal(-86, SIMD.int8x16.extractLane(m, 8));
  t_.equal(-86, SIMD.int8x16.extractLane(m, 9));
  t_.equal(-86, SIMD.int8x16.extractLane(m, 10));
  t_.equal(-86, SIMD.int8x16.extractLane(m, 11));
  t_.equal(-86, SIMD.int8x16.extractLane(m, 12));
  t_.equal(-86, SIMD.int8x16.extractLane(m, 13));
  t_.equal(-86, SIMD.int8x16.extractLane(m, 14));
  t_.equal(-86, SIMD.int8x16.extractLane(m, 15));
  t_.equal(85, SIMD.int8x16.extractLane(n, 0));
  t_.equal(85, SIMD.int8x16.extractLane(n, 1));
  t_.equal(85, SIMD.int8x16.extractLane(n, 2));
  t_.equal(85, SIMD.int8x16.extractLane(n, 3));
  t_.equal(85, SIMD.int8x16.extractLane(n, 4));
  t_.equal(85, SIMD.int8x16.extractLane(n, 5));
  t_.equal(85, SIMD.int8x16.extractLane(n, 6));
  t_.equal(85, SIMD.int8x16.extractLane(n, 7));
  t_.equal(85, SIMD.int8x16.extractLane(n, 8));
  t_.equal(85, SIMD.int8x16.extractLane(n, 9));
  t_.equal(85, SIMD.int8x16.extractLane(n, 10));
  t_.equal(85, SIMD.int8x16.extractLane(n, 11));
  t_.equal(85, SIMD.int8x16.extractLane(n, 12));
  t_.equal(85, SIMD.int8x16.extractLane(n, 13));
  t_.equal(85, SIMD.int8x16.extractLane(n, 14));
  t_.equal(85, SIMD.int8x16.extractLane(n, 15));
  var o = SIMD.int8x16.and(m,n);  // and
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 0));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 1));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 2));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 3));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 4));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 5));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 6));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 7));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 8));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 9));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 10));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 11));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 12));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 13));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 14));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 15));
 t_.end();
});

test('int8x16 or', function(t_) {
  var m = SIMD.int8x16(0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA);
  var n = SIMD.int8x16(0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55);
  var o = SIMD.int8x16.or(m,n);  // or
  t_.equal(-1, SIMD.int8x16.extractLane(o, 0));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 1));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 2));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 3));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 4));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 5));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 6));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 7));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 8));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 9));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 10));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 11));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 12));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 13));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 14));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 15));
 t_.end();
});

test('int8x16 xor', function(t_) {
  var m = SIMD.int8x16(0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA);
  var n = SIMD.int8x16(0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0x55);
  var o = SIMD.int8x16.xor(m,n);  // xor
  t_.equal(-1, SIMD.int8x16.extractLane(o, 0));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 1));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 2));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 3));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 4));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 5));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 6));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 7));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 8));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 9));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 10));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 11));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 12));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 13));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 14));
  t_.equal(-1, SIMD.int8x16.extractLane(o, 15));
  o = SIMD.int8x16.xor(m,m);  // xor
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 0));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 1));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 2));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 3));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 4));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 5));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 6));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 7));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 8));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 9));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 10));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 11));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 12));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 13));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 14));
  t_.equal(0x0, SIMD.int8x16.extractLane(o, 15));
 t_.end();
});

test('int8x16 neg', function(t_) {
  var m = SIMD.int8x16(16, -32, 64, -128, 256, -512, 1024, -2048, 4096, -8192, 16384, -32768, 65536, -131072, 262144, -524288);
  m = SIMD.int8x16.neg(m);
  t_.equal(-16, SIMD.int8x16.extractLane(m, 0));
  t_.equal(32, SIMD.int8x16.extractLane(m, 1));
  t_.equal(-64, SIMD.int8x16.extractLane(m, 2));
  t_.equal(-128, SIMD.int8x16.extractLane(m, 3));
  t_.equal(0, SIMD.int8x16.extractLane(m, 4));
  t_.equal(0, SIMD.int8x16.extractLane(m, 5));
  t_.equal(0, SIMD.int8x16.extractLane(m, 6));
  t_.equal(0, SIMD.int8x16.extractLane(m, 7));
  t_.equal(0, SIMD.int8x16.extractLane(m, 8));
  t_.equal(0, SIMD.int8x16.extractLane(m, 9));
  t_.equal(0, SIMD.int8x16.extractLane(m, 10));
  t_.equal(0, SIMD.int8x16.extractLane(m, 11));
  t_.equal(0, SIMD.int8x16.extractLane(m, 12));
  t_.equal(0, SIMD.int8x16.extractLane(m, 13));
  t_.equal(0, SIMD.int8x16.extractLane(m, 14));
  t_.equal(0, SIMD.int8x16.extractLane(m, 15));

  var n = SIMD.int8x16(0, 0, 0, 0, 0x7f, 0xff, 0xff, 0xff, -1, -1, -1, -1, 0x80, 0x00, 0x00, 0x00);
  n = SIMD.int8x16.neg(n);
  t_.equal(0, SIMD.int8x16.extractLane(n, 0));
  t_.equal(0, SIMD.int8x16.extractLane(n, 1));
  t_.equal(0, SIMD.int8x16.extractLane(n, 2));
  t_.equal(0, SIMD.int8x16.extractLane(n, 3));
  t_.equal(-127, SIMD.int8x16.extractLane(n, 4));
  t_.equal(1, SIMD.int8x16.extractLane(n, 5));
  t_.equal(1, SIMD.int8x16.extractLane(n, 6));
  t_.equal(1, SIMD.int8x16.extractLane(n, 7));
  t_.equal(1, SIMD.int8x16.extractLane(n, 8));
  t_.equal(1, SIMD.int8x16.extractLane(n, 9));
  t_.equal(1, SIMD.int8x16.extractLane(n, 10));
  t_.equal(1, SIMD.int8x16.extractLane(n, 11));
  t_.equal(-128, SIMD.int8x16.extractLane(n, 12));
  t_.equal(0, SIMD.int8x16.extractLane(n, 13));
  t_.equal(0, SIMD.int8x16.extractLane(n, 14));
  t_.equal(0, SIMD.int8x16.extractLane(n, 15));
 t_.end();
});

test('int8x16 allTrue', function (t_) {
  var v0000 = SIMD.int8x16(0x00, 0x00, 0x00, 0x00, 0x7F, 0x7F, 0x7F, 0x7F, 0x01, 0x01, 0x01, 0x01, 0x5A, 0x5A, 0x5A, 0x5A);
  var v0001 = SIMD.int8x16(0x00, 0x00, 0x00, 0x00, 0x7F, 0x7F, 0x7F, 0x7F, 0x01, 0x01, 0x01, 0x01, 0xA5, 0xA5, 0xA5, 0xA5);
  var v0010 = SIMD.int8x16(0x00, 0x00, 0x00, 0x00, 0x7F, 0x7F, 0x7F, 0x7F, 0x81, 0x81, 0x81, 0x81, 0x5A, 0x5A, 0x5A, 0x5A);
  var v0100 = SIMD.int8x16(0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0x01, 0x01, 0x01, 0x01, 0x5A, 0x5A, 0x5A, 0x5A);
  var v1000 = SIMD.int8x16(0x80, 0x80, 0x80, 0x80, 0x7F, 0x7F, 0x7F, 0x7F, 0x01, 0x01, 0x01, 0x01, 0x5A, 0x5A, 0x5A, 0x5A);
  var v0011 = SIMD.int8x16(0x00, 0x00, 0x00, 0x00, 0x7F, 0x7F, 0x7F, 0x7F, 0x81, 0x81, 0x81, 0x81, 0xA5, 0xA5, 0xA5, 0xA5);
  var v0111 = SIMD.int8x16(0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0x81, 0x81, 0x81, 0x81, 0xA5, 0xA5, 0xA5, 0xA5);
  var v1111 = SIMD.int8x16(0x80, 0x80, 0x80, 0x80, 0xFF, 0xFF, 0xFF, 0xFF, 0x81, 0x81, 0x81, 0x81, 0xA5, 0xA5, 0xA5, 0xA5);
  t_.equal(SIMD.int8x16.allTrue(v0000), false);
  t_.equal(SIMD.int8x16.allTrue(v0001), false);
  t_.equal(SIMD.int8x16.allTrue(v0010), false);
  t_.equal(SIMD.int8x16.allTrue(v0100), false);
  t_.equal(SIMD.int8x16.allTrue(v1000), false);
  t_.equal(SIMD.int8x16.allTrue(v0011), false);
  t_.equal(SIMD.int8x16.allTrue(v0111), false);
  t_.equal(SIMD.int8x16.allTrue(v1111), true);
 t_.end();
});

test('int8x16 anyTrue', function (t_) {
  var v0000 = SIMD.int8x16(0x00, 0x00, 0x00, 0x00, 0x7F, 0x7F, 0x7F, 0x7F, 0x01, 0x01, 0x01, 0x01, 0x5A, 0x5A, 0x5A, 0x5A);
  var v0001 = SIMD.int8x16(0x00, 0x00, 0x00, 0x00, 0x7F, 0x7F, 0x7F, 0x7F, 0x01, 0x01, 0x01, 0x01, 0xA5, 0xA5, 0xA5, 0xA5);
  var v0010 = SIMD.int8x16(0x00, 0x00, 0x00, 0x00, 0x7F, 0x7F, 0x7F, 0x7F, 0x81, 0x81, 0x81, 0x81, 0x5A, 0x5A, 0x5A, 0x5A);
  var v0100 = SIMD.int8x16(0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0x01, 0x01, 0x01, 0x01, 0x5A, 0x5A, 0x5A, 0x5A);
  var v1000 = SIMD.int8x16(0x80, 0x80, 0x80, 0x80, 0x7F, 0x7F, 0x7F, 0x7F, 0x01, 0x01, 0x01, 0x01, 0x5A, 0x5A, 0x5A, 0x5A);
  var v0011 = SIMD.int8x16(0x00, 0x00, 0x00, 0x00, 0x7F, 0x7F, 0x7F, 0x7F, 0x81, 0x81, 0x81, 0x81, 0xA5, 0xA5, 0xA5, 0xA5);
  var v0111 = SIMD.int8x16(0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0x81, 0x81, 0x81, 0x81, 0xA5, 0xA5, 0xA5, 0xA5);
  var v1111 = SIMD.int8x16(0x80, 0x80, 0x80, 0x80, 0xFF, 0xFF, 0xFF, 0xFF, 0x81, 0x81, 0x81, 0x81, 0xA5, 0xA5, 0xA5, 0xA5);
  t_.equal(SIMD.int8x16.anyTrue(v0000), false);
  t_.equal(SIMD.int8x16.anyTrue(v0001), true);
  t_.equal(SIMD.int8x16.anyTrue(v0010), true);
  t_.equal(SIMD.int8x16.anyTrue(v0100), true);
  t_.equal(SIMD.int8x16.anyTrue(v1000), true);
  t_.equal(SIMD.int8x16.anyTrue(v0011), true);
  t_.equal(SIMD.int8x16.anyTrue(v0111), true);
  t_.equal(SIMD.int8x16.anyTrue(v1111), true);
 t_.end();
});

test('int8x16 add', function (t_) {
  var a = SIMD.int8x16(0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x0);
  var b = SIMD.int8x16(0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF, 0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF);
  var c = SIMD.int8x16.add(a, b);
  t_.equal(-1, SIMD.int8x16.extractLane(c, 0));
  t_.equal(-1, SIMD.int8x16.extractLane(c, 1));
  t_.equal(-1, SIMD.int8x16.extractLane(c, 2));
  t_.equal(0x0, SIMD.int8x16.extractLane(c, 3));
  t_.equal(-2, SIMD.int8x16.extractLane(c, 4));
  t_.equal(-2, SIMD.int8x16.extractLane(c, 5));
  t_.equal(-2, SIMD.int8x16.extractLane(c, 6));
  t_.equal(-2, SIMD.int8x16.extractLane(c, 7));
  t_.equal(0x7f, SIMD.int8x16.extractLane(c, 8));
  t_.equal(-1, SIMD.int8x16.extractLane(c, 9));
  t_.equal(-1, SIMD.int8x16.extractLane(c, 10));
  t_.equal(0x0, SIMD.int8x16.extractLane(c, 11));
  t_.equal(-1, SIMD.int8x16.extractLane(c, 12));
  t_.equal(-1, SIMD.int8x16.extractLane(c, 13));
  t_.equal(-1, SIMD.int8x16.extractLane(c, 14));
  t_.equal(-1, SIMD.int8x16.extractLane(c, 15));
 t_.end();
});

test('int8x16 sub', function(t_) {
  var a = SIMD.int8x16(0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x0);
  var b = SIMD.int8x16(0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF, 0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF);
  var c = SIMD.int8x16.sub(a, b);
  t_.equal(-1, SIMD.int8x16.extractLane(c, 0));
  t_.equal(-1, SIMD.int8x16.extractLane(c, 1));
  t_.equal(-1, SIMD.int8x16.extractLane(c, 2));
  t_.equal(-2, SIMD.int8x16.extractLane(c, 3));
  t_.equal(0, SIMD.int8x16.extractLane(c, 4));
  t_.equal(0, SIMD.int8x16.extractLane(c, 5));
  t_.equal(0, SIMD.int8x16.extractLane(c, 6));
  t_.equal(0, SIMD.int8x16.extractLane(c, 7));
  t_.equal(0x7f, SIMD.int8x16.extractLane(c, 8));
  t_.equal(-1, SIMD.int8x16.extractLane(c, 9));
  t_.equal(-1, SIMD.int8x16.extractLane(c, 10));
  t_.equal(-2, SIMD.int8x16.extractLane(c, 11));
  t_.equal(1, SIMD.int8x16.extractLane(c, 12));
  t_.equal(1, SIMD.int8x16.extractLane(c, 13));
  t_.equal(1, SIMD.int8x16.extractLane(c, 14));
  t_.equal(1, SIMD.int8x16.extractLane(c, 15));
 t_.end();
});

test('int8x16 mul', function(t_) {
  var a = SIMD.int8x16(0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x0);
  var b = SIMD.int8x16(0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF, 0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF);
  var c = SIMD.int8x16.mul(a, b);
  t_.equal(0x0, SIMD.int8x16.extractLane(c, 0));
  t_.equal(0x0, SIMD.int8x16.extractLane(c, 1));
  t_.equal(0x0, SIMD.int8x16.extractLane(c, 2));
  t_.equal(-1, SIMD.int8x16.extractLane(c, 3));
  t_.equal(1, SIMD.int8x16.extractLane(c, 4));
  t_.equal(1, SIMD.int8x16.extractLane(c, 5));
  t_.equal(1, SIMD.int8x16.extractLane(c, 6));
  t_.equal(1, SIMD.int8x16.extractLane(c, 7));
  t_.equal(0, SIMD.int8x16.extractLane(c, 8));
  t_.equal(0, SIMD.int8x16.extractLane(c, 9));
  t_.equal(0, SIMD.int8x16.extractLane(c, 10));
  t_.equal(-1, SIMD.int8x16.extractLane(c, 11));
  t_.equal(0, SIMD.int8x16.extractLane(c, 12));
  t_.equal(0, SIMD.int8x16.extractLane(c, 13));
  t_.equal(0, SIMD.int8x16.extractLane(c, 14));
  t_.equal(0, SIMD.int8x16.extractLane(c, 15));
 t_.end();
});

test('int8x16 addSaturate', function(t_) {
  var a = SIMD.int8x16(0, 1, 0x7f, 0x80, -1, 0x7e, 0x81, 10, 11, 12, 13, 14, 15, 16, 17, 18);
  var b = SIMD.int8x16.splat(1);
  var c = SIMD.int8x16.splat(-1);
  var d = SIMD.int8x16.addSaturate(a, b);
  var e = SIMD.int8x16.addSaturate(a, c);
  t_.equal(1, SIMD.int8x16.extractLane(d, 0));
  t_.equal(2, SIMD.int8x16.extractLane(d, 1));
  t_.equal(0x7f, SIMD.int8x16.extractLane(d, 2));
  t_.equal(-0x7f, SIMD.int8x16.extractLane(d, 3));
  t_.equal(0, SIMD.int8x16.extractLane(d, 4));
  t_.equal(0x7f, SIMD.int8x16.extractLane(d, 5));
  t_.equal(-0x7e, SIMD.int8x16.extractLane(d, 6));
  t_.equal(11, SIMD.int8x16.extractLane(d, 7));
  t_.equal(12, SIMD.int8x16.extractLane(d, 8));
  t_.equal(13, SIMD.int8x16.extractLane(d, 9));
  t_.equal(14, SIMD.int8x16.extractLane(d, 10));
  t_.equal(15, SIMD.int8x16.extractLane(d, 11));
  t_.equal(16, SIMD.int8x16.extractLane(d, 12));
  t_.equal(17, SIMD.int8x16.extractLane(d, 13));
  t_.equal(18, SIMD.int8x16.extractLane(d, 14));
  t_.equal(19, SIMD.int8x16.extractLane(d, 15));
  t_.equal(-1, SIMD.int8x16.extractLane(e, 0));
  t_.equal(0, SIMD.int8x16.extractLane(e, 1));
  t_.equal(0x7e, SIMD.int8x16.extractLane(e, 2));
  t_.equal(-0x80, SIMD.int8x16.extractLane(e, 3));
  t_.equal(-2, SIMD.int8x16.extractLane(e, 4));
  t_.equal(0x7d, SIMD.int8x16.extractLane(e, 5));
  t_.equal(-0x80, SIMD.int8x16.extractLane(e, 6));
  t_.equal(9, SIMD.int8x16.extractLane(e, 7));
  t_.equal(10, SIMD.int8x16.extractLane(e, 8));
  t_.equal(11, SIMD.int8x16.extractLane(e, 9));
  t_.equal(12, SIMD.int8x16.extractLane(e, 10));
  t_.equal(13, SIMD.int8x16.extractLane(e, 11));
  t_.equal(14, SIMD.int8x16.extractLane(e, 12));
  t_.equal(15, SIMD.int8x16.extractLane(e, 13));
  t_.equal(16, SIMD.int8x16.extractLane(e, 14));
  t_.equal(17, SIMD.int8x16.extractLane(e, 15));
 t_.end();
});

test('int8x16 subSaturate', function(t_) {
  var a = SIMD.int8x16(0, 1, 0x7f, 0x80, -1, 0x7e, 0x81, 10, 11, 12, 13, 14, 15, 16, 17, 18);
  var b = SIMD.int8x16.splat(1);
  var c = SIMD.int8x16.splat(-1);
  var d = SIMD.int8x16.subSaturate(a, b);
  var e = SIMD.int8x16.subSaturate(a, c);
  t_.equal(-1, SIMD.int8x16.extractLane(d, 0));
  t_.equal(0, SIMD.int8x16.extractLane(d, 1));
  t_.equal(0x7e, SIMD.int8x16.extractLane(d, 2));
  t_.equal(-0x80, SIMD.int8x16.extractLane(d, 3));
  t_.equal(-2, SIMD.int8x16.extractLane(d, 4));
  t_.equal(0x7d, SIMD.int8x16.extractLane(d, 5));
  t_.equal(-0x80, SIMD.int8x16.extractLane(d, 6));
  t_.equal(9, SIMD.int8x16.extractLane(d, 7));
  t_.equal(10, SIMD.int8x16.extractLane(d, 8));
  t_.equal(11, SIMD.int8x16.extractLane(d, 9));
  t_.equal(12, SIMD.int8x16.extractLane(d, 10));
  t_.equal(13, SIMD.int8x16.extractLane(d, 11));
  t_.equal(14, SIMD.int8x16.extractLane(d, 12));
  t_.equal(15, SIMD.int8x16.extractLane(d, 13));
  t_.equal(16, SIMD.int8x16.extractLane(d, 14));
  t_.equal(17, SIMD.int8x16.extractLane(d, 15));
  t_.equal(1, SIMD.int8x16.extractLane(e, 0));
  t_.equal(2, SIMD.int8x16.extractLane(e, 1));
  t_.equal(0x7f, SIMD.int8x16.extractLane(e, 2));
  t_.equal(-0x7f, SIMD.int8x16.extractLane(e, 3));
  t_.equal(0, SIMD.int8x16.extractLane(e, 4));
  t_.equal(0x7f, SIMD.int8x16.extractLane(e, 5));
  t_.equal(-0x7e, SIMD.int8x16.extractLane(e, 6));
  t_.equal(11, SIMD.int8x16.extractLane(e, 7));
  t_.equal(12, SIMD.int8x16.extractLane(e, 8));
  t_.equal(13, SIMD.int8x16.extractLane(e, 9));
  t_.equal(14, SIMD.int8x16.extractLane(e, 10));
  t_.equal(15, SIMD.int8x16.extractLane(e, 11));
  t_.equal(16, SIMD.int8x16.extractLane(e, 12));
  t_.equal(17, SIMD.int8x16.extractLane(e, 13));
  t_.equal(18, SIMD.int8x16.extractLane(e, 14));
  t_.equal(19, SIMD.int8x16.extractLane(e, 15));
 t_.end();
});

test('int8x16 sumOfAbsoluteDifferences', function(t_) {
  var a = SIMD.int8x16(0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x0);
  var b = SIMD.int8x16(0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF, 0x0, 0x0, 0x0, 0x1, 0xFF, 0xFF, 0xFF, 0xFF);
  var c = SIMD.int8x16.sumOfAbsoluteDifferences(a, b);
  t_.equal(c, 140);
 t_.end();
});

test('int8x16 comparisons', function(t_) {
  var m = SIMD.int8x16(1000, 2000, 100, 1, -1000, -2000, -100, 1, 0, 0, 0, 0, -1, 1, -2, 2);
  var n = SIMD.int8x16(-2000, 2000, 1, 100, 2000, -2000, -1, -100, -1, 1, -2, 2, 0, 0, 0, 0);
  var cmp;
  cmp = SIMD.int8x16.lessThan(m, n);
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 0));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 2));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 3));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 4));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 5));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 6));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 7));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 8));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 9));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 10));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 11));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 12));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 13));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 14));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 15));

  cmp = SIMD.int8x16.lessThanOrEqual(m, n);
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 0));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 2));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 3));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 4));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 5));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 6));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 7));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 8));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 9));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 10));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 11));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 12));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 13));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 14));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 15));

  cmp = SIMD.int8x16.equal(m, n);
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 0));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 1));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 2));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 3));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 4));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 5));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 6));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 7));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 8));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 9));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 10));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 11));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 12));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 13));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 14));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 15));

  cmp = SIMD.int8x16.notEqual(m, n);
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 0));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 1));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 2));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 3));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 4));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 5));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 6));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 7));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 8));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 9));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 10));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 11));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 12));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 13));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 14));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 15));

  cmp = SIMD.int8x16.greaterThan(m, n);
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 0));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 1));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 2));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 3));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 4));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 5));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 6));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 7));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 8));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 9));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 10));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 11));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 12));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 13));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 14));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 15));

  cmp = SIMD.int8x16.greaterThanOrEqual(m, n);
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 0));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 1));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 2));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 3));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 4));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 5));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 6));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 7));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 8));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 9));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 10));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 11));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 12));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 13));
  t_.equal(0x0, SIMD.int8x16.extractLane(cmp, 14));
  t_.equal(-1, SIMD.int8x16.extractLane(cmp, 15));
 t_.end();
});

test('int8x16 shiftLeftByScalar', function(t_) {
  var a = SIMD.int8x16(0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0);
  var b;

  b = SIMD.int8x16.shiftLeftByScalar(a, 1);
  t_.equal(SIMD.int8x16.extractLane(b, 0), -2);
  t_.equal(SIMD.int8x16.extractLane(b, 1), -2);
  t_.equal(SIMD.int8x16.extractLane(b, 2), -2);
  t_.equal(SIMD.int8x16.extractLane(b, 3), -2);
  t_.equal(SIMD.int8x16.extractLane(b, 4), -2);
  t_.equal(SIMD.int8x16.extractLane(b, 5), -2);
  t_.equal(SIMD.int8x16.extractLane(b, 6), -2);
  t_.equal(SIMD.int8x16.extractLane(b, 7), -2);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x02);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x00);
  b = SIMD.int8x16.shiftLeftByScalar(a, 2);
  t_.equal(SIMD.int8x16.extractLane(b, 0), -4);
  t_.equal(SIMD.int8x16.extractLane(b, 1), -4);
  t_.equal(SIMD.int8x16.extractLane(b, 2), -4);
  t_.equal(SIMD.int8x16.extractLane(b, 3), -4);
  t_.equal(SIMD.int8x16.extractLane(b, 4), -4);
  t_.equal(SIMD.int8x16.extractLane(b, 5), -4);
  t_.equal(SIMD.int8x16.extractLane(b, 6), -4);
  t_.equal(SIMD.int8x16.extractLane(b, 7), -4);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x04);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x00);
  b = SIMD.int8x16.shiftLeftByScalar(a, 6);
  t_.equal(SIMD.int8x16.extractLane(b, 0), -64);
  t_.equal(SIMD.int8x16.extractLane(b, 1), -64);
  t_.equal(SIMD.int8x16.extractLane(b, 2), -64);
  t_.equal(SIMD.int8x16.extractLane(b, 3), -64);
  t_.equal(SIMD.int8x16.extractLane(b, 4), -64);
  t_.equal(SIMD.int8x16.extractLane(b, 5), -64);
  t_.equal(SIMD.int8x16.extractLane(b, 6), -64);
  t_.equal(SIMD.int8x16.extractLane(b, 7), -64);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x40);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x00);
  b = SIMD.int8x16.shiftLeftByScalar(a, 7);
  t_.equal(SIMD.int8x16.extractLane(b, 0), -128);
  t_.equal(SIMD.int8x16.extractLane(b, 1), -128);
  t_.equal(SIMD.int8x16.extractLane(b, 2), -128);
  t_.equal(SIMD.int8x16.extractLane(b, 3), -128);
  t_.equal(SIMD.int8x16.extractLane(b, 4), -128);
  t_.equal(SIMD.int8x16.extractLane(b, 5), -128);
  t_.equal(SIMD.int8x16.extractLane(b, 6), -128);
  t_.equal(SIMD.int8x16.extractLane(b, 7), -128);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 11), -128);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x00);
  b = SIMD.int8x16.shiftLeftByScalar(a, 16);
  t_.equal(SIMD.int8x16.extractLane(b, 0), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 1), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 2), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 3), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 4), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 5), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 6), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 7), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x0);
  b = SIMD.int8x16.shiftLeftByScalar(a, -1);
  t_.equal(SIMD.int8x16.extractLane(b, 0), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 1), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 2), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 3), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 4), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 5), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 6), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 7), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x0);
 t_.end();
});

test('int8x16 shiftRightArithmeticByScalar', function(t_) {
  var a = SIMD.int8x16(0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0);
  var b;

  b = SIMD.int8x16.shiftRightArithmeticByScalar(a, 1);
  t_.equal(SIMD.int8x16.extractLane(b, 0), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 1), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 2), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 3), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 4), 0x3f);
  t_.equal(SIMD.int8x16.extractLane(b, 5), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 6), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 7), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x00);
  b = SIMD.int8x16.shiftRightArithmeticByScalar(a, 2);
  t_.equal(SIMD.int8x16.extractLane(b, 0), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 1), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 2), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 3), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 4), 0x1f);
  t_.equal(SIMD.int8x16.extractLane(b, 5), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 6), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 7), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x00);
  b = SIMD.int8x16.shiftRightArithmeticByScalar(a, 6);
  t_.equal(SIMD.int8x16.extractLane(b, 0), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 1), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 2), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 3), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 4), 0x01);
  t_.equal(SIMD.int8x16.extractLane(b, 5), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 6), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 7), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x00);
  b = SIMD.int8x16.shiftRightArithmeticByScalar(a, 7);
  t_.equal(SIMD.int8x16.extractLane(b, 0), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 1), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 2), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 3), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 4), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 5), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 6), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 7), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x00);
  b = SIMD.int8x16.shiftRightArithmeticByScalar(a, 8);
  t_.equal(SIMD.int8x16.extractLane(b, 0), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 1), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 2), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 3), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 4), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 5), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 6), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 7), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x0);
  b = SIMD.int8x16.shiftRightArithmeticByScalar(a, -1);
  t_.equal(SIMD.int8x16.extractLane(b, 0), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 1), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 2), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 3), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 4), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 5), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 6), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 7), -1);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x0);
 t_.end();
});

test('int8x16 shiftRightLogicalByScalar', function(t_) {
  var a = SIMD.int8x16(0xff, 0xff, 0xff, 0xff, 0x7f, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0);
  var b;

  b = SIMD.int8x16.shiftRightLogicalByScalar(a, 1);
  t_.equal(SIMD.int8x16.extractLane(b, 0), 0x7f);
  t_.equal(SIMD.int8x16.extractLane(b, 1), 0x7f);
  t_.equal(SIMD.int8x16.extractLane(b, 2), 0x7f);
  t_.equal(SIMD.int8x16.extractLane(b, 3), 0x7f);
  t_.equal(SIMD.int8x16.extractLane(b, 4), 0x3f);
  t_.equal(SIMD.int8x16.extractLane(b, 5), 0x7f);
  t_.equal(SIMD.int8x16.extractLane(b, 6), 0x7f);
  t_.equal(SIMD.int8x16.extractLane(b, 7), 0x7f);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x00);
  b = SIMD.int8x16.shiftRightLogicalByScalar(a, 2);
  t_.equal(SIMD.int8x16.extractLane(b, 0), 0x3f);
  t_.equal(SIMD.int8x16.extractLane(b, 1), 0x3f);
  t_.equal(SIMD.int8x16.extractLane(b, 2), 0x3f);
  t_.equal(SIMD.int8x16.extractLane(b, 3), 0x3f);
  t_.equal(SIMD.int8x16.extractLane(b, 4), 0x1f);
  t_.equal(SIMD.int8x16.extractLane(b, 5), 0x3f);
  t_.equal(SIMD.int8x16.extractLane(b, 6), 0x3f);
  t_.equal(SIMD.int8x16.extractLane(b, 7), 0x3f);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x00);
  b = SIMD.int8x16.shiftRightLogicalByScalar(a, 6);
  t_.equal(SIMD.int8x16.extractLane(b, 0), 0x03);
  t_.equal(SIMD.int8x16.extractLane(b, 1), 0x03);
  t_.equal(SIMD.int8x16.extractLane(b, 2), 0x03);
  t_.equal(SIMD.int8x16.extractLane(b, 3), 0x03);
  t_.equal(SIMD.int8x16.extractLane(b, 4), 0x01);
  t_.equal(SIMD.int8x16.extractLane(b, 5), 0x03);
  t_.equal(SIMD.int8x16.extractLane(b, 6), 0x03);
  t_.equal(SIMD.int8x16.extractLane(b, 7), 0x03);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x00);
  b = SIMD.int8x16.shiftRightLogicalByScalar(a, 7);
  t_.equal(SIMD.int8x16.extractLane(b, 0), 0x01);
  t_.equal(SIMD.int8x16.extractLane(b, 1), 0x01);
  t_.equal(SIMD.int8x16.extractLane(b, 2), 0x01);
  t_.equal(SIMD.int8x16.extractLane(b, 3), 0x01);
  t_.equal(SIMD.int8x16.extractLane(b, 4), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 5), 0x01);
  t_.equal(SIMD.int8x16.extractLane(b, 6), 0x01);
  t_.equal(SIMD.int8x16.extractLane(b, 7), 0x01);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x00);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x00);
  b = SIMD.int8x16.shiftRightLogicalByScalar(a, 8);
  t_.equal(SIMD.int8x16.extractLane(b, 0), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 1), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 2), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 3), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 4), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 5), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 6), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 7), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x0);
  b = SIMD.int8x16.shiftRightLogicalByScalar(a, -1);
  t_.equal(SIMD.int8x16.extractLane(b, 0), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 1), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 2), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 3), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 4), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 5), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 6), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 7), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 8), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 9), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 10), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 11), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 12), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 13), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 14), 0x0);
  t_.equal(SIMD.int8x16.extractLane(b, 15), 0x0);
 t_.end();
});

test('int8x16 select', function(t_) {
  var m = SIMD.int8x16.bool(true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false);
  var t = SIMD.int8x16(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  var f = SIMD.int8x16(17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32);
  var s = SIMD.int8x16.select(m, t, f);
  t_.equal(1, SIMD.int8x16.extractLane(s, 0));
  t_.equal(2, SIMD.int8x16.extractLane(s, 1));
  t_.equal(3, SIMD.int8x16.extractLane(s, 2));
  t_.equal(4, SIMD.int8x16.extractLane(s, 3));
  t_.equal(5, SIMD.int8x16.extractLane(s, 4));
  t_.equal(6, SIMD.int8x16.extractLane(s, 5));
  t_.equal(7, SIMD.int8x16.extractLane(s, 6));
  t_.equal(8, SIMD.int8x16.extractLane(s, 7));
  t_.equal(25, SIMD.int8x16.extractLane(s, 8));
  t_.equal(26, SIMD.int8x16.extractLane(s, 9));
  t_.equal(27, SIMD.int8x16.extractLane(s, 10));
  t_.equal(28, SIMD.int8x16.extractLane(s, 11));
  t_.equal(29, SIMD.int8x16.extractLane(s, 12));
  t_.equal(30, SIMD.int8x16.extractLane(s, 13));
  t_.equal(31, SIMD.int8x16.extractLane(s, 14));
  t_.equal(32, SIMD.int8x16.extractLane(s, 15));
 t_.end();
});

test('int8x16 selectBits', function(t_) {
  var m = SIMD.int8x16(0xaaaaaaaa, 0xbbbbbbbb, 0xcccccccc, 0xdddddddd, 0xeeeeeeee, 0xffffffff, 0x00000000, 0x11111111,
                       0x22222222, 0x33333333, 0x44444444, 0x55555555, 0x66666666, 0x77777777, 0x88888888, 0x99999999);
  var t = SIMD.int8x16(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  var f = SIMD.int8x16(17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32);
  var s = SIMD.int8x16.selectBits(m, t, f);
  t_.equal(17, SIMD.int8x16.extractLane(s, 0));
  t_.equal(2, SIMD.int8x16.extractLane(s, 1));
  t_.equal(19, SIMD.int8x16.extractLane(s, 2));
  t_.equal(4, SIMD.int8x16.extractLane(s, 3));
  t_.equal(21, SIMD.int8x16.extractLane(s, 4));
  t_.equal(6, SIMD.int8x16.extractLane(s, 5));
  t_.equal(23, SIMD.int8x16.extractLane(s, 6));
  t_.equal(8, SIMD.int8x16.extractLane(s, 7));
  t_.equal(25, SIMD.int8x16.extractLane(s, 8));
  t_.equal(10, SIMD.int8x16.extractLane(s, 9));
  t_.equal(27, SIMD.int8x16.extractLane(s, 10));
  t_.equal(12, SIMD.int8x16.extractLane(s, 11));
  t_.equal(29, SIMD.int8x16.extractLane(s, 12));
  t_.equal(14, SIMD.int8x16.extractLane(s, 13));
  t_.equal(31, SIMD.int8x16.extractLane(s, 14));
  t_.equal(48, SIMD.int8x16.extractLane(s, 15));
 t_.end();
});

test('int8x16 fromFloat32x4Bits constructor', function(t_) {
  var m = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
  var n = SIMD.int8x16.fromFloat32x4Bits(m);
  t_.equal(0x00, SIMD.int8x16.extractLane(n, 0));
  t_.equal(0x00, SIMD.int8x16.extractLane(n, 1));
  t_.equal(-128, SIMD.int8x16.extractLane(n, 2));
  t_.equal(0x3f, SIMD.int8x16.extractLane(n, 3));
  t_.equal(0x00, SIMD.int8x16.extractLane(n, 4));
  t_.equal(0x00, SIMD.int8x16.extractLane(n, 5));
  t_.equal(0x00, SIMD.int8x16.extractLane(n, 6));
  t_.equal(0x40, SIMD.int8x16.extractLane(n, 7));
  t_.equal(0x00, SIMD.int8x16.extractLane(n, 8));
  t_.equal(0x00, SIMD.int8x16.extractLane(n, 9));
  t_.equal(0x40, SIMD.int8x16.extractLane(n, 10));
  t_.equal(0x40, SIMD.int8x16.extractLane(n, 11));
  t_.equal(0x00, SIMD.int8x16.extractLane(n, 12));
  t_.equal(0x00, SIMD.int8x16.extractLane(n, 13));
  t_.equal(-128, SIMD.int8x16.extractLane(n, 14));
  t_.equal(0x40, SIMD.int8x16.extractLane(n, 15));
 t_.end();
});

test('DataView.getFloat32x4', function(t_) {
  var a = new Float32Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setFloat32(i * 4, i);
  }
  for (var i = 0; i < a.length - 4; i++) {
    var f32x4 = v.getFloat32x4(i * 4);
    t_.equal(SIMD.float32x4.extractLane(f32x4, 0), v.getFloat32(i * 4));
    t_.equal(SIMD.float32x4.extractLane(f32x4, 1), v.getFloat32((i + 1) * 4));
    t_.equal(SIMD.float32x4.extractLane(f32x4, 2), v.getFloat32((i + 2) * 4));
    t_.equal(SIMD.float32x4.extractLane(f32x4, 3), v.getFloat32((i + 3) * 4));
  }
 t_.end();
});

test('DataView.getFloat32x4 with littleEndian as false', function(t_) {
  var a = new Float32Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setFloat32(i * 4, i, false);
  }
  for (var i = 0; i < a.length - 4; i++) {
    var f32x4 = v.getFloat32x4(i * 4, false);
    t_.equal(SIMD.float32x4.extractLane(f32x4, 0), v.getFloat32(i * 4, false));
    t_.equal(SIMD.float32x4.extractLane(f32x4, 1), v.getFloat32((i + 1) * 4, false));
    t_.equal(SIMD.float32x4.extractLane(f32x4, 2), v.getFloat32((i + 2) * 4, false));
    t_.equal(SIMD.float32x4.extractLane(f32x4, 3), v.getFloat32((i + 3) * 4, false));
  }
 t_.end();
});


test('DataView.getFloat32x4 with littleEndian as true', function(t_) {
  var a = new Float32Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setFloat32(i * 4, i, true);
  }
  for (var i = 0; i < a.length - 4; i++) {
    var f32x4 = v.getFloat32x4(i * 4, true);
    t_.equal(SIMD.float32x4.extractLane(f32x4, 0), v.getFloat32(i * 4, true));
    t_.equal(SIMD.float32x4.extractLane(f32x4, 1), v.getFloat32((i + 1) * 4, true));
    t_.equal(SIMD.float32x4.extractLane(f32x4, 2), v.getFloat32((i + 2) * 4, true));
    t_.equal(SIMD.float32x4.extractLane(f32x4, 3), v.getFloat32((i + 3) * 4, true));
  }
 t_.end();
});

test('DataView.getFloat32x4 exceptions', function(t_) {
  var a = new Float32Array(8);
  var v = new DataView(a.buffer);
  t_['throws'](function () {
    v.getFloat32x4(-1);
  });
  t_['throws'](function () {
    v.getFloat32x4(28);
  });
 t_.end();
});

test('DataView.getFloat64x2', function(t_) {
  var a = new Float64Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setFloat64(i * 8, i);
  }
  for (var i = 0; i < a.length - 2; i++) {
    var f32x4 = v.getFloat64x2(i * 8);
    t_.equal(SIMD.float64x2.extractLane(f32x4, 0), v.getFloat64(i * 8));
    t_.equal(SIMD.float64x2.extractLane(f32x4, 1), v.getFloat64((i + 1) * 8));
  }
 t_.end();
});

test('DataView.getFloat64x2 with littleEndian as false', function(t_) {
  var a = new Float64Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setFloat64(i * 8, i, false);
  }
  for (var i = 0; i < a.length - 2; i++) {
    var f32x4 = v.getFloat64x2(i * 8, false);
    t_.equal(SIMD.float64x2.extractLane(f32x4, 0), v.getFloat64(i * 8, false));
    t_.equal(SIMD.float64x2.extractLane(f32x4, 1), v.getFloat64((i + 1) * 8, false));
  }
 t_.end();
});


test('DataView.getFloat64x2 with littleEndian as true', function(t_) {
  var a = new Float64Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setFloat64(i * 8, i, true);
  }
  for (var i = 0; i < a.length - 2; i++) {
    var f32x4 = v.getFloat64x2(i * 8, true);
    t_.equal(SIMD.float64x2.extractLane(f32x4, 0), v.getFloat64(i * 8, true));
    t_.equal(SIMD.float64x2.extractLane(f32x4, 1), v.getFloat64((i + 1) * 8, true));
  }
 t_.end();
});

test('DataView.getFloat64x2 exceptions', function(t_) {
  var a = new Float64Array(8);
  var v = new DataView(a.buffer);
  t_['throws'](function () {
    v.getFloat64x2(-1);
  });
  t_['throws'](function () {
    v.getFloat64x2(60);
  });
 t_.end();
});

test('DataView.getInt32x4', function(t_) {
  var a = new Int32Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setInt32(i * 4, i);
  }
  for (var i = 0; i < a.length - 4; i++) {
    var f32x4 = v.getInt32x4(i * 4);
    t_.equal(SIMD.int32x4.extractLane(f32x4, 0), v.getInt32(i * 4));
    t_.equal(SIMD.int32x4.extractLane(f32x4, 1), v.getInt32((i + 1) * 4));
    t_.equal(SIMD.int32x4.extractLane(f32x4, 2), v.getInt32((i + 2) * 4));
    t_.equal(SIMD.int32x4.extractLane(f32x4, 3), v.getInt32((i + 3) * 4));
  }
 t_.end();
});

test('DataView.getInt32x4 with littleEndian as false', function(t_) {
  var a = new Int32Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setInt32(i * 4, i, false);
  }
  for (var i = 0; i < a.length - 4; i++) {
    var f32x4 = v.getInt32x4(i * 4, false);
    t_.equal(SIMD.int32x4.extractLane(f32x4, 0), v.getInt32(i * 4, false));
    t_.equal(SIMD.int32x4.extractLane(f32x4, 1), v.getInt32((i + 1) * 4, false));
    t_.equal(SIMD.int32x4.extractLane(f32x4, 2), v.getInt32((i + 2) * 4, false));
    t_.equal(SIMD.int32x4.extractLane(f32x4, 3), v.getInt32((i + 3) * 4, false));
  }
 t_.end();
});


test('DataView.getInt32x4 with littleEndian as true', function(t_) {
  var a = new Int32Array(8);
  var v = new DataView(a.buffer);
  for (var i = 0; i < a.length; i++) {
    v.setInt32(i * 4, i, true);
  }
  for (var i = 0; i < a.length - 4; i++) {
    var f32x4 = v.getInt32x4(i * 4, true);
    t_.equal(SIMD.int32x4.extractLane(f32x4, 0), v.getInt32(i * 4, true));
    t_.equal(SIMD.int32x4.extractLane(f32x4, 1), v.getInt32((i + 1) * 4, true));
    t_.equal(SIMD.int32x4.extractLane(f32x4, 2), v.getInt32((i + 2) * 4, true));
    t_.equal(SIMD.int32x4.extractLane(f32x4, 3), v.getInt32((i + 3) * 4, true));
  }
 t_.end();
});

test('DataView.getInt32x4 exceptions', function(t_) {
  var a = new Int32Array(8);
  var v = new DataView(a.buffer);
  t_['throws'](function () {
    v.getInt32x4(-1);
  });
  t_['throws'](function () {
    v.getInt32x4(28);
  });
 t_.end();
});

test('DataView.setFloat32x4', function(t_) {
  var a = new Float32Array(8);
  var b = new Float32Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setFloat32(i * 4, i);
  }
  for (var i = 0; i < b.length; i+=4) {
    v.setFloat32x4(i * 4, SIMD.float32x4(i, i+1, i+2, i+3));
  }
  for (var i = 0; i < a.length; i++) {
    t_.equal(u.getFloat32(i*4), v.getFloat32(i*4));

  }
 t_.end();
});

test('DataView.setFloat32x4 with littleEndian as false', function(t_) {
  var a = new Float32Array(8);
  var b = new Float32Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setFloat32(i * 4, i, false);
  }
  for (var i = 0; i < b.length; i+=4) {
    v.setFloat32x4(i * 4, SIMD.float32x4(i, i+1, i+2, i+3), false);
  }
  for (var i = 0; i < a.length; i++) {
    t_.equal(u.getFloat32(i*4, false), v.getFloat32(i*4, false));
  }
 t_.end();
});


test('DataView.setFloat32x4 with littleEndian as true', function(t_) {
  var a = new Float32Array(8);
  var b = new Float32Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setFloat32(i * 4, i, true);
  }
  for (var i = 0; i < b.length; i+=4) {
    v.setFloat32x4(i * 4, SIMD.float32x4(i, i+1, i+2, i+3), true);
  }
  for (var i = 0; i < a.length; i++) {
    t_.equal(u.getFloat32(i*4, true), v.getFloat32(i*4, true));
  }
 t_.end();
});

test('DataView.setFloat32x4 exceptions', function(t_) {
  var a = new Float32Array(8);
  var v = new DataView(a.buffer);
  var f4 = SIMD.float32x4(0, 1, 2, 3);
  var i4 = SIMD.int32x4(0, 1, 2, 3);
  t_['throws'](function () {
    v.setFloat32x4(-1, f4);
  });
  t_['throws'](function () {
    v.setFloat32x4(28, f4);
  });
  t_['throws'](function () {
    v.setFloat32x4(1, i4);
  });
 t_.end();
});

test('DataView.setFloat64x2', function(t_) {
  var a = new Float64Array(8);
  var b = new Float64Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setFloat64(i * 8, i);
  }
  for (var i = 0; i < b.length; i+=2) {
    v.setFloat64x2(i * 8, SIMD.float64x2(i, i+1));
  }
  for (var i = 0; i < a.length; i++) {
    t_.equal(u.getFloat64(i*8), v.getFloat64(i*8));

  }
 t_.end();
});

test('DataView.setFloat64x2 with littleEndian as false', function(t_) {
  var a = new Float64Array(8);
  var b = new Float64Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setFloat64(i * 8, i, false);
  }
  for (var i = 0; i < b.length; i+=2) {
    v.setFloat64x2(i * 8, SIMD.float64x2(i, i+1), false);
  }
  for (var i = 0; i < a.length; i++) {
    t_.equal(u.getFloat64(i*8, false), v.getFloat64(i*8, false));
  }
 t_.end();
});


test('DataView.setFloat64x2 with littleEndian as true', function(t_) {
  var a = new Float64Array(8);
  var b = new Float64Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setFloat64(i * 8, i, true);
  }
  for (var i = 0; i < b.length; i+=2) {
    v.setFloat64x2(i * 8, SIMD.float64x2(i, i+1), true);
  }
  for (var i = 0; i < a.length; i++) {
    t_.equal(u.getFloat64(i*8, true), v.getFloat64(i*8, true));
  }
 t_.end();
});

test('DataView.setFloat64x2 exceptions', function(t_) {
  var a = new Float64Array(8);
  var v = new DataView(a.buffer);
  var f2 = SIMD.float64x2(0, 1);
  var i4 = SIMD.int32x4(0, 1, 2, 3);
  t_['throws'](function () {
    v.setFloat64x2(-1, f2);
  });
  t_['throws'](function () {
    v.setFloat64x2(60, f2);
  });
  t_['throws'](function () {
    v.setFloat64x2(1, i4);
  });
 t_.end();
});

test('DataView.setInt32x4', function(t_) {
  var a = new Int32Array(8);
  var b = new Int32Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt32(i * 4, i);
  }
  for (var i = 0; i < b.length; i+=4) {
    v.setInt32x4(i * 4, SIMD.int32x4(i, i+1, i+2, i+3));
  }
  for (var i = 0; i < a.length; i++) {
    t_.equal(u.getInt32(i*4), v.getInt32(i*4));

  }
 t_.end();
});

test('DataView.setInt32x4 with littleEndian as false', function(t_) {
  var a = new Int32Array(8);
  var b = new Int32Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt32(i * 4, i, false);
  }
  for (var i = 0; i < b.length; i+=4) {
    v.setInt32x4(i * 4, SIMD.int32x4(i, i+1, i+2, i+3), false);
  }
  for (var i = 0; i < a.length; i++) {
    t_.equal(u.getInt32(i*4, false), v.getInt32(i*4, false));
  }
 t_.end();
});


test('DataView.setInt32x4 with littleEndian as true', function(t_) {
  var a = new Int32Array(8);
  var b = new Int32Array(8);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt32(i * 4, i, true);
  }
  for (var i = 0; i < b.length; i+=4) {
    v.setInt32x4(i * 4, SIMD.int32x4(i, i+1, i+2, i+3), true);
  }
  for (var i = 0; i < a.length; i++) {
    t_.equal(u.getInt32(i*4, true), v.getInt32(i*4, true));
  }
 t_.end();
});

test('DataView.setInt32x4 exceptions', function(t_) {
  var a = new Int32Array(8);
  var v = new DataView(a.buffer);
  var f4 = SIMD.float32x4(0, 1, 2, 3);
  var i4 = SIMD.int32x4(0, 1, 2, 3);
  t_['throws'](function () {
    v.setInt32x4(-1, i4);
  });
  t_['throws'](function () {
    v.setInt32x4(28, i4);
  });
  t_['throws'](function () {
    v.setInt32x4(1, f4);
  });
 t_.end();
});

test('DataView.setInt16x8', function(t_) {
  var a = new Int16Array(16);
  var b = new Int16Array(16);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt16(i * 2, i);
  }
  for (var i = 0; i < b.length; i+=8) {
    v.setInt16x8(i * 2, SIMD.int16x8(i, i+1, i+2, i+3, i+4, i+5, i+6, i+7));
  }
  for (var i = 0; i < a.length; i++) {
    t_.equal(u.getInt16(i*2), v.getInt16(i*2));
  }
 t_.end();
});

test('DataView.setInt16x8 with littleEndian as false', function(t_) {
  var a = new Int16Array(16);
  var b = new Int16Array(16);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt16(i * 2, i, false);
  }
  for (var i = 0; i < b.length; i+=8) {
    v.setInt16x8(i * 2, SIMD.int16x8(i, i+1, i+2, i+3, i+4, i+5, i+6, i+7), false);
  }
  for (var i = 0; i < a.length; i++) {
    t_.equal(u.getInt16(i*2, false), v.getInt16(i*2, false));
  }
 t_.end();
});


test('DataView.setInt16x8 with littleEndian as true', function(t_) {
  var a = new Int16Array(16);
  var b = new Int16Array(16);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt16(i * 2, i, true);
  }
  for (var i = 0; i < b.length; i+=8) {
    v.setInt16x8(i * 2, SIMD.int16x8(i, i+1, i+2, i+3, i+4, i+5, i+6, i+7), true);
  }
  for (var i = 0; i < a.length; i++) {
    t_.equal(u.getInt16(i*2, true), v.getInt16(i*2, true));
  }
 t_.end();
});

test('DataView.setInt16x8 exceptions', function(t_) {
  var a = new Int16Array(16);
  var v = new DataView(a.buffer);
  var f4 = SIMD.float32x4(0, 1, 2, 3);
  var i2 = SIMD.int16x8(0, 1, 2, 3, 4, 5, 6, 7);
  t_['throws'](function () {
    v.setInt16x8(-1, i2);
  });
  t_['throws'](function () {
    v.setInt16x8(28, i2);
  });
  t_['throws'](function () {
    v.setInt16x8(1, f4);
  });
 t_.end();
});

test('DataView.setInt8x16', function(t_) {
  var a = new Int8Array(32);
  var b = new Int8Array(32);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt8(i, i);
  }
  for (var i = 0; i < b.length; i+=16) {
    v.setInt8x16(i, SIMD.int8x16(i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9, i+10, i+11, i+12, i+13, i+14, i+15));
  }
  for (var i = 0; i < a.length; i++) {
    t_.equal(u.getInt8(i), v.getInt8(i));
  }
 t_.end();
});

test('DataView.setInt8x16 with littleEndian as false', function(t_) {
  var a = new Int8Array(32);
  var b = new Int8Array(32);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt8(i, i, false);
  }
  for (var i = 0; i < b.length; i+=16) {
    v.setInt8x16(i, SIMD.int8x16(i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9, i+10, i+11, i+12, i+13, i+14, i+15), false);
  }
  for (var i = 0; i < a.length; i++) {
    t_.equal(u.getInt8(i, false), v.getInt8(i, false));
  }
 t_.end();
});


test('DataView.setInt8x16 with littleEndian as true', function(t_) {
  var a = new Int8Array(32);
  var b = new Int8Array(32);
  var u = new DataView(a.buffer);
  var v = new DataView(b.buffer);
  for (var i = 0; i < a.length; i++) {
    u.setInt8(i, i, true);
  }
  for (var i = 0; i < b.length; i+=16) {
    v.setInt8x16(i, SIMD.int8x16(i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9, i+10, i+11, i+12, i+13, i+14, i+15), true);
  }
  for (var i = 0; i < a.length; i++) {
    t_.equal(u.getInt8(i, true), v.getInt8(i, true));
  }
 t_.end();
});

test('DataView.setInt8x16 exceptions', function(t_) {
  var a = new Int8Array(32);
  var v = new DataView(a.buffer);
  var f4 = SIMD.float32x4(0, 1, 2, 3);
  var i2 = SIMD.int8x16(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
  t_['throws'](function () {
    v.setInt8x16(-1, i2);
  });
  t_['throws'](function () {
    v.setInt8x16(28, i2);
  });
  t_['throws'](function () {
    v.setInt8x16(1, f4);
  });
 t_.end();
});
};
