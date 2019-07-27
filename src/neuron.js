const uid = require("cuid");

/**
 *
 * @constructs Neuron
 *
 * @prop {string} id Unique neuron ID
 * @prop {number} bias Neuron's signaling bias
 * @prop {Object} incoming.connections Incoming connection(s) - `{ "[ID]": connection }`
 * @prop {Object} incoming.weights Incoming weight(s) - `{ "[ID]": weight }`
 * @prop {Object} incoming.neurons Incoming neurons(s) - `{ "[ID]": neuron }`
 * @prop {Object} outgoing.connections Outgoing connection(s) - `{ "[ID]": connection }`
 * @prop {Object} outgoing.weights Outgoing weight(s) - `{ "[ID]": weight }`
 * @prop {Object} outgoing.neurons Outgoing neurons(s) - `{ "[ID]": neuron }`
 *
 * @param {number} [bias] Neuron's signaling bias
 * @param {Object} [options]
 *
 * @example
 * const neuron = new Neuron(); // Neuron { bias }
 *
 * const neuron = new Neuron(0.2); // Neuron { bias: 0.2 }
 */
function Neuron(bias, options) {
  this.id = uid();
  this.bias = bias == undefined ? Math.random() * 2 - 1 : bias;
  this.incoming = {
    connections: {},
    weights: {},
    neurons: {}
  }
  this.outgoing = {
    connections: {},
    weights: {},
    neurons: {}
  }
  
  /**
   * Can bi-directionally fire a neuron
   *
   * @param {number} input
   * @param {boolean} [options.forward=true] Iff `!options.forward`, neuron will fire backward (i.e. backpropagate)
   * @param {boolean} [options.update=true] Iff `!options.forward && options.update`, neuron will update connection weights
   *
   * @returns {number|Feedback|Output} Returns a number or a Feedback or Output Object
   */
  this.fire = function(input, options) {
    
  }
  
  /**
   * Updates neuron's weights
   *
   * @param {string|string[]} [connection_id] Connection ID(s)
   * @param {number|number[]} [new_weights] New weight(s)
   * @param {boolean} [options.delta] Iff `options.delta`, `neuron.update()` will return the difference (i.e. delta) between the previous and current weight(s)
   *
   * @returns {number[]} Returns an array of weights or weight deltas
   */
  this.update = function(connection_ids, new_weights, options) {
    
  }
}

module.exports = Neuron;