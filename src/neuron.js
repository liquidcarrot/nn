const uid = require("cuid");
const Connection = require("./connection");

// /**
// *
// * @constructs Neuron
// *
// * @prop {string} id Unique neuron ID
// * @prop {number} bias Neuron's signaling bias
// * @prop {Object} incoming.connections Incoming connection(s) - `{ "[ID]": connection }`
// * @prop {Object} incoming.weights Incoming weight(s) - `{ "[ID]": weight }`
// * @prop {Object} incoming.neurons Incoming neurons(s) - `{ "[ID]": neuron }`
// * @prop {Object} outgoing.connections Outgoing connection(s) - `{ "[ID]": connection }`
// * @prop {Object} outgoing.weights Outgoing weight(s) - `{ "[ID]": weight }`
// * @prop {Object} outgoing.neurons Outgoing neurons(s) - `{ "[ID]": neuron }`
// *
// * @param {number} [bias] Neuron's signaling bias
// * @param {Object} [options]
// *
// * @example
// * const neuron = new Neuron(); // Neuron { bias }
// *
// * const neuron = new Neuron(0.2); // Neuron { bias: 0.2 }
// */
// function Neuron(bias, options) {
//   this.id = uid();
//   this.bias = bias == undefined ? Math.random() * 2 - 1 : bias;
//   this.incoming = {
//     connections: {},
//     weights: {},
//     neurons: {}
//   }
//   this.outgoing = {
//     connections: {},
//     weights: {},
//     neurons: {}
//   }
  
//   // Settings
//   this.squash = function sigmoid(x, derivative=false) {
//     function _sigmoid(x) {
//       return 1 / (1 + Math.exp(-x));
//     }
    
//     const y = _sigmoid(x);
    
//     return derivative ? y * (1 - y) : y;
//   };
//   this.cost;
//   this.depth = 1; // Number of derivatives (i.e. depth) calculated during `neuron.activate()`
//   // this.states; // Store
  
//   // State
//   this._output = []; // [f(x), f'(x), f''(x), ...]
//   this.output; // 0.3
//   // this._errors; // [{ loss: number, accuracy: number }, ...]
//   this.error; // [0.4, 0.346]
  
//   /**
//   * @param {Neuron|Group} target Neuron or Group this neuron will connect to
//   * @param {number|number[]} [weights] Weight(s) of connection(s) to `target`
//   * @param {Object} [options]
//   *
//   * @returns {Connection} Returns a connection between this neuron and `target`
//   *
//   * @example
//   * const neuron = new Neuron();
//   * const other = new Neuron();
//   *
//   * const connection = neuron.connect(other); // Connection { a: neuron, b: other }
//   *
//   * const connection = neuron.connect(other, 0.4) // Connection { a: neuron, b: other, weight: 0.4 }
//   *
//   * @example
//   * const neuron = new Neuron();
//   * const other = new Group();
//   *
//   * const connection = neuron.connect(other); // Connection { a: neuron, b: other }
//   *
//   * const connection = neuron.connect(other, [0.1, -0.3, 0.2]) // Connection { a: neuron, b: other, weight: [0.1, -0.3, 0.2] }
//   */
//   this.connect = function(target, weights, options) {
//     const connection = new Connection(this, target, weights);
    
//     this.outgoing.connections[target.id] = connection;
//     target.incoming.connections[this.id] = connection;
    
//     // this.outgoing.connections[connection.id] = connection;
//     // this.outgoing.connections[target.id] = connection;
//     // this.outgoing.weights[connection.id] = connection.weight;
//     // this.outgoing.weights[target.id] = connection.weight;
//     // this.outgoing.neurons[connection.id] = neurons;
//     // this.outgoing.neurons[target.id] = target;
    
//     // target.incoming.connections[connection.id] = connection;
//     // target.incoming.connections[this.id] = connection;
//     // target.incoming.weights[connection.id] = connection.weight;
//     // target.incoming.weights[this.id] = connection.weight;
//     // neurons.incoming.neurons[connection.id] = this;
//     // target.incoming.neurons[this.id] = this;
    
//     return connection;
//   }
  
//   this.activate = function(input) {
//     if(input) {
//       this._output.unshift([input, 1]);
//       this.output = input;
//     } else {
//       let neurons = Object.keys(this.incoming.neurons);
      
//       console.log(`${this.id} neurons: ${neurons}`);
      
//       let sum = this.bias;
      
//       console.log(`${this.id} bias: ${this.bias}`);
//       console.log(`${this.id} sum: ${sum}`);
//       console.log();
    
//       for(let i = 0; i  < neurons.length; i++) {
        
//         console.log(`\t${this.id} i: ${i}`)
//         console.log(`\t${this.id} neurons[i]: ${neurons[i]}`)
//         console.log(`\t${this.id} incoming.neurons[neurons[i]: ${this.incoming.neurons[neurons[i]]}`)
//         console.log(`\t${this.id} incoming.neurons[neurons[i]._output[0][0]: ${this.incoming.neurons[neurons[i]]._output[0][0]}`)
//         console.log(`\t${this.id} incoming.weights[neurons[i]]: ${this.incoming.weights[neurons[i]]}`)
//         console.log();
        
//         let opinion = this.incoming.connections[neurons[i]].a._output[0][0]; // Last f(x) from every incoming neuron
//         let weight = this.incoming.connections[neurons[i]].weight; // Weight of opinions (i.e. f(x)) from every incoming neuron
        
//         sum += opinion * weight;
        
//         console.log(`\t${this.id} opinion:  ${opinion}`);
//         console.log(`\t${this.id} weight:  ${weight}`);
//         console.log(`\t${this.id} sum: ${sum}`);
//         console.log();
//       }
      
//       let outputs = []; // [f(x), f'(x), f''(x), ...]
      
//       // Deep Outputs [f(x), f'(x), f''(x), ...]
//       for(let d = 0; d < this.depth + 1; d++) {
//         const squash = this.squash(sum, d);
        
//         console.log(`\t${this.id} squash: ${squash}`);
//         outputs.push(squash);
//       }
      
//       console.log(`${this.id} outputs: ${outputs}`);
      
//       this._output = outputs;
//       this.output = outputs[0];
      
//       console.log(`${this.id} _output: ${this._output}`)
//       console.log(`${this.id} output: ${this.output}`)
//       console.log()
//       console.log("=================================================")
//     }
    
//     return this.output;
//   }
  
//   this.propagate = function(target) {
//     let error = 0;
    
//     if(!target) {
//       const neurons = Object.keys(this.outgoing.neurons);
      
//       //𝛿E /𝛿squash
//       for(let i = 0; i < neurons.length; i++) {
//         // Calculating this neurosn error
//         let delta = this.outgoing.neurons[neurons[i]].error * this.outgoing.weights[neurons[i]];
//         error += delta;
        
//         // Updates the connection (i.e. weights) to the previous - technically next, but we're backpropagating - in the network.
//         // weight = weight - rate * 𝛿sum/𝛿weight
//         delta *= this.output;
//         this.update(neurons[i], delta, 0.5);
//       }
//     } else {
//       // 𝛿E/𝛿squash
//       error = this.output - target;
//     }
    
    
//     // 𝛿squash/𝛿sum
//     this.error = error *= this._output[0][1] // Last --> [0][1] <-- f'(x)
    
//     // bias = bias - rate * (𝛿sum/𝛿bias)
//     this.bias -= 0.5 * error; // learning rate * error;
    
//     return this.error;
//   }
  
//   /**
//   * Updates a weight of given a `connection` by `delta` at `rate`
//   *
//   * @param {string} connection_id Unique connection ID
//   * @param {number} delta
//   */
//   this.update = function(neuron_id, delta, learning_rate) {
//     const weight = this.outgoing.weights[neuron_id] -= learning_rate * delta;
//     this.outgoing.connections[neuron_id].weight = weight;
    
//     const neuron = this.outgoing.neurons[neuron_id];
//     neuron.incoming.weights[this.id] = weight;
//     neuron.incoming.connection[this.id].weight = weight;
//   }
  
//   this._inputs = function() {
//     const neurons = Object.keys(this.incoming.neurons);
    
//     let sum = 0;
    
//     for(let i = 0; i  < neurons.length; i++) {
//       const opinion = this.incoming.neurons[neurons[i]].outputs[0][0]; // Last f(x) from every incoming neuron
//       const weight = this.incoming.weights[neurons[i]]; // Weight of opinions (i.e. f(x)) from every incoming neuron
//       // inputs.push(this.incoming.neurons[neurons[i]].outputs[0][0]); // Last f(x) from every incoming neuron
      
//       sum += opinion * weight;
//     }
    
//     return sum
//   }
  
//   /**
//   * Can bi-directionally fire a neuron
//   *
//   * @param {number} input
//   * @param {boolean} [options.forward=true] Iff `!options.forward`, neuron will fire backward (i.e. backpropagate)
//   * @param {boolean} [options.update=true] Iff `!options.forward && options.update`, neuron will update connection weights
//   *
//   * @returns {number|Feedback|Output} Returns a number or a Feedback or Output Object
//   */
//   this.fire_forward = function(input, options) {
//     /*
//     // FORWARD: Input Neurons
//     // BACKWARD: Output Neurons
//     if(input != undefined) this.outputs.unshift([ input, 1 ]); // [f(x), f'(x), f''(x), ...] until this.depth
    
//     // FORWARD: Hidden & Output Neurons
//     // BACKWARD: Hidden & Input Neurons
//     else {
//       const neurons = Object.keys(this.incoming.neurons);
      
//       let sum = 0;
    
//       for(let i = 0; i  < neurons.length; i++) {
//         const opinion = this.incoming.neurons[neurons[i]].outputs[0][0]; // Last f(x) from every incoming neuron
//         const weight = this.incoming.weights[neurons[i]]; // Weight of opinions (i.e. f(x)) from every incoming neuron
        
//         sum += opinion * weight;
//       }
      
//       const outputs = []; // [f(x), f'(x), f''(x), ...]
      
//       // Deep Outputs [f(x), f'(x), f''(x), ...]
//       for(let d = 0; d < this.depth; d++) {
//         outputs.push(this.squash(sum, d));
//       }
      
//       this.outputs.unshift(outputs);
//     }
    
//     return this.outputs[0][0];
//     */
//   }
  
//   /**
//   * For backpropagation - see:
//   * - https://www.youtube.com/watch?v=An5z8lR8asY
//   */
//   this.fire_backward = function(target) {
//     /*
//     if(target != undefined) this.errors.unshift([this.cost(this.outputs[0][0], target), 1]); // cost(actual, target); this.outputs[0] = [f(x), f'(x), f''(x), ...]; actual = this.outputs[0][0];
    
//     else {
//       const neurons = Object.keys(this.outgoing.neurons);
      
//       let sum = 0;
      
//       for(let i = 0; i < neurons.length; i++) {
//         const critique = this.outgoing.neurons[neurons[i]].errors[0][0];
//         const weight = this.outgoing.weight[neurons[i]];
        
//         sum += critique * weight;
        
//         update(weight, critique * weight * output * learning_rate);
//       }
      
//       this.errors.unshift([sum, 1]);
//     }
    
//     return this.errors[0][0];
//     */
//   }
  
//   this.fire = function(value) {
//     /*
//     const type = "input" || "hidden" || "output" ;
//     const direction = "forward" || "backward";
    
    
//     if(direction === "backward" && type === "output") {
//       const error = value - output; // Cost Function = value - output;
//     }
    
//     if(direction === "backward" && type !== "output") {
//       const error = incoming.neurons.reduce(function(total, neuron) {
//         return total += neuron.error * neuron.weight;
//       }, 0)
//     }
//     */
//   }
  
//   /**
//   * Updates neuron's weights
//   *
//   * @param {string|string[]} [connection_id] Connection ID(s)
//   * @param {number|number[]} [new_weights] New weight(s)
//   * @param {boolean} [options.delta] Iff `options.delta`, `neuron.update()` will return the difference (i.e. delta) between the previous and current weight(s)
//   *
//   * @returns {number[]} Returns an array of weights or weight deltas
//   */
//   this.update = function(connection_ids, new_weights, options) {
    
//   }
// }

function Neuron(bias) {
  this.id = uid();
  
  this.bias = bias == undefined ? Math.random() * 2 - 1 : bias;
  
  this.incoming = {
    targets: new Map(),
    weights: new Map()
  }
  this.outgoing = {
    targets: new Map(),
    weights: new Map()
  }
  
  this._output; // f'(x)
  this.output; // f(x)
  this.error; // E'(f(x))
  
  this.connect = function(target, weight) {
    weight = weight == undefined ? Math.random() * 2 - 1 : weight;
    this.outgoing.targets[target.id] = target;
    this.outgoing.weights[target.id] = weight;
    target.incoming.targets[this.id] = this;
    target.incoming.weights[this.id] = weight;
  }
  
  this.activate = function(input) {
    const self = this;
    
    function sigmoid(x) {
      return 1 / (1 + Math.exp(-x));
    }
    function _sigmoid(x) {
      return sigmoid(x) * (1 - sigmoid(x));
    }
    
    if(input) {
      this._output = 1;
      this.output = input;
    } else {
      const sum = Object.keys(this.incoming.targets).reduce(function(total, target, index) {
        return total += self.incoming.targets[target].output * self.incoming.weights[target];
      }, this.bias);
      
      this._output = _sigmoid(sum);
      this.output = sigmoid(sum);
    }
    
    return this.output;
  }
  
  this.propagate = function(target, rate) {
    const self = this;
    
    function mse(target, value) {
      return 0.5 * Math.pow(target - output, 2);
    }
    function _mse(target, value) {
      return output - target;
    }
    
    const _rate = rate || 0.3; // Learning Rate;
    
    //𝛿E /𝛿squash
    const sum = target == undefined ?  Object.keys(this.outgoing.targets).reduce(function(total, target, index) {
      const error = self.outgoing.targets[target].error * self.outgoing.weights[target];
      
      // Δweight
      const dweight = _rate * self.outgoing.targets[target].error * self.output;
      self.outgoing.targets[target].incoming.weights[self.id] = self.outgoing.weights[target] -= dweight;
      
      return total += error;
    }, 0) : this.output - target;
    
    // 𝛿squash/𝛿sum
    this.error = sum * this._output
    
    // Δbias
    this.bias -= _rate * this.error;
    
    return this.error;
  }
}

module.exports = Neuron;