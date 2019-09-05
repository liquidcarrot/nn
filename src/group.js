// const uid = require("cuid");
const Neuron = require("./neuron");

/**
 * A `Group` is an abstraction of `Neuron` and a tool for creating and manipulating a group of neurons - with `Group` we can create neural network layers and and build networks faster than neuron-by-neuron construction.
 *
 * @constructs Group
 *
 * @param {number} [size]
 * @param {number} [bias]
 *
 * @prop {string} id
 * @prop {Neuron[]} neurons
 */
function Group(size, bias) {
  // this.id = uid();

  this.neurons = size == undefined ? [] : Array.from({ length: size }, function() {
    return new Neuron(bias);
  });

  //================================================
  // CORE FUNCTIONS ================================
  //================================================
  /**
   * @param {Group} target
   * @param {number[]} [weights]
   *
   * @example
   * //===============================================
   * // 2x2 (No Weights) =============================
   * //===============================================
   * const { Group } = require("@liquidcarrot/nn")
   *
   * const group = new Group(2);
   * const other = new Group(2);
   *
   * group.connect(other);
   *
   * //===============================================
   * // 2x2 (Weights) =============================
   * //===============================================
   * const { Group } = require("@liquidcarrot/nn")
   *
   * const group = new Group(2);
   * const other = new Group(2);
   *
   * // group[0] -- weights[0] --> other[0]
   * // group[0] -- weights[1] --> other[1]
   * // group[1] -- weights[2] --> other[0]
   * // group[1] -- weights[3] --> other[1]
   * group.connect(other, [0.1, 0.2, 0.3, 0.4]);
   */
  this.connect = function(target, weights) {
    const self = this;

    this.neurons.forEach(function(neuron, a) {
      target.neurons.forEach(function(other, b) {
        if(weights) neuron.connect(other, weights[self.neurons.length * a + b]);
        else neuron.connect(other);
      })
    })
  }

  /**
   * @param {number[]} [inputs]
   *
   * @returns {number[]}
   *
   * @example
   * //===============================================
   * // One Group (No Hidden Layers) =================
   * //===============================================
   * const { Group } = require("@liquidcarrot/nn")
   *
   * const group = new Group(2);
   *
   * neuron.activate([0, 0]); // [0, 0]
   *
   * //===============================================
   * // Three Groups (Hidden Layers) =================
   * //===============================================
   * const { Group } = require("@liquidcarrot/nn")
   *
   * const input = new Group(2); // Input Neuron (Layer)
   * const hidden = new Group(2,0.1); // Hidden Neuron (Layer)
   * const output = new Group(2,0.15); // Output Neuron (Layer)
   *
   * input.connect(hidden, [0.2,0.25,0.3,0.35]); // Connects input layer to hidden layer
   * hidden.connect(output, [0.4,0.45,0.5,0.55]); // Connects hidden layer to output layer
   *
   * input.activate([0,0]); // [0,0]
   * hidden.activate(); // [0.###, 0.###]
   * output.activate(); // [0.###, 0.###]
   *
   */
  this.activate = function(inputs) {
    return this.neurons.map(function(neuron, index) {
      if(inputs) return neuron.activate(inputs[index]);
      else return neuron.activate();
    })
  }

  /**
   * @param {number[]} [targets]
   * @param {number} [rate=0.3]
   *
   * @returns {number[]}
   *
   * @example
   * //===============================================
   * // One Group (No Hidden Layers) =================
   * //===============================================
   * const { Group } = require("@liquidcarrot/nn")
   *
   * const group = new Group(2);
   *
   * neuron.activate([0, 0]); // [0, 0]
   * neuron.propagate([0, 1]); // [0, -1]
   *
   * //===============================================
   * // Three Groups (Hidden Layers) =================
   * //===============================================
   * const { Group } = require("@liquidcarrot/nn")
   *
   * const input = new Group(2); // Input Neuron (Layer)
   * const hidden = new Group(2,0.1); // Hidden Neuron (Layer)
   * const output = new Group(2,0.15); // Output Neuron (Layer)
   *
   * input.connect(hidden, [0.2,0.25,0.3,0.35]); // Connects input layer to hidden layer
   * hidden.connect(output, [0.4,0.45,0.5,0.55]); // Connects hidden layer to output layer
   *
   * input.activate([0,0]); // [0,0]
   * hidden.activate(); // [0.###, 0.###]
   * output.activate(); // [0.###, 0.###]
   *
   * output.propagate([0, 1]); //  [0, -1]
   * hidden.propagate(); // [0.###, 0.###]
   * input.propagate(); // [0.###, 0.###]
   */
  this.propagate = function(targets, rate=0.3) {
    return this.neurons.map(function(neuron, index) {
      if(targets) return neuron.propagate(targets[index]);
      else return neuron.propagate();
    })
  }
  //================================================
  // END CORE FUNCTIONS ============================
  //================================================

  //================================================
  // UTILITY FUNCTIONS =============================
  //================================================

  //Code here...

  //================================================
  // END UTILITY FUNCTIONS =========================
  //================================================
}

module.exports = Group;
