// Tests the fastest methods for calculating generalized sinusoidal functions
// In other words every single function/benchmark below is performing the
// following operation, given some constants:
//
// f(x) = A * sin(B * x - C) + D
//
// Where A,B,C, and D are defined in a global variable `scope`
const { Suite } = require("benchmark");
const math = require("mathjs");
const { Parser } = require("expr-eval");
const Expression = new Parser();

const suite = new Suite();

// UTILITIES
const random = () => {
  const number = Math.random() * Number.MAX_SAFE_INTEGER;
  const sign = Math.random() > 0.5 ? 1 : -1;
  return sign * number;
}

// GLOBALS
const numbers = Array.from({ length: 1000}, random);
const A = random();
const B = random();
const C = random();
const D = random();

// BENCHMARKS
{
  // NATIVE
  function native(X) {
    return A * Math.sin(B * X - C) + D;
  }

  // MATHJS
  const fx = math.compile("A * sin(B * X - C) + D");
  const scope = { A, B, C, D };
  function mathjs(X) {
    scope.X = X;
    return fx.evaluate(scope);
  }

  // WEIRD
  function weird(X) {
    scope.X = X;
    return scope.A * Math.sin(scope.B * scope.X - scope.C) + scope.D;
  }

  // EXPRESSION EVALUATOR
  const expression = Expression.parse("A * sin(B * X - C) + D").simplify(scope);
  // let _expression = Expression.parse("A * sin(B * X - C) + D");
  const exp = expression.toJSFunction("X");

  suite.add("Native", function() {
    for(let n = 0; n < numbers.length; n++) {
      native(numbers[n]);
    }
  }).add("Math.js", function() {
    for(let n = 0; n < numbers.length; n++) {
      mathjs(numbers[n]);
    }
  }).add("Weird", function() {
    for(let n = 0; n < numbers.length; n++) {
      weird(numbers[n]);
    }
  }).add("Expression Parser: Native", function() {
    for(let n = 0; n < numbers.length; n++) {
      exp(numbers[n]);
    }
  }).add("Expression Parser: Embedded", function() {
    for(let n = 0; n < numbers.length; n++) {
      expression.evaluate({ X: numbers[n] });
    }
  }).add("Expression Parser: Native - Extended", function() {
    let A = random();
    let B = random();
    let C = random();
    let D = random();
    let scope = { A, B, C, D };
    let expression = Expression.parse("A * sin(B * X - C) + D").simplify(scope);
    let exp = expression.toJSFunction("X");

    for(let n = 0; n < numbers.length; n++) {
      exp(numbers[n]);

      A = random();
      B = random();
      C = random();
      D = random();
      scope = { A, B, C, D };
      expression = Expression.parse("A * sin(B * X - C) + D").simplify(scope);
      exp = expression.toJSFunction("X");
    }
  }).add("Expression Parser: Embedded - Extended", function() {
    let A = random();
    let B = random();
    let C = random();
    let D = random();
    let scope = { A, B, C, D };
    let expression = Expression.parse("A * sin(B * X - C) + D").simplify(scope);

    for(let n = 0; n < numbers.length; n++) {
      expression.evaluate({ X: numbers[n] });

      A = random();
      B = random();
      C = random();
      D = random();
      scope = { A, B, C, D };
      expression = Expression.parse("A * sin(B * X - C) + D").simplify(scope);
    }
  }).on("cycle", function(event) {
    console.log(String(event.target));
  }).on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  }).run();
}

//==============================================================================

// In the benchmarks above we established that `expr-eval` is a notably faster
// mathematical expression parsing library than `mathjs`. However, `mathjs` has
// a more comprehensive feature set. One keystone feature required for our
// mathematics library is the ability to generate a derivative function in the
// form of a `String` from a mathematical expression.
//
// Below is a test of us trying to merge the functionality of `mathjs`'s
// derivative function and `expr-eval`'s toJSFunction function.

// function Term(x, dx) {
//   this.value = x;
//   this.derivative = dx;
// }

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

// TESTS
// {
//   const expression = "A * sin(B * x - C) + D";
//   const scope = {
//     A: random(),
//     B: random(),
//     C: random(),
//     D: random()
//   }
//   const mfunction = math.compile(expression);
//   const efunction = Expression.parse(expression);
//
//   console.log(`Expression: ${expression}`);
//   console.log(`Scope: ${JSON.stringify(scope, null, 2)}`);
//   console.log();
//   // console.log(mfunction);
//   // console.log(efunction);
//   console.log(math.derivative(expression, "x").toString());
//
//   const _x = Expression.parse(math.derivative(expression, "x").toString()).simplify(scope);
//   const f_x = _x.toJSFunction("x");
//
//   console.log(f_x.toString());
//   console.log(f_x(1000));
// }
