// const uid = require("cuid");

/**
 * Connections help:
 *     * a) control the flow information inside of a neural network
 *     * b) describe the shape of a neural network
 *     * c) ease the use of Evolutionary Algoriths
 *
 * To facilitate the use of Evolutionary Algoriths, Connections are given Unique
 * _Temporal-Structural IDs_ using the [Cantor Pairing Algorithm](https://en.wikipedia.org/wiki/Pairing_function).
 *
 * _Temporal-Structural IDs_: are not only a method of uniquely identifying a
 * connection, they also allow us to identify a) where in the network the
 * connection exists (i.e. between what neurons), and b) when it was
 * "created-ish".
 *
 * Connection IDs created using the _Cantor Pairing Algorithm_ enable stronger
 * algorithms, i.e. NEAT/HyperNEAT, to create networks of arbitrary
 * sizes/shapes.
 *
 * @constructs Connection
 *
 * @prop {string} id Unique connection ID
 * @prop {Neuron|Group} a Side "A" of connection(s)
 * @prop {Neuron|Group} b Side "B" of connection(s)
 * @prop {number|number[]} [weight] Weight of connection(s)
 *
 * @param {Neuron|Group} a Neuron(s) on one edge of the connection
 * @param {Neuron|Group} b Neruon(s) on another edge of the connection
 * @param {number|number[]} [weight] Weight of connection(s)
 * @param {Object} [options]
 *
 * @example
 * const connection = new Connection(neuron, other) // Connection { a: neuron, b: other }
 *
 * const connection = new Connection(neuron, other, 0.3) // Connection { a: neuron, b: other, weight: 0.3 }
 */
function Connection(from, to, weight, options) {
  this.id = Connection.uid(from.id, to.id);
  this.from = from;
  this.to = to;
  this.weight = weight == undefined ? Math.random() * 2 - 1 : weight;


  //================================================
  // UTILITY FUNCTIONS =============================
  //================================================
  this.toJSON = function() {
    return {
      id: this.id,
      from: this.from.id,
      to: this.to.id,
      weight: this.weight
    }
  }

  //================================================
  // EXPERIMENTAL ==================================
  //================================================
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
  //================================================
  // END EXPERIMENTAL ==============================
  //================================================
}

/**
* Creates a unique structural ID for connection between two neurons using the
* [Cantor Pairing Algorithm](https://en.wikipedia.org/wiki/Pairing_function).
*
* The _Cantor Pairing Algorithm_ us to a) mathematically, map any two
* non-negative integers to a unique positive integer - it even is sensetive to
* order (i.e. `Connection.uid([2,3]) !== Connection.uid([3,2])`), and b) "AI-ly"
* it allows to keep track of unique structural connections across time as a
* neural network mutates (i.e. changes "shape").
*
* @param {number} fromID - ID of _source_ neuron
* @param {number} toID - ID of _destination_ neuron
*
* @returns {number} A unique integer ID created using the [Cantor Pairing Algorithm](https://en.wikipedia.org/wiki/Pairing_function)
*/
Connection.uid = function(fromID, toID) {
  return 0.5 * (fromID + toID) * (fromID + toID + 1) + toID;
}

module.exports = Connection;
