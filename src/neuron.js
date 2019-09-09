// const uid = require("cuid");
const _ = require("./_");
const Connection = require("./connection");

/**
 * Neurons are the engines that process and guide information though a neural
 * network. A neural networks "intelligence" is usually measured by the ability
 * for neurons to effectively process information as a group.
 *
 * ### What is a neuron?
 *
 * A _`Neuron`_ is a simplified mathematical model of a biological neuron.
 *
 * In people, a neuron is a cell that collects inputs from synapses (i.e. eyes,
 * ears, etc. or other neurons) and triggers an `output` signal when the
 * incoming signals pass a certain threshold.
 *
 * In biological neurons (in animals) or in artificial neurons (i.e. AI, NN,
 * Deep Learning, etc.), one neuron doesn’t do much, but when combined, neural
 * networks allow us to recognize the world around us, solve problems, and
 * interact with our environment.
 *
 * ### How do they work?
 *
 * Neural networks were inspired by the human brain, and like in a human brain
 * the basic building block is called a `Neuron`. Its functionality is similar
 * to a human neuron, i.e. it takes in some inputs and fires an output. In
 * purely mathematical terms, a neuron in the machine learning world is a
 * placeholder for a mathematical function, and its only job is to provide an
 * output by applying the function on the inputs provided.
 *
 * ![](https://miro.medium.com/max/805/1*XqXu-hBHocGoHh_65Rl8lQ.png)
 *
 * The function used in a neuron is generally called an _"activation function"_.
 * There have been 5 major activation functions tried to date, step, sigmoid,
 * tanh, and ReLU. For this neuron we are using a _"sigmoid"_ activation
 * function.
 *
 * ### What is a _"sigmoid activation function"_?
 *
 * A sigmoid function - or logistic function - is defined mathematically as:
 *
 * ![](https://miro.medium.com/max/460/1*MIeka59unAhS7MQk5e7FOg.png)
 *
 * The value of the function tends to zero when _**z**_ tends to negative
 * infinity and tends to 1 when _**z**_ tends to infinity. A sigmoid activation
 * function is an approximation of how a "real neuron" would behave; it's an
 * assumption in the field of deep learning.
 *
 * @constructs Neuron
 *
 * @param {Object} options
 * @param {number} [options.id]
 * @param {number} [options.bias]
 * @param {Object} options.optimizer
 * @param {number} options.optimizer.rate
 * @param {number} options.optimizer.momentum
 * @param {number} options.optimizer.decay
 * @param {number} options.optimizer.alpha
 * @param {number} options.optimizer.beta
 * @param {number} options.optimizer.gamma
 *
 *
 * @prop {string} id
 * @prop {number} bias
 * @prop {Object} optimizer
 * @prop {number} optimizer.rate
 * @prop {number} optimizer.momentum
 * @prop {number} optimizer.decay
 * @prop {number} optimizer.alpha
 * @prop {number} optimizer.beta
 * @prop {number} optimizer.gamma
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
function Neuron(neuron={}) {
  this.id = neuron.id || Neuron.uid();

  this.type = neuron.type == undefined ? "hidden" : neuron.type; // "input", "hidden", "output"
  this.bias = neuron.bias == undefined ? Math.random() * 2 - 1 : neuron.bias;

  this.connections = [];

  // OPTIMIZERS
  // CHECK: https://keras.io/optimizers/
  // CHECK: http://ruder.io/optimizing-gradient-descent/index.html
  // this._optimizer = Neuron.optimizers[Object.keys(Neuron.optimizers)[Math.floor(Object.keys(Neuron.optimizers).length * Math.random())];
  this.optimizer = {}
  this.optimizer.rate;
  this.optimizer.momentum;
  this.optimizer.decay;
  this.optimizer.alpha;
  this.optimizer.beta;
  this.optimizer.gamma;

  this.squash;
  this.cost;


  this.incoming = {
    targets: {}, //new Map(),
    weights: {}, //new Map(),
    connections: {}
  }
  this.outgoing = {
    targets: {}, // new Map(),
    weights: {}, // new Map(),
    connections: {}
  }

  this._output; // f'(x)
  this.output; // f(x)
  this.error; // E'(f(x))
  this._error;// E(f(x))

  //================================================
  // CORE FUNCTIONS ================================
  //================================================
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
    const connection = new Connection(this, neuron, weight);

    this.outgoing.targets[neuron.id] = neuron;
    this.outgoing.connections[neuron.id] = connection;

    neuron.incoming.targets[this.id] = this;
    neuron.incoming.connections[this.id] = connection;

    this.outgoing.weights[neuron.id] = neuron.incoming.weights[this.id] = weight == undefined ? Math.random() * 2 - 1 : weight;
    this.outgoing.connections[connection.id] = neuron.incoming.connections[connection.id] = connection;
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
  //================================================
  // END CORE FUNCTIONS ============================
  //================================================

  //================================================
  // UTILITY FUNCTIONS =============================
  //================================================

  this.toJSON = function() {
    return {
      id: this.id,
      bias: this.bias,
      type: this.type
    }
  }

  /**
   * @param {boolean} [array=false] Iff `true`, will return an `Array` (`[[INCOMING_WEIGHTS], [OUTGOING_WEIGHTS]]`) - instead of a JSON Object (`{ incoming: [INCOMING_WEIGHTS], outgoing: [OUTGOING_WEIGHTS]`)
   *
   * @returns {Object|Array.<Array.<Number>>} Returns an `Array` or `Object` of incoming and outgoing weights
   */
  this.weights = function(options) {
    options = options || {
      json: true
    }

    if(options.json) return {
      incoming: Object.values(this.incoming.weights),
      outgoing: Object.values(this.outgoing.weights)
    }
    else return [Object.values(this.incoming.weights), Object.values(this.outgoing.weights)];
  }


  //Code here...

  //================================================
  // END UTILITY FUNCTIONS =========================
  //================================================
}

Neuron.neurons = 0;
Neuron.uid = function() {
  return ++Neuron.neurons;
}
Neuron.activations = {
  SIGMOID: function(x, dx) {
    const fx = 1 / (1 + Math.exp(-x));

    if(!dx) return _.clamp(fx);
    else return _.clamp(fx * (1 - fx));
  },
  RELU: function(x, dx) {
    if(x > 0) {
      const fx = x;

      return !dx ? _.clamp(x) : 1;
    } else return 0;
  },
  TANH: function(x, dx) {
    const fx = Math.tanh(x);

    if(!dx) return _.clamp(fx);
    else return _.clamp(1 - (fx * fx));
  },
  IDENTITY: function(x, dx) {
    return !dx ? _.clamp(x) : 1;
  },
  STEP: function(x, dx) {
    return x > 0 && dx ? 1 : 0;
  }
}


/**
* Optimizers are initiated with
* { rate, momentum, decay, alpha, beta, epsilon, gamma }
*/
Neuron.optimizers = {
  SGD: function() {},
  NESTEROV: function() {},
  RMSPROP: function() {},
  ADAGRAD: function() {},
  ADADELTA: function() {},
  ADAM: function() {},
  AMSGRAD: function() {},
  ADAMAX: function() {},
  NADAM: function() {}
}

module.exports = Neuron;
