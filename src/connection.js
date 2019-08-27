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
 * const connection = new Connection(neuron, other) // Connection { a: neuron, b: other }
 *
 * const connection = new Connection(neuron, other, 0.3) // Connection { a: neuron, b: other, weight: 0.3 }
 */
function Connection(a, b, weight, options) {
  this.id = uid();
  this.a = a;
  this.b = b;
  this.weight = weight == undefined ? Math.random() * 2 - 1 : weight;
  this.queue = {
    forward: [],
    backward: []
  }
  this.stream = {
    forward: undefined,
    backward: undefined
  }
  
  this.push = function(payload, forward=true) {
    if(forward) this.queue.forward.unshift(payload);
    else this.queue.backward.unshift(payload)
  }
  this.pull = function(forward=false) {
    if(forward) return this.queue.forward.shift(payload);
    else return this.queue.backward.shift(payload);
  }
}

module.exports = Connection;