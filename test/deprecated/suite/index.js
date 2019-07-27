const environment = typeof window === 'object' ? "browser" : (typeof module !== 'undefined' && module.exports) ? "node" : (typeof define !== 'undefined' && define.amd) ? "common" : undefined;

let expect;

switch(environment) {
  case "node":
    expect = require("chai").expect;
    break;
  case "browser":
    expect = window.chai.expect;
    break;
  case "common":
    console.log("common");
    break;
}

const suite = () => {
  describe("true === true",() => {
    it("should be true", () => {
      expect(true).to.be.true;
    })
  })
}


// CommonJS & AMD
if (typeof define !== 'undefined' && define.amd) define([], function () { return suite; });

// Node.js
if (typeof module !== 'undefined' && module.exports) module.exports = suite;

// Browser
if (typeof window === 'object') window['suite'] = suite;