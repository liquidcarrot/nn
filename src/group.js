const uid = require("cuid");
const Neuron = require("./neuron");

function Group(size, bias) {
  this.id = uid();
  this.neurons = Array.from({ length:  size}, function() {
    return new Neuron(bias);
  })
  
  this.connect = function(target, weights) {
    if(weights) {
      let weight = 0;
      
      this.neurons.forEach(function(neuron) {
        target.neurons.forEach(function(other) {
          neuron.connect(other, weights[weight]);
          
          weight++;
        })
      })
    } else {
      this.neurons.forEach(function(neuron) {
        target.neurons.forEach(function(other) {
          neuron.connect(other);
        })
      })
    }
  }
  
  this.activate = function(inputs) {
    if(inputs) {
      this.neurons.forEach(function(neuron, index) {
        neuron.activate(inputs[index]);
      })
    } else {
      this.neurons.forEach(function(neuron, index) {
        neuron.activate();
      })
    }
  }
  
  this.propagate = function(targets) {
    if(targets) {
      this.neurons.forEach(function(neuron, index) {
        neuron.propagate(targets[index]);
      })
    } else {
      this.neurons.forEach(function(neuron, index) {
        neuron.propagate();
      })
    }
  }
}

module.exports = Group;