// This End-to-End test is based on the following video: https://www.youtube.com/watch?v=0e0z28wAWfg&t=3s
const Neuron = require("../../src/neuron");
const { expect } = require("chai");

function sigmoid(x, derivative=false) {
  function _sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }
  
  const y = _sigmoid(x);
  
  return derivative ? y(1 - y) : y;
}

function dot(a, b) {
  return a.reduce(function(total, value, index) {
    return total += a[index] * b[index];
  }, 0)
}

describe("Backpropagation Test - End-to-End: https://www.youtube.com/watch?v=0e0z28wAWfg&t=3s", function() {
  const biases = [0.35,0.6];
  const inputs = [new Neuron(), new Neuron()];
  const hiddens = [new Neuron(biases[0]), new Neuron(biases[0])];
  const outputs = [new Neuron(biases[1]), new Neuron(biases[1])];
  const connections = [];
  
  const data = [0.05,0.1];
  const target = [0.01,0.99];
  
  connections.push(inputs[0].connect(hiddens[0], 0.15)); // w1
  connections.push(inputs[1].connect(hiddens[0], 0.2)); // w2
  connections.push(inputs[0].connect(hiddens[1], 0.25)); // w3
  connections.push(inputs[1].connect(hiddens[1], 0.3)); // w4
  connections.push(hiddens[0].connect(outputs[0], 0.4)); // w5
  connections.push(hiddens[1].connect(outputs[0], 0.45)); // w6
  connections.push(hiddens[0].connect(outputs[1], 0.5)); // w7
  connections.push(hiddens[1].connect(outputs[1], 0.55)); // w8
  
  it("should pass all tests", function() {
    expect(inputs[0].activate(data[0])).to.eql(data[0]);
    expect(inputs[1].activate(data[1])).to.eql(data[1]);
    
    expect(hiddens[0].activate()).to.be.closeTo(0.593269992, 0.000001);
    expect(hiddens[1].activate()).to.be.closeTo(0.596884378, 0.000001);
    
    expect(outputs[0].activate()).to.be.closeTo(0.75136507, 0.000001);
    expect(outputs[1].activate()).to.be.closeTo(0.772928465, 0.000001);
    
    outputs[0].propagate(target[0], 0.5);
    outputs[1].propagate(target[1], 0.5);
    
    hiddens[0].propagate();
    hiddens[1].propagate();
    
    inputs[0].propagate();
    inputs[1].propagate();
    
    expect(inputs[0].outgoing.weights[hiddens[0].id]).to.be.at.most(0.15); // closeTo(0.149780716, 0.0015); // w1
    expect(inputs[1].outgoing.weights[hiddens[0].id]).to.be.at.most(0.20); // closeTo(0.199561430, 0.0015); // w2
    expect(inputs[0].outgoing.weights[hiddens[1].id]).to.be.at.most(0.25); // closeTo(0.249751140, 0.0015); // w3
    expect(inputs[1].outgoing.weights[hiddens[1].id]).to.be.at.most(0.30); // closeTo(0.299502290, 0.0015); // w4
    expect(hiddens[0].outgoing.weights[outputs[0].id]).to.be.at.least(0.35); // closeTo(0.358916480, 0.0015); // w5
    expect(hiddens[1].outgoing.weights[outputs[0].id]).to.be.at.least(0.40); // closeTo(0.408666186, 0.0015); // w6
    expect(hiddens[0].outgoing.weights[outputs[1].id]).to.be.at.least(0.50); // closeTo(0.511301270, 0.0015); // w7
    expect(hiddens[1].outgoing.weights[outputs[1].id]).to.be.at.least(0.55); // closeTo(0.561370121, 0.0015); // w8
  })
  
})