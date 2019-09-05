// const uid = require("cuid");
const Group = require("./group");
const vis = require("vis");

/**
 * Each `Network` is a collective of neurons functioning as an individual and indepent agent (brain).
 *
 * @constructs Network
 *
 * @param {number[]} sizes
 * @param {number[]} [biases]
 * @param {Array.<number[]>} [weights]
 *
 * @prop {string} id
 * @prop {Group[]} groups
 *
 * @example
 * const { Network } = require("@liquid-carrot/nn");
 *
 * const network = new Network([2,2,1]);
 *
 * network.activate([0,1]);
 * network.propagate([1]);
 */
function Network(sizes, biases, weights) {
  let self = this;

  this.id = uid();
  this.neurons = [];
  this.connections = [];

  this.groups = sizes == undefined ? [] : sizes.map(function(size, index) {
    if(biases == undefined) return new Group(size);
    else return new Group(size, biases[index]);
  });

  // Connects neurons
  this.groups.slice(0, this.groups.length - 1).forEach(function(group, index) {
    if(weights) group.connect(self.groups[index + 1], weights[index]);
    else group.connect(self.groups[index + 1]);
  });

  //================================================
  // CORE FUNCTIONS ================================
  //================================================
  /**
   * Activates network
   *
   * @param {number[]} inputs
   *
   * @returns {number[]}
   */
  this.activate = function(inputs) {
    const outputs = this.groups.map(function(group, index) {
      if(index === 0) return group.activate(inputs);
      else return group.activate();
    })

    return outputs[outputs.length - 1];
  }

  /**
   * Calculates error & updates network weights
   *
   * @param {number[]} targets
   *
   * @returns {number} Returns Mean-Squared Error (MSE)
   */
  this.propagate= function(targets) {
    // MSE Cost
    const error = this.groups[this.groups.length - 1].neurons.map(function(neuron, index) {
      return 0.5 * Math.pow(targets[index] - neuron.output, 2);
    }).reduce((a,b) => a + b);

    // Propagate error & update weights
    this.groups.reverse().forEach(function(group, index) {
      if(index === 0) group.propagate(targets);
      else return group.propagate();
    }); this.groups.reverse();

    return error;
  }
  //================================================
  // END CORE FUNCTIONS ============================
  //================================================

  //================================================
  // UTILITY FUNCTIONS =============================
  //================================================

  this.toJSON = function() {
    const neurons = this.neurons.map(function(neuron) {
      return neuron.toJSON();
    });
    const connections = this.connections.map(function(connection) {
      return connection.toJSON();
    });
    return { neurons, connections }
  }

  /**
  * **BROWSER ONLY**
  */
  this.toGraph = function(element) {
    const { neurons, connections } = this.toJSON();

    const nodes = new vis.DataSet(neurons.map(function(neuron) {
      neuron.label = `${neuron.id}`;
      neuron.color = neuron.type === "input" ? "gray" : neuron.type === "output" ? "lime" : "orange"; // "input" || "output" || "hidden"
      return neuron;
    }));
    const edges = new vis.DataSet(connections.map(function(connection) {
      connection.arrows = "to";
      return connection;
    }));

    // DOM id
    if(typeof div === "string") div = document.getElementById(div);

    return new vis.Network(div, { nodes, edges }, {});
  }
  //Code here...

  //================================================
  // END UTILITY FUNCTIONS =========================
  //================================================
}

Network.networks = 0;
Network.uid = function() {
  return ++Network.networks;
}

module.exports = Network;
