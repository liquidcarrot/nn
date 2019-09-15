const _ = function() {}

/**
* Clamping (coined by Christian Echevarria) is used to reffer
* to bounding JavaScript values to real numbers when they run
* off towards `Infinity`.
*
* @param {number} x
*
* @returns {number}
*
* @example
* _.clamp(Infinity) // => 1.7976931348623157e+308
* _.clamp(-infinity) // => -1.7976931348623157e+308
* _.clamp(0) // => 0
* _.clamp(3.14159) // => 3.14159
*/
_.clamp = function(x) {
  return x === Infinity ? Number.MAX_VALUE : x === -Infinity ? -Number.MAX_VALUE : x;
}

/**
* The _Cantor Pairing Algorithm_ us to a) mathematically, map any two
* non-negative integers to a unique positive integer - it even is sensetive to
* order (i.e. `_.cantor([2,3]) !== _.cantor([3,2])`), and b) "AI-ly"
* it allows us to keep track of unique structural connections across time as a
* neural network mutates (i.e. changes "shape").
*
* In neural networks, Cantor Pairing allows us to create a unique structural ID
* for connections between two neurons.
*
* @param {number} a - Integer ID of _source_ neuron
* @param {number} b - Integer ID of _destination_ neuron
*
* @returns {number} A unique integer ID created using the [Cantor Pairing Algorithm](https://en.wikipedia.org/wiki/Pairing_function)
*/
_.cantor = function(a, b) {
  return 0.5 * (a + b) * (a + b + 1) + b;
}

/**
* If `strict === true`, `_.isNumber()` will return `true` iff `x` is a finite
* number in the [-Number.MAX_VALUE, Number.MAX_VALUE] range.
*
* If `strict === false`, `_.isNumber()` will also return `true` when
* `x === Infinity` or `x === -Infinity`.
*
* @param {number} x
* @param {boolean} [strict=true]
*
* @returns {boolean}
*/
_.isNumber = function(x, strict=true) {
  const finite = Number.isFinite(x);
  return strict ? finite : (finite || x === Infinity || x === -Infinity);
}

/**
* Creates a random integer in the given range.
*
* Iff no `min` is provided, the return range will be assumed to be [0, `max`].
*
* Iff no `min` or `max` is provided, the return range will be assumed to be [0, Number.MAX_SAFE_INTEGER].
*
* @param {number} [min=0]
* @param {number} [max=Number.MAX_SAFE_INTEGER]
*
* @returns {number}
*/
_.random = function(min, max) {
  if(max == undefined && _.isNumber(min)) {
    max = min; min = 0;
  }

  max = _.clamp(max) || Number.MAX_SAFE_INTEGER;
  min = _.clamp(min) || 0;

  return _.clamp(min + Math.random() * (max - min));
}

module.exports = _;
