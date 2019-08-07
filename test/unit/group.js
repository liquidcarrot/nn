const Group = require("../../src/group");
const Neuron = require("../../src/neuron");
const { expect } = require("chai");

describe("Group", function() {
  describe("new Group()", function() {
    it("should create new group w/ given size", function() {
      const size = 7;
      const group = new Group(size);
      
      expect(group.id).to.be.a("string");
      // expect(group.neurons).to.be.an("object")
      expect(Object.keys(group.neurons)).with.lengthOf(size);
      
      Object.values(group.neurons).forEach(function(neuron) {
        expect(neuron).to.be.an.instanceOf(Neuron);
      })
    })
    it("should create new group w/ given size & bias", function() {
      const size = 7;
      const bias = Math.random() * 2 -  1;
      const group = new Group(size, bias);
      
      expect(group.id).to.be.a("string");
      // expect(group.neurons).to.be.an("object")
      expect(Object.keys(group.neurons)).with.lengthOf(size);
      
      Object.values(group.neurons).forEach(function(neuron) {
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
      
      expect(Object.keys(group.neurons)).to.have.lengthOf(2);
      expect(Object.keys(other.neurons)).to.have.lengthOf(2);
      
      Object.values(group.neurons).forEach(function(neuron) {
        expect(Object.values(neuron.outgoing.targets)).to.have.members(Object.values(other.neurons));
      })
      Object.values(other.neurons).forEach(function(neuron) {
        expect(Object.values(neuron.incoming.targets)).to.have.members(Object.values(group.neurons));
      })
    })
  })
  describe("group.activate()", function() {
    it("should activate neurons", function() {
      const data = [0.1, 0.9]; // console.log(data);
      const input = new Group(2); // console.log(input);
      const hidden = new Group(2, 0.1); // console.log(hidden);
      const output = new Group(2, 0.15); // console.log(output);
      
      input.connect(hidden, [0.2, 0.25, 0.3, 0.35]);
      hidden.connect(output, [0.4, 0.45, 0.5, 0.55]);
      
      const inputs = input.activate(data); // console.log(inputs);
      const hiddens = hidden.activate(); // console.log(hiddens);
      const outputs = output.activate(); // console.log(outputs);
      
      expect(inputs).to.eql(data);
      
      expect(hiddens[0]).to.be.closeTo(0.5962826992967879, 0.000000000001);
      expect(hiddens[1]).to.be.closeTo(0.6082590307465144, 0.000000000001);
      expect(outputs[0]).to.be.closeTo(0.6665545271343889, 0.000000000001);
      expect(outputs[1]).to.be.closeTo(0.6798036666501479, 0.000000000001);
    })
  })
  describe("group.propagate()", function() {
    it("should propagate error", function() {
      const data = [0.1, 0.9]; // console.log(data);
      const target = [0.9, 0.1]; // console.log(target);
      const input = new Group(2); // console.log(input);
      const hidden = new Group(2, 0.1); // console.log(hidden);
      const output = new Group(2, 0.15); // console.log(output);
      
      input.connect(hidden, [0.2, 0.25, 0.3, 0.35]);
      hidden.connect(output, [0.4, 0.45, 0.5, 0.55]);
      
      const inputs = input.activate(data); // console.log(inputs);
      const hiddens = hidden.activate(); // console.log(hiddens);
      const outputs = output.activate(); // console.log(outputs);
      
      const outputse = output.propagate(target); // console.log(outputse);
      const hiddense = hidden.propagate(); // console.log(hiddense);
      const inputse = input.propagate(); // console.log(inputse);
      
      expect(outputse[0]).to.be.closeTo(-0.05188549496765247, 0.000000000001);
      expect(outputse[1]).to.be.closeTo(0.1262062360401121, 0.000000000001);
      expect(hiddense[0]).to.be.closeTo(0.008675561250997721, 0.001);
      expect(hiddense[1]).to.be.closeTo(0.01035819341646418, 0.001);
      expect(inputse[0]).to.be.closeTo(0.00432466060431559, 0.001);
      expect(inputse[1]).to.be.closeTo(0.006228036071061779, 0.001);
    })
    it("should update weights", function() {
      const data = [0.1, 0.9]; // console.log(data);
      const target = [0.9, 0.1]; // console.log(target);
      const input = new Group(2); // console.log(input);
      const hidden = new Group(2, 0.1); // console.log(hidden);
      const output = new Group(2, 0.15); // console.log(output);
      
      input.connect(hidden, [0.2, 0.25, 0.3, 0.35]);
      hidden.connect(output, [0.4, 0.45, 0.5, 0.55]);
      
      const inputs = input.activate(data); // console.log(inputs);
      const hiddens = hidden.activate(); // console.log(hiddens);
      const outputs = output.activate(); // console.log(outputs);
      
      expect(input.neurons[0].outgoing.weights[hidden.neurons[0].id]).to.eql(0.2);
      expect(input.neurons[0].outgoing.weights[hidden.neurons[1].id]).to.eql(0.25);
      expect(input.neurons[1].outgoing.weights[hidden.neurons[0].id]).to.eql(0.3);
      expect(input.neurons[1].outgoing.weights[hidden.neurons[1].id]).to.eql(0.35);
      expect(hidden.neurons[0].outgoing.weights[output.neurons[0].id]).to.eql(0.4);
      expect(hidden.neurons[0].outgoing.weights[output.neurons[1].id]).to.eql(0.45);
      expect(hidden.neurons[1].outgoing.weights[output.neurons[0].id]).to.eql(0.5);
      expect(hidden.neurons[1].outgoing.weights[output.neurons[1].id]).to.eql(0.55);
      
      const outputse = output.propagate(target); // console.log(outputse);
      const hiddense = hidden.propagate(); // console.log(hiddense);
      const inputse = input.propagate(); // console.log(inputse);
      
      expect(hidden.neurons[1].outgoing.weights[output.neurons[1].id]).to.be.closeTo(0.5269701751576227, 0.000000000001);
      expect(hidden.neurons[1].outgoing.weights[output.neurons[0].id]).to.be.closeTo(0.5094679462636482, 0.000000000001);
      expect(hidden.neurons[0].outgoing.weights[output.neurons[1].id]).to.be.closeTo(0.4274236214717743, 0.000000000001);
      expect(hidden.neurons[0].outgoing.weights[output.neurons[0].id]).to.be.closeTo(0.4092815268981, 0.000000000001);
      expect(input.neurons[1].outgoing.weights[hidden.neurons[1].id]).to.be.closeTo(0.34720328777755466, 0.0015);
      expect(input.neurons[1].outgoing.weights[hidden.neurons[0].id]).to.be.closeTo(0.2976575984622306, 0.0015);
      expect(input.neurons[0].outgoing.weights[hidden.neurons[1].id]).to.be.closeTo(0.24968925419750607, 0.0015);
      expect(input.neurons[0].outgoing.weights[hidden.neurons[0].id]).to.be.closeTo(0.19973973316247007, 0.0015);
      
      //============================================================================
      
      // const data = 0.4;
      // const target = 1;
      // const input = new Neuron();
      // const hidden = new Neuron(0.3);
      // const output = new Neuron(0.5);
      
      // input.connect(hidden, 0.2);
      // hidden.connect(output, 0.4);
      
      // input.activate(data);
      // hidden.activate();
      // output.activate();
      
      // output.propagate(target)
      // hidden.propagate()
      // input.propagate()
      
      // expect(output.incoming.weights[hidden.id]).to.be.closeTo(0.4126157648623492, 0.0015);
      // expect(hidden.outgoing.weights[output .id]).to.be.closeTo(0.4126157648623492, 0.0015);
      
      // expect(hidden.incoming.weights[input .id]).to.be.closeTo(0.20081977623002534, 0.0015);
      // expect(input.outgoing.weights[hidden.id]).to.be.closeTo(0.20081977623002534, 0.0015);
    })
  })
})