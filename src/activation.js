/**
 * @typedef SquashFunction
 *
 * @param {number} input
 * @param {number} [depth=0]
 */
 const activations = new Map();
 
 /**
  * @see {@link https://towardsdatascience.com/activation-functions-neural-networks-1cbd9f8d91d6#9dcb|Activation Functions}
  * @see {@link https://en.wikipedia.org/wiki/Sigmoid_function|Sigmoid Function}
  */
 function SIGMOID(input, depth=0) {
   const sigmoid = 1 / (1 + Math.exp(-input));
   if(depth === 0) return sigmoid;
   else return sigmoid * (1 - sigmoid);
 }
 
 
 activations["SIGMOID"] = SIGMOID;
 activations["sigmoid"] = SIGMOID;
 activations["LOGISTIC"] = SIGMOID;
 activations["logistic"] = SIGMOID;
 
 module.exports = activations;