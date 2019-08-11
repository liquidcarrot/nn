const uid = require("cuid");

/**
 * ### What is a neuron?
 *
 * A _`Neuron`_ is a simplified mathematical model of a biological neuron.
 *
 * In people, a neuron is a cell that collects inputs from synapses (i.e. eyes, ears, etc. or other neurons) and triggers an `output` signal when the incoming signals pass a certain threshold.
 *
 * In biological neurons (in animals) or in artificial neurons (i.e. AI, NN, Deep Learning, etc.), one neuron doesn’t do much, but when combined, neural networks allow us to recognize the world around us, solve problems, and interact with our environment.
 *
 * ### How do they work?
 *
 * Neural networks were inspired by the human brain, and like in a human brain the basic building block is called a `Neuron`. Its functionality is similar to a human neuron, i.e. it takes in some inputs and fires an output. In purely mathematical terms, a neuron in the machine learning world is a placeholder for a mathematical function, and its only job is to provide an output by applying the function on the inputs provided.
 *
 * ![](https://miro.medium.com/max/805/1*XqXu-hBHocGoHh_65Rl8lQ.png)
 *
 * The function used in a neuron is generally called an _"activation function"_. There have been 5 major activation functions tried to date, step, sigmoid, tanh, and ReLU. For this neuron we are using a _"sigmoid"_ activation function.
 *
 * ### What is a _"sigmoid activation function"_?
 *
 * A sigmoid function - or logistic function - is defined mathematically as:
 *
 * ![](https://miro.medium.com/max/460/1*MIeka59unAhS7MQk5e7FOg.png)
 *
 * The value of the function tends to zero when _**z**_ tends to negative infinity and tends to 1 when _**z**_ tends to infinity. A sigmoid activation function is an approximation of how a "real neuron" would behave; it's an assumption in the field of deep learning.
 *
 * @constructs Neuron
 *
 * @param {number} [bias]
 *
 * @prop {string} id
 * @prop {number} bias
 * @prop {Object} incoming
 * @prop {{ "[ID]": Neuron }} incoming.targets
 * @prop {{ "[ID]": number }} incoming.weights
 * @prop {Object} outgoing
 * @prop {{ "[ID]": Neuron }} outgoing.targets
 * @prop {{ "[ID]": number }} outgoing.weights
 * @prop {number} _output
 * @prop {number} output
 * @prop {number} error
 *
 * @example
 * //===============================================
 * // One Neuron (No Hidden Layers) ================
 * //===============================================
 * const { Neuron } = require("@liquidcarrot/nn")
 *
 * const neuron = new Neuron();
 *
 * neuron.activate(0); // 0
 * neuron.propagate(1); // -1
 *
 * //===============================================
 * // Three Neurons (Hidden Layers) ================
 * //===============================================
 * const { Neuron } = require("@liquidcarrot/nn")
 *
 * const input = new Neuron(); // Input Neuron (Layer)
 * const hidden = new Neuron(0.1); // Hidden Neuron (Layer)
 * const output = new Neuron(0.2); // Output Neuron (Layer)
 *
 * input.connect(hidden, 0.3); // Connects input layer to hidden layer
 * hidden.connect(output, 0.4); // Connects hidden layer to output layer
 *
 * input.activate(0); // 0
 * hidden.activate(); // 0.52497918747894
 * output.activate(); // 0.6010858826658407
 *
 * output.propagate(1); //  -0.09565228299910712
 * hidden.propagate(); // -0.009900697661026392
 * input.propagate(); // -0.0029702092983079176
 */
function Neuron(bias) {
  this.id = uid();
  
  this.bias = bias == undefined ? Math.random() * 2 - 1 : bias;
  this.squash;
  this.cost;
  
  this.incoming = {
    targets: {}, //new Map(),
    weights: {} //new Map()
  }
  this.outgoing = {
    targets: {}, // new Map(),
    weights: {} // new Map()
  }
  
  this._output; // f'(x)
  this.output; // f(x)
  this.error; // E'(f(x))
  this._error;// E(f(x))
  
  /**
   * @param {Neuron} neuron
   * @param {number} [weight]
   *
   * @example
   * const { Neuron } = require("@liquidcarrot/nn")
   *
   * const neuron = new Neuron();
   * const other = new Neuron();
   *
   * neuron.connect(other);
   */
  this.connect = function(neuron, weight) {
    this.outgoing.targets[neuron.id] = neuron;
    neuron.incoming.targets[this.id] = this;
    this.outgoing.weights[neuron.id] = neuron.incoming.weights[this.id] = weight == undefined ? Math.random() * 2 - 1 : weight;
  }
  
  /**
   * @param {number} [input]
   *
   * @returns {number} Returns the neuron's output
   *
   * @example
   * //===============================================
   * // One Neuron ===================================
   * //===============================================
   * const { Neuron } = require("@liquidcarrot/nn")
   *
   * const neuron = new Neuron();
   *
   * neuron.activate(3);
   *
   * //===============================================
   * // Two Neurons ==================================
   * //===============================================
   * const { Neuron } = require("@liquidcarrot/nn")
   *
   * const neuron = new Neuron();
   * const other = new Neuron(0.1);
   *
   * neuron.connect(other, 0.2);
   *
   * neuron.activate(3); // 3
   * other.activate(); // 0.6681877721681662
   */
  this.activate = function(input) {
    const self = this;
    
    function sigmoid(x) { return 1 / (1 + Math.exp(-x)) } // f(x)
    function _sigmoid(x) { return sigmoid(x) * (1 - sigmoid(x)) } // f'(x)
    
    if(input != undefined) {
      this._output = 1; // f'(x)
      this.output = input; // f(x)
    } else {
      // Σ (x • w)
      const sum = Object.keys(this.incoming.targets).reduce(function(total, target, index) {
        return total += self.incoming.targets[target].output * self.incoming.weights[target];
      }, this.bias);
      
      this._output = _sigmoid(sum); // f'(x)
      this.output = sigmoid(sum); // f(x)
    }
    
    return this.output;
  }
  
  /**
   * @param {number} target
   * @param {number} [rate=0.3]
   *
   * @return {number} Returns neuron's marginal error
   *
   * @example
   * //===============================================
   * // One Neuron ===================================
   * //===============================================
   * const { Neuron } = require("@liquidcarrot/nn")
   *
   * const neuron = new Neuron();
   *
   * neuron.activate(3); // 3
   * neuron.propagate(0); // 3
   *
   * //===============================================
   * // Two Neurons ==================================
   * //===============================================
   * const { Neuron } = require("@liquidcarrot/nn")
   *
   * const neuron = new Neuron();
   * const other = new Neuron(0.1);
   *
   * neuron.connect(other, 0.2);
   *
   * neuron.activate(3); // 3
   * other.activate(); // 0.6681877721681662
   *
   * other.propagate(0); // 0.14814583086672545
   * neuron.propagate(); // 0.009876697690471913
   */
  this.propagate = function(target, rate=0.3) {
    const self = this;
    
    //𝛿E /𝛿squash
    const sum = target == undefined ? Object.keys(this.outgoing.targets).reduce(function(total, target, index) {
        // Δweight
        self.outgoing.targets[target].incoming.weights[self.id] = self.outgoing.weights[target] -= rate * self.outgoing.targets[target].error * self.output;
        
        return total += self.outgoing.targets[target].error * self.outgoing.weights[target];
      }, 0) : this.output - target;
    
    // 𝛿squash/𝛿sum
    this.error = sum * this._output
    
    // Δbias
    this.bias -= rate * this.error;
    
    return this.error;
  }
}

module.exports = Neuron;