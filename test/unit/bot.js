const Bot = require("../../src/bot");
const { expect } = require("chai");

describe("Bot", function() {
  describe("White Wine Quality Dataset (https://www.npmjs.com/package/@liquid-carrot/data.cjyvyspsy0000l2m932iv07k1)", function() {
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