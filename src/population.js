// const stream = require("highland");
// const fake = require("faker");

function activate(inputs) {
  return inputs - 2 * 30 + "";
}

// const inputs = [Math.random(), Math.random(), Math.random()];

// const output = stream(inputs).map(activate).collect().toCallback(function(error, values) {
//   console.log(values);
// });

// console.log(output);

// .map(activate).collect().toCallback(function(error, values) {
//   console.log(values);
// })


// const input = function(word) {
//   this.stream = stream();

//   this.activate = function(word) {
//     this.stream.write(word)
//   }
// }

// const hidden = function() {
//   this.stream = stream();

//   this.connections = [];

//   this.connect = function(a) {
//     this.connections.push(a);
//     this.stream = stream(this.connections);
//   }

//   this.activate = function() {
//     const word = this.stream.map(function(word) {
//       return word + " " + fake.lorem.word();
//     }).parallel(10);

//     return word;
//   }
// }

// const output = function() {
//   this.stream = stream();

//   this.connections = [];

//   this.connect = function(a) {
//     this.connections.push(a);
//     this.stream = stream(this.connections);
//   }

//   this.activate = function() {
//     const word = this.stream.map(function(word) {
//       return word + " " + fake.lorem.word();
//     }).parallel(10);

//     return word;
//   }
// }



// const network = function() {
//   this.activate = function(callback) {

//   }
// }


// const inputs = stream([stream().write(fake.lorem.word()), stream().write(fake.lorem.word()), stream().write(fake.lorem.word())]);
// // const inputs = stream([fake.lorem.word(), fake.lorem.word(), fake.lorem.word()]);
// const morewords = function(word) {
//   return word + " " + fake.lorem.word()
// }

// const words = inputs.map(morewords).collect().toCallback(function(error, value) {
//   console.log(value);
// });

// console.log(inputs);
// console.log(words);























//===================================================================================================



// function Network() {
//   this.weights = [
//     [
//       [0.1, 0.15], // H(1,1)
//       [0.2, 0.25]  // H(1,2)
//     ],
//     [
//       [0.3, 0.35], // H(2,1)
//       [0.4, 0.45]  // H(2,2)
//     ],
//     [
//       [0.5, 0.55]  // O1
//     ]
//   ];
//   this.biases = [
//     [0.6, 0.6],
//     [0.65, 0.65],
//     [0.7]
//   ];

//   this.outputs = [];
//   this._outputs = [];
//   this.error = [];

//   function dot(a, b) {
//     return a.map(function(_, i) {
//       return a[i] * b[i]
//     }).reduce(function(m, n) {
//       return m + n
//     })
//   }

//   function squash(x) {
//     return 1 / (1 + Math.exp(-x));
//   }
//   function _squash(x) {
//     return squash(x) * (1 - squash(x));
//   }

//   this.activate = function(input) {
//     this.outputs = [];
//     this.outputs.push(input);

//     // this.weights.forEach(function(_,l) {
//     //   _.forEach(function(weight, n) {
//     //     if(l === 0) {
//     //       this.outputs.push([
//     //         squash(dot(this.weights[l][n], input) + this.biases[l][n]),
//     //         squash(dot(this.weights[l][n], input) + this.biases[l][n])
//     //       ]);
//     //     } else {

//     //     }
//     //   })
//     // })

//     // L === 1
//     this.outputs.push([
//       squash(dot(this.weights[0][0], input) + this.biases[0][0]),
//       squash(dot(this.weights[0][1], input) + this.biases[0][1])
//     ]);

//     this.outputs.push([
//       squash(dot(this.weights[1][0], this.outputs[1]) + this.biases[1][0]),
//       squash(dot(this.weights[1][1], this.outputs[1]) + this.biases[1][1])
//     ]);

//     this.outputs.push([
//       squash(dot(this.weights[2][0], this.outputs[2]) + this.biases[2][0])
//     ])


//     return this.outputs;;
//   }

//   this.propagate = function(targets) {

//   }
// }

// const network = new Network();

// console.log(network);
// console.log(network.activate([0.01, 0.99]));



//===================================================================================================





// const Network = require("./network");

// const sign = () => Math.random() > 0.5 ? 1 : -1;
// const random = () => sign() * Math.random();

// // Neurons will be denoted as N[LAYER][NEURON]

// const network_one = Array.from({ length: 5 }, () => random());
// const network_two = Array.from({ length: 5 }, () => random());



// console.log(`Network 1:`);
// console.log(network_one);
// console.log();

// console.log(`Network 2:`);
// console.log(network_two);
// console.log();

// function crossover(mother, father) {
//   const rate = 0.5;

//   return mother.map(function(_, gene) {
//     return Math.random() < rate ? mother[gene] : father[gene];
//   })
// }

// function mutate(child) {
//   const rate = 0.1;

//   return child.map(function(_, gene) {
//     return Math.random() < rate ? random() : _;
//   })
// }

// const network_child = crossover(network_one, network_two);

// console.log(`Network "Child":`);
// console.log(network_child);
// console.log();

// const network_mutated = mutate(network_child);

// console.log(`Network "Mutated":`);
// console.log(network_mutated);
// console.log();
