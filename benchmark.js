// const Bot = require("./src/bot");

// // AND Logic Gates
// // const dataset = [
// //   { inputs: [0,0], outputs: [0] },
// //   { inputs: [0,1], outputs: [0] },
// //   { inputs: [1,0], outputs: [0] },
// //   { inputs: [1,1], outputs: [1] },
// // ];


// const dataset = [
//   { inputs: [0.62, 0.72, 0.88], outputs: [1] },
//   { inputs: [0.1, 0.84, 0.72], outputs: [1] },
//   { inputs: [0.33, 0.24, 0.29], outputs: [0] },
//   { inputs: [0.74, 0.78, 0.86], outputs: [1] },
//   { inputs: [0.31, 0.35, 0.41], outputs: [0] },
//   { inputs: [1, 0.99, 0], outputs: [1] },
//   { inputs: [1, 0.42, 0.52], outputs: [0] },
//   { inputs: [1, 1, 1], outputs: [1] },
//   { inputs: [0.5, 0.5, 0.75], outputs: [0] },
//   { inputs: [0.57, 0.73, 0.27], outputs: [0] }
// ];

// const bot = Bot.fromDataset(dataset, {train: 100});

// // console.log("Initial Accuracy: " + ((1 - bot.test()) * 100) + "%");

// // bot.train(1000);

// console.log("Final Accuracy: " + ((1 - bot.test()) * 100) + "%");














































































// // const Benchmark = require("benchmark").Suite;
// // const synaptic = require("synaptic");
// // const tf = require("@tensorflow/tfjs");
// // const Neuron = require("./src/neuron");

// // // console.log(tf);

// // const bench = new Benchmark();

// // const TIMES = 1000;


// // bench.add("Synaptic: new Neuron()", function() {
// //   for(let i = 0; i < TIMES; i++) {
// //     new synaptic.Neuron();
// //   }
// // }, {
// //   minSamples: 100
// // }).add("Liquid Carrot: new Neuron()", function() {
// //   for(let i = 0; i < TIMES; i++) {
// //     new Neuron();
// //   }
// // }, {
// //   minSamples: 100
// // }).add("TensorFlow: new tf.Tensor()", function() {
// //   for(let i = 0; i < TIMES; i++) {
// //     new tf.tensor([i]);
// //   }
// // }, {
// //   minSamples: 100
// // }).on("cycle", function(event) {
// //   console.log(String(event.target));
// // }).on("complete", function() {
// //   console.log('Fastest is ' + this.filter('fastest').map('name'));
// // }).run()





















































































































































// // const cluster = require("cluster");
// // const cores = require("os").cpus().length;

// // if(cluster.isMaster) {
// //   console.log(`Master ${process.pid} is running`);
// //   const workers = Array.from({ length: cores }, () => cluster.fork());
  
// //   workers.forEach(function(worker, index) {
// //     worker.send({
// //       a: 0,
// //       b: false,
// //       c: new Date(),
// //       d: "string",
// //       e: function() {},
// //       f: {
// //         g: "cheese"
// //       }
// //     });
// //   })
  
// //   cluster.on("exit", (worker, code, signal) => console.log(`Worker ${worker.process.pid} died`));
  
// // } else {
// //   console.log(`Worker ${process.pid} started`);
  
// //   process.on("message", function(message) {
// //     console.log(message);
// //   })
// // }