const Network = require("../../src/network");
const Bot = require("../../src/bot");
const { expect } = require("chai");

describe("Bot", function() {
  describe("new Bot()", function() {
    it("should create a new bot w/ given network", function() {
      const network = new Network([2,1]);
      const bot = new Bot(network);
      
      expect(bot).to.have.property("network").which.is.an.instanceOf(Network);
      expect(bot).to.have.property("dataset").which.is.an("array");
      expect(bot).to.have.property("_dataset").which.is.an("array");
      
      expect(bot.network).to.eql(network);
    })
    it("should create a new bot w/ given network & dataset", function() {
      const dataset = [
        { inputs: [0,0], outputs: [0] },
        { inputs: [0,1], outputs: [0] },
        { inputs: [1,0], outputs: [0] },
        { inputs: [1,1], outputs: [1] }
      ];
      const network = new Network([2,1]);
      const bot = new Bot(network, {
        dataset
      });
      
      expect(bot).to.have.property("network").which.is.an.instanceOf(Network);
      expect(bot).to.have.property("dataset").which.is.an("array");
      expect(bot).to.have.property("_dataset").which.is.an("array");
      
      expect(bot.network).to.eql(network);
      expect(bot.dataset).to.eql(dataset);
      expect(bot._dataset).to.eql(dataset);
    })
  })
  describe("bot.activate()", function() {
    it("should activate network", function() {
      
      const network = new Network([2,2], [0, 0.3], [[0.1, 0.2, 0.3, 0.4]]);
      const bot = new Bot(network);
      
      const output = bot.activate([0,1]);
      
      expect(output[0]).to.be.closeTo(0.6456563062257954, 0.000000000001);
      expect(output[1]).to.be.closeTo(0.6681877721681662, 0.000000000001);
    })
  })
  describe("bot.propagate()", function() {
    it("should propagate error", function() {
      const network = new Network([2,2], [0, 0.3], [[0.1, 0.2, 0.3, 0.4]]);
      const bot = new Bot(network);
      
      const output = bot.activate([0,1]);
      const error = bot.propagate([0.3, 0.6]);
      
      expect(error).to.be.closeTo(0.06206392715345929, 0.000000000001);
    })
    it("should update weights", function() {
      const network = new Network([2,2], [0, 0.3], [[0.1, 0.2, 0.3, 0.4]]);
      const bot = new Bot(network);
      
      const output = bot.activate([0,1]);
      
      const error = bot.propagate([0.3, 0.6]);
      
      // W[0]
      expect(bot.network.groups[0].neurons[0].outgoing.weights[bot.network.groups[1].neurons[0].id]).to.eql(0.1);
      // W[1]
      expect(bot.network.groups[0].neurons[0].outgoing.weights[bot.network.groups[1].neurons[1].id]).to.eql(0.2);
      // W[2]
      expect(bot.network.groups[0].neurons[1].outgoing.weights[bot.network.groups[1].neurons[0].id]).to.be.closeTo(0.2762757853563233, 0.000000000001);
      // W[3]
      expect(bot.network.groups[0].neurons[1].outgoing.weights[bot.network.groups[1].neurons[1].id]).to.be.closeTo(0.39546456793274204, 0.000000000001);
    })
  })
  describe("bot.test()", function() {
    it("should test network", function() {
      const dataset = [
        { inputs: [0,0], outputs: [0] },
        { inputs: [0,1], outputs: [0] },
        { inputs: [1,0], outputs: [0] },
        { inputs: [1,1], outputs: [1] }
      ];
      const network = new Network([2,1]);
      const bot = new Bot(network, {
        dataset
      });
      
      const error = bot.test();
      
      expect(error).to.be.finite;
    })
  })
  describe("bot.train()", function() {
    it("should train network", function() {
      const dataset = [
        { inputs: [0,0], outputs: [0] },
        { inputs: [0,1], outputs: [0] },
        { inputs: [1,0], outputs: [0] },
        { inputs: [1,1], outputs: [1] }
      ];
      const network = new Network([2,1]);
      const bot = new Bot(network, {
        dataset
      });
      
      const initial = bot.test();
      bot.train(100);
      const final = bot.test();
      
      expect(final).to.be.at.most(initial);
    })
  })
  describe("Bot.fromDataset()", function() {
    it("should create a bot", function() {
      const dataset = [
        { inputs: [0,0], outputs: [0] },
        { inputs: [0,1], outputs: [0] },
        { inputs: [1,0], outputs: [0] },
        { inputs: [1,1], outputs: [1] }
      ];
      const bot = Bot.fromDataset(dataset)
      
      expect(bot.dataset).to.be.an("array").with.lengthOf(4);
      expect(bot._dataset).to.be.an("array").with.lengthOf(4);
      expect(bot.network).to.be.an.instanceOf(Network);
      expect(bot.network.groups).to.have.lengthOf(2);
      expect(bot.network.groups[0].neurons).to.have.lengthOf(2);
      expect(bot.network.groups[1].neurons).to.have.lengthOf(1);
    })
  })
  
  
  describe.skip("Pima Indians Diabetes Dataset (https://www.npmjs.com/package/@liquid-carrot/data.pima-indians-diabetes)", function() {
    it("should work", function() {
      const dataset = require("@liquid-carrot/data.pima-indians-diabetes");
      const bot = Bot.fromJSON(dataset);
      
      const initial = bot.test();
      bot.train();
      const final = bot.test();
    })
  })
  
  
  
  describe.skip("White Wine Quality Dataset (https://www.npmjs.com/package/@liquid-carrot/data.cjyvyspsy0000l2m932iv07k1)", function() {
    const dataset = require("@liquid-carrot/data.cjyvyspsy0000l2m932iv07k1");
    
    it("should work", function() {
      this.timeout(10000);
      
      console.log(dataset.length);
      const bot = Bot.fromJSON(dataset, {
        outputs: ["quality"],
        test: 0.2
      });
    })
  })
})