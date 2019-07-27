const uid = require("cuid");

/**
 *
 * @constructs Connection
 *
 * @prop {string} id Unique connection ID
 * @prop {Neuron|Neuron[]} a Side "A" of connection(s)
 * @prop {Neuron|Neuron[]} b Side "B" of connection(s)
 * @prop {number|number[]} [weight] Weight of connection(s)
 *
 * @param {Neuron|Neuron[]} a Neuron(s) on one edge of the connection
 * @param {Neuron|Neuron[]} b Neruon(s) on another edge of the connection
 * @param {number|number[]} [weight] Weight of connection(s)
 * @param {Object} [options]
 *
 * @example
 * const connection = new Connection(neuron, other) // Connection {}
 *
 * const connection = new Connection(neuron, other, 0.3) // Connection {}
 */
function Connection(a, b, weight, options) {
  this.id = uid();
  this.a = a;
  this.b = b;
  this.weight = weight == undefined ? Math.random() * 2 - 1 : weight;
}

module.exports = Connection;