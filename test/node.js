expect = require("chai").expect;

// Unit Tests
require("./unit/connection");
require("./unit/neuron");
require("./unit/group");
require("./unit/network");
require("./unit/bot");

// End-to-End Tests
require("./end-to-end/backpropagation.youtube.1.js");