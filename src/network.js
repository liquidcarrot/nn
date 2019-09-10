// const uid = require("cuid");
const Connection = require("./connection");
const Neuron = require("./neuron");
const Group = require("./group");
// const vis = require("vis-network");



/**
 * Each `Network` is a collective of neurons functioning as an individual and indepent agent (brain).
 *
 * @constructs Network
 *
 * @param {number[]} sizes
 * @param {number[]} [biases]
 * @param {Array.<number[]>} [weights]
 *
 * @prop {string} id
 * @prop {Group[]} groups
 *
 * @example
 * const { Network } = require("@liquid-carrot/nn");
 *
 * const network = new Network([2,2,1]);
 *
 * network.activate([0,1]);
 * network.propagate([1]);
 */
function Network(network, biases, weights) {
  let self = this;

  this.id = Network.uid();
  this.neurons = [];
  this.connections = [];

  //================================================
  // CORE FUNCTIONS ================================
  //================================================
  /**
   * Activates network
   *
   * @param {number[]} inputs
   *
   * @returns {number[]}
   */
  this.activate = function(inputs) {
    return Math.random() * 2 - 1;

    // const outputs = this.groups.map(function(group, index) {
    //   if(index === 0) return group.activate(inputs);
    //   else return group.activate();
    // })
    //
    // return outputs[outputs.length - 1];
  }

  /**
   * Calculates error & updates network weights
   *
   * @param {number[]} targets
   *
   * @returns {number} Returns Mean-Squared Error (MSE)
   */
  this.propagate= function(targets) {
    return Math.random() * 2 - 1;

    // // MSE Cost
    // const error = this.groups[this.groups.length - 1].neurons.map(function(neuron, index) {
    //   return 0.5 * Math.pow(targets[index] - neuron.output, 2);
    // }).reduce((a,b) => a + b);
    //
    // // Propagate error & update weights
    // this.groups.reverse().forEach(function(group, index) {
    //   if(index === 0) group.propagate(targets);
    //   else return group.propagate();
    // }); this.groups.reverse();
    //
    // return error;
  }
  //================================================
  // END CORE FUNCTIONS ============================
  //================================================

  //================================================
  // UTILITY FUNCTIONS =============================
  //================================================

  /**
  * Returns a JSON representation of the network
  *
  * @returns {Object}
  */
  this.toJSON = function() {
    const neurons = this.neurons.flat(Infinity).map(function(neuron) {
      return neuron.toJSON();
    });
    const connections = this.connections.flat(Infinity).map(function(connection) {
      return connection.toJSON();
    });
    return { neurons, connections }
  }

  /**
  * **BROWSER ONLY**
  *
  * Creates a graph of the network using [`vis-network`](https://www.npmjs.com/package/vis-network) on the given DOMElement
  * or DOMElement ID.
  *
  * @param {string|DOMElement} element - DOMElement, or ID, where graph will ported into
  * @param {Object} [options] - `vis-network` options - [learn more](https://visjs.github.io/vis-network/docs/network/#options)
  */
  this.toGraph = function(element, options) {
    const { neurons, connections } = this.toJSON();

    // Flattens neuron layers from `Network.toJSON` and converts it to `vie-network`
    // nodes
    const nodes = new vis.DataSet(neurons.map(function(neuron) {
      neuron.label = `${neuron.id}`;
      neuron.color = neuron.type === "input" ? "gray" : neuron.type === "output" ? "lime" : "orange"; // "input" || "output" || "hidden"
      return neuron;
    }));
    // Flattens connections from `Network.toJSON` and converts it into `vis-network`
    // edges
    const edges = new vis.DataSet(connections.map(function(connection) {
      connection.arrows = "to";
      return connection;
    }));

    // DOM id
    if(typeof element === "string") element = document.getElementById(element);

    // Vis.js Network Options
    // Will have a "left-to-right" graph with "smooth" lines representing
    // connections by default
    options = options || {
      edges: {
        smooth: {
          type: "cubicBezier",
          forceDirection: "horizontal"
        }
      },
      layout: {
        hierarchical: {
          direction: "LR",
          sortMethod: "directed"
        }
      },
      physics: false
    }

    return new vis.Network(element, { nodes, edges }, options);
  }
  //Code here...

  //================================================
  // END UTILITY FUNCTIONS =========================
  //================================================
}

Network.networks = 0;
Network.uid = function() {
  return ++Network.networks;
}

/**
* Creates a new genome from the two given genomes. Genomes are merged using the
* standard in the [NEAT] algorithm.
*/
Network.crossoverGenomes = function(genomeX, genomeY) {
  const genome = genomeX;

  // Compares and randomly chooses which connections from the different
  // genomes to pass along to the offspring
  genomeY.connections.forEach(function(connectionY) {
    const index = genome.connections.findIndex(function(gene) {
      return gene.id === connectionY.id;
    });

    // Did not have a match for GeneY in GeneX, therefor adding
    // GeneY to the offspring. Also checks to see if the
    // unknown connection has a neuron that is not in the genome
    // yet - in which case, it is added to the genome.
    if(index === -1) {
      // Adds the disjointed or excess connection from genomeY to genomeX
      genome.connections.push(connectionY);

      console.log(`${connectionY.id} from: ${connectionY.from}`);
      console.log(`${connectionY.id} to: ${connectionY.to}`);

      // Adds the neurons from GenomeY to the offsprings genome if it doesn't
      // exist already.
      [connectionY.from, connectionY.to].forEach(function(neuronY) {
        const index = genome.neurons.findIndex(function(neuron) {
          return neuron.id === neuronY;
        });

        // Adds neuron from genome Y to the offsprings genome
        if(index === -1) genome.neurons.push(genomeY.neurons.find(function(neuron) {
          return neuron.id === neuronY;
        }));

        // We can add another selection method here.
        // This just runs a random 50/50 chance selection.
        // There's a 50/50 chance that the neuron will be picked from
        // Genome Y or Genome X.
        else genome.neurons[index] = Math.random() > 0.5 ? genome.neurons[index] : genomeY.neurons.find(function(neuron) {
          return neuron.id === neuronY;
        });
      })
    }
    // There was a match for GeneY in GeneX, therefor randomly picking one
    // to add to offspring
    else {
      // We can add another selection method here
      // This just runs a random 50/50 chance selection
      genome.connections[index] = Math.random() > 0.5 ? genome.connections[index] : connectionY;
    }
  })

  return genome;
}

//================================================
// CONSTRUCTORS ==================================
//================================================

/**
* @param {number[]} sizes - Array of layer fromSizes
*
* @returns {Network}
*
* @example
* const network = Network.fromSizes([20, 10, 3]);
*/
Network.fromSizes = function(sizes) {
  const network = new Network();

  // Create a series of Layers with the sizes given in `this.neurons`.
  // `this.neurons = [[Neuron, Neuron, ...], [Neuron, Neuron, ...], ...]`
  sizes.map(function(size, index) {
    const neurons = [];
    for(let n = 0; n < size; n++) {
      const neuron = new Neuron();

      // Here we set the last layer's neurons' type to "output"
      // and the first layer's neurons' type to "input"
      if(index === sizes.length - 1) neuron.type = "output";
      else if(index === 0) neuron.type = "input";

      neurons.push(neuron);
    }
    network.neurons.push(neurons);
    return neurons;
  })

  // Connects the layers that we just created and stores the connections in
  // `this.connections`
  let previous = network.neurons[0];
  network.neurons.slice(1, network.neurons.length).forEach(function(layer, index) {
    for(let p = 0; p < previous.length; p++) {
      for(let l = 0; l < layer.length; l++) {
        network.connections.push(new Connection(previous[p], layer[l]));
      }
    }
    previous = layer;
  })

  return network;
}
/**
* Creates a network with the given shape (i.e. INPUTSxOUTPUTS). The created
* network will not have any hidden neurons.
*
* @param {number} inputs - Size of the network's input layer
* @param {number} outputs - Size of the network's output layer
*
* @returns {Network}
*/
Network.fromShape = function(inputs, outputs) {
  const network = new Network();

  // Create a network with no hidden layers, whose input layer is equal to
  // `inputs` and whose output layer it equal to `outputs`
  [inputs, outputs].map(function(size, index) {
    const neurons = [];
    for(let n = 0; n < size; n++) {
      const neuron = new Neuron();

      // Here we set the last layer's neurons' type to "output"
      // and the first layer's neurons' type to "input"
      if(index === 1) neuron.type = "output";
      else if(index === 0) neuron.type = "input";

      neurons.push(neuron);
    }
    network.neurons.push(neurons);
    return neurons;
  })

  // Connects the layers that we just created and stores the connections in
  // `this.connections`
  let previous = network.neurons[0];
  network.neurons.slice(1, network.neurons.length).forEach(function(layer, index) {
    for(let p = 0; p < previous.length; p++) {
      for(let l = 0; l < layer.length; l++) {
        network.connections.push(new Connection(previous[p], layer[l]));
      }
    }
    previous = layer;
  });

  return network;
}
/**
* Creates a deep copy of the given genome
*
* @param {Genome} genome
*
* @returns {Network}
*/
Network.fromGenome = function(genome) {
  const network = new Network();

  // Creates a copy of neuron in the given network in the new network.
  genome.neurons.forEach(function(neuron) {
    network.neurons.push(new Neuron(neuron));
  });

  // Creates a deep copy of all the connections inthe given network into the new network.
  // Even transpiles all the references in connections to refer to the new network.
  genome.connections.forEach(function(connection) {
    // Find the neurons in the new network that will create work to create
    // the same endpoints as the given connection.
    const from = network.neurons.find(function(neuron) {
      return neuron.id === connection.from;
    });
    const to = network.neurons.find(function(neuron) {
      return neuron.id === connection.to;
    });

    // Deep copies a new connection into the created network
    network.connections.push(new Connection(from, to, connection.weight));
  });

  // Code here...

  return network;
}

//================================================
// END CONSTRUCTORS ==============================
//================================================


//================================================
// TYPE DEFINITIONS ==============================
//================================================


//================================================
// END TYPE DEFINITIONS ==========================
//================================================

module.exports = Network;
