const Network = require("../../src/network");
const Group = require("../../src/group");
const Neuron = require("../../src/neuron");
const { expect } = require("chai");

describe("Network", function() {
  describe("new Network()", function() {
    it("should create a new network w/ given sizes", function() {
      const sizes = [4,3,2];
      const network = new Network(sizes);
      
      expect(network).to.be.an.instanceOf(Network);
      expect(network.groups).to.have.a.lengthOf(3);
      
      network.groups.forEach(function(group, index) {
        expect(group.neurons).to.have.a.lengthOf(sizes[index]);
      })
    })
    it("should create a new network w/ given sizes & biases", function() {
      const sizes = [4,3,2];
      const biases = [-0.1,0.1,0.2];
      const network = new Network(sizes,biases);
      
      expect(network).to.be.an.instanceOf(Network);
      expect(network.groups).to.have.a.lengthOf(3);
      
      network.groups.forEach(function(group, index) {
        expect(group.neurons).to.have.a.lengthOf(sizes[index]);
        
        const bias = biases[index];
        group.neurons.forEach(function(neuron) {
          expect(neuron.bias).to.eql(bias);
        })
      })
    })
    it("should create a new network w/ given sizes, biases, & weights", function() {
      const weights = [[0.1, 0.2, 0.3, 0.4], [-0.1, -0.2, -0.3, -0.4]]
      const network = new Network([2,2,2], undefined, weights);
      
      expect(network).to.be.an.instanceOf(Network);
      expect(network.groups).to.have.a.lengthOf(3);
      
      network.groups.forEach(function(group, index) {
        expect(group.neurons).to.have.a.lengthOf(2);
      })
      
      network.groups.slice(0, network.groups.length - 1).forEach(function(group, g, groups) {
        const neurons = group.neurons;
        const others = network.groups[g + 1].neurons;
        
        neurons.forEach(function(neuron, n) {
          others.forEach(function(other, o) {
            expect(neuron.outgoing.weights[other.id]).to.eql(weights[g][2 * n + o]);
          })
        })
      })
    })
  })
  describe("network.activate()", function() {
    it("should activate neurons", function() {
      const network = new Network([2,2], [0, 0.3], [[0.1, 0.2, 0.3, 0.4]]);
      
      const output = network.activate([0,1]);
      
      expect(output[0]).to.be.closeTo(0.6456563062257954, 0.000000000001);
      expect(output[1]).to.be.closeTo(0.6681877721681662, 0.000000000001)
    })
  })
  describe("network.propagate()", function() {
    it("should propagate error", function() {
      const network = new Network([2,2], [0, 0.3], [[0.1, 0.2, 0.3, 0.4]]);
      
      const output = network.activate([0,1]);
      const error = network.propagate([0.3, 0.6]);
      
      expect(error).to.be.closeTo(0.06206392715345929, 0.000000000001);
    })
    it("should update weights", function() {
      const network = new Network([2,2], [0, 0.3], [[0.1, 0.2, 0.3, 0.4]]);
      
      const output = network.activate([0,1]);
      
      const error = network.propagate([0.3, 0.6]);
      
      // W[0]
      expect(network.groups[0].neurons[0].outgoing.weights[network.groups[1].neurons[0].id]).to.eql(0.1);
      // W[1]
      expect(network.groups[0].neurons[0].outgoing.weights[network.groups[1].neurons[1].id]).to.eql(0.2);
      // W[2]
      expect(network.groups[0].neurons[1].outgoing.weights[network.groups[1].neurons[0].id]).to.be.closeTo(0.2762757853563233, 0.000000000001);
      // W[3]
      expect(network.groups[0].neurons[1].outgoing.weights[network.groups[1].neurons[1].id]).to.be.closeTo(0.39546456793274204, 0.000000000001);
    })
  })
})