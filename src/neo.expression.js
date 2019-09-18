
/**
* @constructs Expression
*
* @param {string} [type]
* @param {number[]} [constants]
*
* @prop {Function} expression
* @prop {number[]} constants
* @prop {Function[]} partials
*
* @example
* const expression = new Expression(); // e.g. f(x) = w * x = 0.7 * x
*
* expression.solve(40); // e.g. f(40) = 0.7 * 40 = 28
*
* expression.partials(40); // e.g. [x', w'][28,40]
*/
function Expression(type, constants) {
  type = type || "LINEAR";

  // A single variable JS function of a math expression (e.g. `f(x)` => `function(x) {...}`)
  this.expression = Expression.Types[type].expression;
  // An array of constants used by expression
  this.constants = constants || Expression.Types[type].constants();
  // An array of partial derivatives w.r.t. to the `x` in `f(x)` and the constants therein
  this.partials = Expression.Type[type].partials;

  /**
  * Solves for `x` using `this.expression` using `this.constants`
  *
  * @param {number} x
  *
  * @returns {number}
  *
  * @example
  * const expression = new Expression("LINEAR", [0.6]); // f(x) = w * x = 0.6 * x
  *
  * expression.solve(10); // 6
  */
  this.solve = function(x) {
    return this.expression(x, ...this.constants);
  }

  /**
  * Solves for the partial derivative of every constant in `f(x)` and `x` and
  * returns `f'(x)` w.r.t. each constant in the expression and `x`
  *
  * @param {number} x
  *
  * @returns {number}
  *
  * @example
  * const expression = new Expression("LINEAR", [0.3]); // f(x) = w * x = 0.3 * x
  *
  * expression.partials(0.9); // [0.3, 0.9] === [x', w']
  */
  this.partials = function(x) {
    const self = this;
    const partials = []; // [x', ...constants']

    for(let p = 0; p < partials.length; p++) {
      partials.push(this.partials[p](x, ...self.constants));
    }

    return partials;
  }
}


/**
* @typedef {Object} ExpressionType
* @prop {Function} expression
* @prop {Function} constants
* @prop {Function} partials
*/

/**
* @type {Object.<string, ExpressionType>}
*/
Expression.Types = {};
Expression.Types.LINEAR = {
  expression: function(x, w) {
    return w * x;
  },
  constants: function() { // Should be called on definition
    return [Math.random() * 2 - 1];
  },
  partials: function() { // Should be called on definition using the values created from constants
    return [function(x, ...constants) {
      // w
      return constants[0] // x is always the first partial
    }, function(x, ...constants) {
      // x
      return x;
    }]
  }
};
Expression.Types.SINUSOIDAL = {
  expression: function(x, a, b, c) {
    return a * Math.sin(b * x - c);
  },
  contants: function() {
    return [
      Math.random() * 2 - 1, // Range: (-1, 1)
      Math.random() * Math.PI * 2, // Range: (0, 2PI)
      Math.PI * (Math.random() * 4 - 2) // Range: (-2PI, 2PI)
    ]
  },
  // x is always the first partial
  // Partials: [x, a, b, c]
  partials: function() {
    return [function(x, ...constants) {
      // x = a * b * cos(c - b * x)
      return constants[0] * constants[1] * Math.cos(constants[2] - constants[1] * x);
    }, function(x, ...constants) {
      // a = -sin(c - b * x)
      return -Math.sin(constants[2] - constants[1] * x);
    }, function(x, ...constants) {
      // b = a * x * cos(c - b * x)
      return constants[0] * x * cos(constants[2] - constants[1] * x);
    }, function(x, ...constants) {
      // c = -a * cos(c - b * x)
      return -constants[0] * Math.cos(constants[2] - constants[1] * x);
    }]
  }
}

module.exports = Expression;
