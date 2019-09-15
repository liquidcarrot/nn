const _ = require("./_");
const Math = require("mathjs");
const { Parser } = require("expr-eval");
const Expression = new Parser();

function Connection(from, to, options={}) {
  this.id = Connection.uid(from, to);

  this.from = from;
  this.to = to;

  this.type = options.type || "LINEAR"; // "SINUSOIDAL", "LOGISTIC", "LINEAR"

  this._expression = options._expression || Connection.expressions.LINEAR._expression;
  // this._coefficients = options.coefficients || Connection.expressions.LINEAR._coefficients;
  this.coefficients = options.coefficients || Connection.expressions.LINEAR.coefficients();
  this.expression = options.expression || Connection.expressions.LINEAR.expression();
  this.partials = options.partials || Connection.expressions.LINEAR.partials();

  this.activate = function(x) {
    return this.expression(x);
  }
  this.propagate = function(x, options) {
    const self = this;

    // Create a copy of `expression` `coefficients`
    const coefficients = { ...this.coefficients };

    // Update each `coefficient` using its partial derivate w.r.t. a value, the
    // accumulated error w.r.t. the connection, and the learning rate
    // (potentially determined by a policy);
    Object.keys(coefficients).forEach(function(key) {
      // _C = C - R * E * C'
      coefficients[key] = coefficients[key] - rate * error * self.partials[key](x, self.coefficients);
    });

    // Store the new coefficients in the network
    this.coefficients = { ...coefficients };
  }

  this.toJSON = function() {
    return {
      id: this.id,
      from: this.from.id,
      to: this.to.id,
      expression: this.expression, // .toString() ...?
      // Once we figure out how to parse variables out of the expression, we will
      // not need to have coefficients any more
      coefficients: {
        ...this.coefficients
      }
    }
  }
}

Connection.expressions = {
  // w * x
  LINEAR: {
    _expression: "w * x",
    _coefficients: [{
      variable: "w",
      range: [-1,1]
    }],
    expression: function(coefficients) {
      // A quicker reference to the expression
      const expression = Connection.expressions.LINEAR._expression;

      return Expression.parse(expression).toJSFunction("x", coefficients)
    },
    coefficients: function() {
      // Uses the outline/description of coefficients for this expression
      // to randomly create new coefficients for this expression. In other words,
      // this maps through every object in the
      // `Connections.expressions.LINEAR._coefficients` array, and it maps the
      // objects from `{ variable: String, range: Number[]}` to
      // `{ [String]: Number }`.
      const coefficients = Connection.expressions.LINEAR._coefficients.map(function(coefficient) {
        const _coefficient = {};
        _coefficient[coefficient.variable] = _.random(...coefficient.range);
        return _coefficient;
      });
      // [{ a: 1}, {b: 2}]

      // This assumes that `coefficients` has been mapped to an array of
      // `{ [String]: Number }` objects.
      return Object.assign({}, ...coefficients);
      // { a: 1, b: 2 }
    },
    // Creates an object similar to `coefficients()` but whose values are the
    // partial derivatives of each coefficient in `_coefficient` for `_expression`.
    // For simplification, it originally takes in a `Coefficients` object used
    // used to simplify the partial derivatives.
    partials: function(coefficients) {
      // A quicker reference to the expression
      const expression = Connection.expressions.LINEAR._expression;

      // Uses the outline/description of coefficients for this expression and
      // `mathjs`'s `.derivative()` function to a) generate partial derivatives to
      // every coefficient in `_expression`, b) convert those partials into
      // mathematical expressions interpretable by `expr-eval`, and c) exports
      // a JavaScript of each partial derivative. The created partials array
      // should have objects look similar to
      // `{ [String]: [Function: function()] }`
      const partials = Connection.expressions.LINEAR._coefficients.map(function(coefficient) {
        const partial = {};
        const derivate = math.derivative(expression, coefficient.variable).toString();
        partial[coefficient.variable] = Expression.parse(derivative).toJSFunction("x", coefficients);
        return partial;
      });

      // Concats every individual partial into a master object containing each
      // partial derivative function as values to the keys which mimic the
      // the variable name of `_coefficients`
      return Object.assign({}, ...partials);
    }
  },
  // a * sin(b * x - c) + d
  SINUSOIDAL: {},
  LOGSTIC: {}
}

Connection.uid = function(from, to) {
  return _.cantor(from.id, to.id);
}

/**
* Used to describe the variables in an `Expression`
* @typedef Coefficient
* @prop variable
* @prop partialDerivative
* @prop min
* @prop max
*/

/**
* Mathematical expression that can be prased by, both, `mathjs` & `expr-eval`
* @typedef {string} Expression
*/

/**
* A Cantor Pairing ID used in `Connections`; generated from the ID of that
* connection's endpoint's IDs.
* @typedef {CantorID} id
*/

/**
* @typedef Connection
* @prop {CantorID} id
* @prop {Neuron} from
* @prop {Neuron} to
* @prop {Expression} expression
* @prop {Coefficient[]} coefficients
* @prop {Function} activate
* @prop {Function} propagate
*/
