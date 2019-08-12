expect = require("chai").expect;

// Unit Tests
require("./unit/connection");
require("./unit/neuron");
require("./unit/group");
require("./unit/network");

// End-to-End Tests
require("./end-to-end/backpropagation.youtube.1.js");