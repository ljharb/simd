module.exports = function preserve(object, property, callback) {
	return function preserved() {
		var original = object[property];
		try {
			return callback.apply(this, arguments);
		} finally {
			object[property] = original;
		}
	};
};
