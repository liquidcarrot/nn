
// id for connection
// ids for side a + wieght pairs
// ids for side b + weight pairs
// directed boolean
const uid = require("cuid");

/**
 * @param {Neuron|Neuron[]} a
 * @param {Neuron|Neuron[]} b
 * @param {number|number[]} [weight]
 * @param {boolean} [directed]
 */
function Connection(a, b, weight, directed) {
  /**
   * Fast ID Generation: https://www.npmjs.com/package/hyperid
   * Strong ID Generation: https://www.npmjs.com/package/cuid
   */
  this.id = uid(); // string
   
  this.a = a; // Neuron || Neuron[]
  this.b = b; // Neuron || Neruon[]
  
  this.weight = weight == undefined ? Math.random() * 2 - 1 : weight; // number || number[]
  this.directed = directed == undefined ? true : directed; // boolean
  
  this.toJSON = function() {}
  this.toCSV = function() {}
  this.toXML = function() {}
  this.toPath = function() {}
  
}

Connection.fromJSON = function() {}
Connection.fromCSV = function() {}
Connection.fromPath = function() {}
Connection.fromXML = function() {}

module.exports = Connection;