const uid = require("cuid");
const Group = require("./group");

// Constructs network
function Network(sizes, biases, weights) {
  this.id = uid();
  
  this.groups == sizes == undefined ? [] : sizes.map(function(size, index) {
    return new Group(size, biases[index]);
  });
  
  // Connects neurons
  this.groups.slice(0, this.groups.length - 1).forEach(function(group, index) {
    if(weights) group.connect(this.groups[index + 1], weights[index]);
    else group.connect(this.groups[index + 1]);
  })
  
  // Activates Network
  this.activate = function(inputs) {
    const outputs = this.groups.map(function(group, index) {
      if(index === 0) return group.activate(inputs);
      else return group.activate();
    })
    
    return outputs[outputs.length - 1];
  }
  
  // Calculates error & updates network weights
  this.propagate= function(targets) {
    // MSE Cost
    const error = this.groups[this.groups.length - 1].neurons.map(function(neuron, index) {
      return 0.5 * Math.pow(target[index] - neuron.output, 2);
    }).reduce((a,b) => a + b);
    
    // Propagate error & update weights
    this.groups.reverse().forEach(function(group, index) {
      if(index === 0) group.propagate(targets);
      else return group.propagate();
    }); this.groups.reverse();
    
    return error;
  }
}

module.exports = Network;