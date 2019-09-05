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

module.exports = _;
