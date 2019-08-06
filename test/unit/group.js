const Group = require("../../src/group");
const Neuron = require("../../src/neuron");
const { expect } = require("chai");

describe.skip("Group", function() {
  describe("new Group()", function() {
    it("should create new group w/ size", function() {
      const size = 7;
      const group = new Group(size);
      
      expect(group.id).to.be.a("string");
      expect(group.neurons).to.be.an("array").with.lengthOf(size);
      
      group.neurons.forEach(function(neuron) {
        expect(neuron).to.be.an.instanceOf(Neuron);
      })
    })
    it("should create new group w/ size & bias", function() {
      const size = 7;
      const bias = Math.random() * 2 -  1;
      const group = new Group(size, bias);
      
      expect(group.id).to.be.a("string");
      expect(group.neurons).to.be.an("array").with.lengthOf(size);
      
      group.neurons.forEach(function(neuron) {
        expect(neuron).to.be.an.instanceOf(Neuron);
        expect(neuron.bias).to.eql(bias);
      })
    })
  })
  describe("group.connect()", function() {
    it("should connect neurons", function() {
      const group = new Group(2);
      const other = new Group(2);
      
      group.connect(other);
      
      group.neurons.forEach(function(neuron) {
        const keys = Object.keys(neuron.outgoing.neurons);
        
        expect(keys).to.have.lengthOf(2);
        
        keys.forEach(function(key) {
          expect(neuron.outgoing.neurons[key]).to.be.oneOf(other);
        })
      })
      
      expect(neuron.outgoing.targets[other.id]).to.eql(other);
      expect(other.incoming.targets[neuron.id]).to.eql(neuron);
    })
  })
  describe.skip("group.activate()", function() {
    it("should activate neurons", function() {
      const data = 0.4;
      const input = new Neuron();
      const hidden = new Neuron(0.3);
      const output = new Neuron(0.5);
      
      input.connect(hidden, 0.2);
      hidden.connect(output, 0.4);
      
      expect(input.activate(data)).to.eql(data);
      expect(hidden.activate()).to.be.closeTo(0.5938731029341427, 0.000000000001);
      expect(output.activate()).to.be.closeTo(0.6764597104624211, 0.000000000001);
    })
  })
  describe.skip("group.propagate()", function() {
    it("should propagate error", function() {
      const data = 0.4;
      const target = 1;
      const input = new Neuron();
      const hidden = new Neuron(0.3);
      const output = new Neuron(0.5);
      
      input.connect(hidden, 0.2);
      hidden.connect(output, 0.4);
      
      input.activate(data);
      hidden.activate();
      output.activate();
      
      expect(output.propagate(target)).to.be.closeTo(-0.07081066533135665, 0.0015);
      expect(hidden.propagate()).to.be.closeTo(-0.0068314685835444535, 0.0015);
      expect(input.propagate()).to.be.closeTo(-0.0013662937167088908, 0.0015);
    })
    it("should update weights", function() {
      const data = 0.4;
      const target = 1;
      const input = new Neuron();
      const hidden = new Neuron(0.3);
      const output = new Neuron(0.5);
      
      input.connect(hidden, 0.2);
      hidden.connect(output, 0.4);
      
      input.activate(data);
      hidden.activate();
      output.activate();
      
      output.propagate(target)
      hidden.propagate()
      input.propagate()
      
      expect(output.incoming.weights[hidden.id]).to.be.closeTo(0.4126157648623492, 0.0015);
      expect(hidden.outgoing.weights[output .id]).to.be.closeTo(0.4126157648623492, 0.0015);
      
      expect(hidden.incoming.weights[input .id]).to.be.closeTo(0.20081977623002534, 0.0015);
      expect(input.outgoing.weights[hidden.id]).to.be.closeTo(0.20081977623002534, 0.0015);
    })
  })
})