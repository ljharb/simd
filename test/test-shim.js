require('es5-shim');
require('es6-shim');

var define = require('define-properties');
var getGlobal = require('../getGlobal');
var TA = require('typedarray');

define(getGlobal(), TA);
