// neuron group interface

// fire (i.e. activate, run)
// learn (i.e. propagate)

// target (i.e. connect, project)
// untarget (i.e. disconnect, unproject)

// bias

// META
// derivative `_depth`
// stored state running history `_window` (e.g. store the past `6` states)

const uid = require("cuid");
const activation = require("./activation");
const Connection = require("./connection");

/**
 * @param {string} options.squash Activation function name - _e.g. `SIGMOID`_
 */
function Neuron(options) {
  
  this.id = uid();
  this.bias = options && options.bias != undefined ? options.bias : Math.random() * 2 - 1;
  this.squash = options && options.squash != undefined ? activation[options.squash] : activation["SIGMOID"]; // Activation Function - Defaults to `SIGMOID`
  this.cost; // Cost Function
  
  // should have a `connection_id` version of all of these - a global options trigger can help avoid creating these.
  this.incoming = new Map(); // Map(neuron_id) => Neuron;
  this.outgoing = new Map(); // Map(neuron_id) => Neuron;
  this.weights = new Map(); // Map(neuron_id) => Neuron;
  
  this.output;
  this.derivative;
  this.error;
  
  /**
   * @param {Neuron} target
   * @param {number} [weight]
   *
   * @returns {Connection}
   */
  this.connect = function(target, weight) {
    weight = weight || Math.random() * 2 - 1;
    
    this.outgoing[target.id] = target;
    target.incoming[this.id] = this;
    target.weights[this.id] = weight;
    
    return new Connection(this, target, weight);
  }
  
  /**
   * @param {string|Neuron} target
   * @param {boolean} [options.incoming=false] Deletes connection from `incoming` & `outgoing` for both neurons - _by default `neuron.disconnect()` just removes outgoing connections_
   */
  this.disconnect = function(target, options) {
    if(typeof target !== "string") target = target.id // ASSUMPTION: If the target is not an id (i.e. string), it will be an object - likely a `Neuron` that will have an `id` property
    
    delete this.outgoing[target].incoming[this.id];
    delete this.outgoing[target].weights[this.id];
    delete this.outgoing[target];
  }
  
  /**
   * @param {number} [input]
   */
  this.activate = function(input) {
    // forward input
    // use outputs; calculate result; forward result
    let output = input == undefined ? this.bias : input; // Input Neurons
    
    // Hidden/Output Neurons
    if(input == undefined) {
      const ids = Object.keys(this.incoming);
      
      // SUM (i.e. DOT PRODUCT)
      for(let id = 0; id < ids.length; id++) {
        const node = this.incoming[ids[id]];
        output += node.outputs[node.outputs.length - 1] * this.weights[node.id];
      }
      
      // SQUASH
      this.output = this.squash(output);
      this.derivative = this.squash(output, true);
    }
    // Input Neurons
    else {
      this.output = output;
      this.derivative = 1;
    }
    
    return this.output;
  }
  
  
  this.propagate = function(target) {
    // calculate error; forward critiques;
    // use critiques; calculate error; update weights (if backpropagation); forward critiques
    
  }
}

module.exports = Neuron;