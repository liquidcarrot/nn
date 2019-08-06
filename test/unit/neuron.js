const Connection = require("../../src/connection");
const Neuron = require("../../src/neuron");
const { expect } = require("chai");

describe("Neuron", function() {
  describe("new Neuron()", function() {
    it("should create new neuron", function() {
      const neuron = new Neuron();
      
      expect(neuron.id).to.be.a("string");
      expect(neuron.bias).to.be.finite;
    })
    it("should create new neuron w/ bias", function() {
      const bias = Math.random() * 2 -  1;
      const neuron = new Neuron(bias);
      
      expect(neuron).to.be.an.instanceOf(Neuron);
      
      expect(neuron.id).to.be.a("string");
      expect(neuron.bias).to.eql(bias);
    })
  })
  describe("neuron.connect()", function() {
    it("should connect neurons", function() {
      const neuron = new Neuron();
      const other = new Neuron();
      
      neuron.connect(other);
      
      expect(neuron.outgoing.targets[other.id]).to.eql(other);
      expect(other.incoming.targets[neuron.id]).to.eql(neuron);
    })
  })
  describe("neuron.activate()", function() {
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
  describe("neuron.propagate()", function() {
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

// describe("Neuron", function() {
//   describe("new Neuron()", function() {
//     it("new Neuron() => Neuron {}", function() {
//       const neuron = new Neuron();
      
//       expect(neuron).to.be.an.instanceOf(Neuron);
      
//       expect(neuron.id).to.be.a("string");
//       expect(neuron.bias).to.be.finite;
      
//       expect(neuron.incoming.connections).to.exist;
//       // expect(neuron.incoming.weights).to.exist;
//       // expect(neuron.incoming.neurons).to.exist;
      
//       expect(neuron.outgoing.connections).to.exist;
//       // expect(neuron.outgoing.weights).to.exist;
//       // expect(neuron.outgoing.neurons).to.exist;
//     })
//     it("new Neuron(bias) => Neuron { bias: bias }", function() {
//       const bias = Math.random() * 2 -  1;
//       const neuron = new Neuron(bias);
      
//       expect(neuron).to.be.an.instanceOf(Neuron);
      
//       expect(neuron.id).to.be.a("string");
//       expect(neuron.bias).to.eql(bias);
      
//       expect(neuron.incoming.connections).to.exist;
//       // expect(neuron.incoming.weights).to.exist;
//       // expect(neuron.incoming.neurons).to.exist;
      
//       expect(neuron.outgoing.connections).to.exist;
//       // expect(neuron.outgoing.weights).to.exist;
//       // expect(neuron.outgoing.neurons).to.exist;
//     })
//   })
//   describe("neuron.connect()", function() {
//     it("neuron.connect(other) => Connection { a: neuron, b: other }", function() {
//       const neuron = new Neuron();
//       const other = new Neuron();
      
//       const connection = neuron.connect(other);
      
//       expect(connection).to.be.an.instanceOf(Connection); // Returns an instance of `Connection`
//       expect(connection.a).to.eql(neuron); // Connections have two sides
//       expect(connection.b).to.eql(other); // Connections have two sides
//       expect(connection.weight).to.be.finite; // Connections have a weight
      
//       // neuron.outgoing.weights === { "[CONNECTION_ID]": weight, "[NEURON_ID]": weight }
//       // expect(Object.keys(neuron.outgoing.weights)).to.have.lengthOf(2);
//       // expect(neuron.outgoing.weights[connection.id]).to.eql(connection.weight);
//       // expect(neuron.outgoing.weights[other.id]).to.eql(connection.weight);
      
//       // neuron.outgoing.connections === { "[CONNECTION_ID]": connection, "[NEURON_ID]": connection }
//       expect(Object.keys(neuron.outgoing.connections)).to.have.lengthOf(1);
//       // expect(neuron.outgoing.connections[connection.id]).to.eql(connection);
//       expect(neuron.outgoing.connections[other.id]).to.eql(connection);
      
//       // neuron.outgoing.neurons === { "[NEURON_ID]": connection }
//       // expect(Object.keys(neuron.outgoing.neurons)).to.have.lengthOf(1);
//       // expect(neuron.outgoing.neurons[other.id]).to.eql(other);
      
//       // other.incoming.weights === { "[CONNECTION_ID]": weight, "[NEURON_ID]": weight }
//       // expect(Object.keys(other.incoming.weights)).to.have.lengthOf(2);
//       // expect(other.incoming.weights[connection.id]).to.eql(connection.weight);
//       // expect(other.incoming.weights[neuron.id]).to.eql(connection.weight);
      
//       // other.incoming.connections === { "[CONNECTION_ID]": connection, "[NEURON_ID]": connection }
//       expect(Object.keys(other.incoming.connections)).to.have.lengthOf(1);
//       // expect(other.incoming.connections[connection.id]).to.eql(connection);
//       expect(other.incoming.connections[neuron.id]).to.eql(connection);
      
//       // other.incoming.neurons === { "[NEURON_ID]": connection }
//       // expect(Object.keys(other.incoming.neurons)).to.have.lengthOf(1);
//       // expect(other.incoming.neurons[neuron.id]).to.eql(neuron);
//     })
//   })
// })