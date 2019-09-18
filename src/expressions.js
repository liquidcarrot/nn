const _ = require("./_");

/**
* @typedef {{value: number, optimizer: Expression}} Constant
*/

/**
* Mathematical expression that can be prased by, both, `mathjs` & `expr-eval`
* @typedef {Object} Expression
* @prop {string} name
* @prop {string} definition
* @prop {Object.<string, Constant>} constants
*/

/**
* @typedef {number[]} ConstantRange
*/

/**
* A  list of generalized functions as mathematical expression that can be parsed
* by, both, `mathjs` & `expr-eval`.
*
* @todo Create map to/from each generalized function such that when an object using them is mutated to/from a pair of generalized functions, the newly adopted function closely approximates the deprecated one - i.e. best fit line/curve
*
* @typedef {Object} ExpressionDefinition
* @prop {string} expression - A mathematical expression
* @prop {Object.<string, ConstantRange>}  constants - An object of key-value pairs where the keys are the variable names (i.e. constants) in the `expression` and the values are the numerical ranges which those constants can be initially set to.
*/
const EXPRESSIONS = {
  LINEAR: {
    expression: "a * x + b",
    constants: {
      a: [-1, 1], // Range: (-1, 1)
      b: [-1, 1] // Range: (-1, 1)
    }
  },
  SINUSOIDAL: {
    expression: "a * sin(b * x - c) + d",
    constants: {
      a: [-1, 1], // Range: (-1, 1)
      b: [0, Math.PI], // Range: (0, PI)
      c: [-Math.PI, Math.PI], // Range: (-PI, PI)
      d: [-1, 1] // Range: (-1, 1)
    }
  },
  LOGISTIC: {
    expression: "a / (1 + E^(b * (x - c)))^(d) + f",
    constants: {
      a: [0, 2], // Range: (0, 2)
      b: [-1 0], // Range: (-1, 0)
      c: [-1, 1], // Range: (-1, 1)
      d: [-1, 1], // Range: (-1, 1)
      f: [-1, 0] // Range: (-1, 0)
    }
  }
}

module.exports = EXPRESSIONS;

const ex = function() {
  // State/Data
  this.definition = "";
  this.expression = function() {};
  this.constants = []; // Function[]
  this.partials = []; // Function[]
  this.optimizers = []; // Function[]|string

  // API

  /**
  * Returns f(x) given constants
  *
  *
  */
  this.solve = function(x[, constants]) {
    this.expression(x)
  };
  this.partial = function(constant, x[, constants]) {}; // Returns f'(x) w.r.t contant given constants
  this.update = function(constant, x) {} // Sets constant to x and updates expression and definition
  this.updateAll = function(constants, X) {} // Sets constants to X and updates expression and definition
}

/**
* @param {string} [expression] - An expression name (e.g. "LINEAR", "SINUSOIDAL", or "LOGISTIC") or Object (see `Expression` Object examples); _if no expression Object/name is provided one will be randomly chosen_
*
* @returns {Object} Returns an Expression instance - as opposed to an Expression definition in `EXPRESSIONS`.
*/
module.exports.get = function(expression) {
  // Randomly chooses an expression if one is not provided
  if(expression == undefined) {
    const keys = Object.keys(EXPRESSIONS);
    expression = keys[Math.floor(Math.random() * keys.length)]
  }

  // Converts the expression names (if given or randomly chosen above) into an `Expression` Object defined in `EXPRESSIONS`
  if(typeof expression === "string") {
    try {
      expression = EXPRESSIONS[expression];
    } catch(e) {
      throw new Error(e);
    }
  }

  // Instance of an `Expression`
  const instance = {
    expression: {},
    coefficients: {},
    partials: {}
  };

  for(let  = 0, ; )
}
