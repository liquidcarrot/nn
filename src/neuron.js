const uid = require("cuid");

/**
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
 * const { Neuron } = require("@liquidcarrot/nn")
 *
 * const neuron = new Neuron();
 *
 * neuron.activate(0); // 0
 * neuron.propagate(1); // -1
 *
 * @example
 * const { Neuron } = require("@liquidcarrot/nn")
 *
 * const input = new Neuron();
 * const hidden = new Neuron(0.1);
 * const output = new Neuron(0.2);
 *
 * input.connect(hidden, 0.3);
 * hidden.connect(output, 0.4);
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
   * const { Neuron } = require("@liquidcarrot/nn")
   *
   * const neuron = new Neuron();
   *
   * neuron.activate(3);
   *
   * @example
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
   * const { Neuron } = require("@liquidcarrot/nn")
   *
   * const neuron = new Neuron();
   *
   * neuron.activate(3); // 3
   * neuron.propagate(0); // 3
   *
   * @example
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