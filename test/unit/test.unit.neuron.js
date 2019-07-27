const Connection = require("../../src/connection");
const Neuron = require("../../src/neuron");
const activation = require("../../src/activation");
const { expect } = require("chai");

/**
 * Testing Neurons Assuming the Following Topology
 *
 * O --> O --> O
 */
describe("Neuron", function() {
  let input, hidden, output, neuron; // neurons
  let connections = []; // connections (e.g. input <-> hidden, hidden <-> output)
  let weights = []; // weights (e.g. 0.2345, -0.9874);
  let data, target; // data (e.g. 0.4) // target (e.g. 0)
  
  beforeEach(function() {
    input = new Neuron();
    hidden = new Neuron();
    output = new Neuron();
    neuron = new Neuron();
    
    connections = [];
    connections.push(input.connect(hidden));
    connections.push(hidden.connect(output));
    
    data = Math.random() * 2 - 1;
    target = Math.floor(Math.random() * 3) - 1;
  })
  
  it("new Neuron()", function() {
    // HAS PROPERTIES
    expect(neuron.id).to.be.a("string"); // Unique Identifier
    expect(neuron.bias).to.be.finite; // Random Bias
    expect(neuron.squash).to.be.a("function"); // Activation Function
    // expect(neuron.cost).to.be.a("function"); // Cost Function
    expect(neuron.incoming).to.be.an.instanceOf(Map); // Map Search O(1) vs Array Search O(n)
    expect(neuron.outgoing).to.be.an.instanceOf(Map); // Map Search O(1) vs Array Search O(n)
    expect(neuron.weights).to.be.an.instanceOf(Map); // Map Search O(1) vs Array Search O(n)
  })
  
  it(".connect()", function(){
    const input = new Neuron();
    const output = new Neuron();
    
    const connection = input.connect(output);
    
    // CREATES CONNECTION
    expect(connection).to.be.an.instanceOf(Connection);
    
    // CONNECTION HAS PROPERTIES
    expect(connection.a).to.eql(input);
    expect(connection.b).to.eql(output);
    expect(connection.weight).to.be.finite;
    
    // NEURONS HAVE PROPERTIES
    expect(Object.keys(input.outgoing)).to.include(output.id);
    expect(Object.keys(output.incoming)).to.include(input.id);
  })
  
  it(".activate()", function() {
    const results = [];
    
    // INPUT FORWARDS ENVIRONMENT STIMULUS
    expect(input.activate(data)).to.be.finite.and.equal(data);
    
    // HIDDEN/OUTPUT PULL DATA FROM NETWORK
    // HIDDEN/OUTPUT PROCESS DATA
    expect(hidden.activate()).to.be.finite.and.equal(hidden.squash(hidden.weights[input.id] * input.outputs[input.outputs.length - 1] + hidden.bias));
    expect(output.activate()).to.be.finite.and.equal(output.squash(output.weights[hidden.id] * hidden.outputs[hidden.outputs.length - 1] + output.bias));
  })
  
  it(".propagate()")
})