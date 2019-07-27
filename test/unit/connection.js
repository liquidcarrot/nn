const Connection = require("../../src/connection");

describe("Connection", function() {
  describe("new Connection()", function() {
    it("new Connection(from, to) => {Connection}", function() {
      const from = "from";
      const to = "to";
      const connection = new Connection(from, to);
      
      expect(connection).to.be.an.instanceOf(Connection);
      expect(connection.id).to.be.a("string");
      expect(connection.a).to.eql(from);
      expect(connection.b).to.eql(to);
      expect(connection.weight).to.be.finite;
    })
    it("new Connection(from, to, weight) => {Connection}", function() {
      const from = "from";
      const to = "to";
      const weight = Math.random() * 2 - 1;
      const connection = new Connection(from, to, weight);
      
      expect(connection).to.be.an.instanceOf(Connection);
      expect(connection.id).to.be.a("string");
      expect(connection.a).to.eql(from);
      expect(connection.b).to.eql(to);
      expect(connection.weight).to.eql(weight);
    })
  })
})