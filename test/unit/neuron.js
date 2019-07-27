const Neuron = require("../../src/neuron");

describe("Neuron", function() {
  describe("new Neuron()", function() {
    it("new Neuron() => {Neuron}", function() {
      const neuron = new Neuron();
      
      expect(neuron).to.be.an.instanceOf(Neuron);
      
      expect(neuron.id).to.be.a("string");
      expect(neuron.bias).to.be.finite;
      
      expect(neuron.incoming.connections).to.exist;
      expect(neuron.incoming.weights).to.exist;
      expect(neuron.incoming.neurons).to.exist;
      
      expect(neuron.outgoing.connections).to.exist;
      expect(neuron.outgoing.weights).to.exist;
      expect(neuron.outgoing.neurons).to.exist;
    })
  })
})