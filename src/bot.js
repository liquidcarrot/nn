// const Neuron = require("./neuron");
const Network = require("./network");

/**
 * @typedef Datum
 *
 * @prop {number[]} inputs
 * @prop {number[]} outputs
 *
 * @example
 * {
 *   "inputs": [0,1],
 *   "outputs": [1]
 * }
 */
 
/**
 * @typedef {Datum[]} Dataset
 *
 * @example
 * [{
 *   "inputs": [0,0],
 *   "outputs": [0]
 * }, {
 *   "inputs": [0,1],
 *   "outputs": [1]
 * }, {
 *   "inputs": [1,0],
 *   "outputs": [1]
 * }, {
 *   "inputs": [1,1],
 *   "outputs": [0]
 * }]
 */
 
/**
 * @typedef {Object[]} JSON
 *
 * @example
 * [{
 *   "a": 0,
 *   "b": 0,
 *   "c": 0
 * }, {
 *   "a": 0,
 *   "b": 1,
 *   "c": 1
 * }, {
 *   "a": 1,
 *   "b": 0,
 *   "c": 1
 * }, {
 *   "a": 1,
 *   "b": 1,
 *   "c": 0
 * }]
 */
 
/**
 * @typedef {string} CSV
 *
 * @example
 * a,b,c
 * 0,0,0
 * 0,1,1
 * 1,0,1
 * 1,1,0
 *
 * @example
 * 0,0,0
 * 0,1,1
 * 1,0,1
 * 1,1,0
 *
 * @example
 * 0;0;0
 * 0;1;1
 * 1;0;1
 * 1;1;0
 */
 
/**
 * @typedef {string} XML
 *
 * @example
 * <?xml version="1.0" encoding="UTF-8"?>
 * <dataset>
 *   <datum>
 *     <a>0</a>
 *     <b>0</b>
 *     <c>0</c>
 *   </datum>
 *   <datum>
 *     <a>0</a>
 *     <b>1</b>
 *     <c>1</c>
 *   </datum>
 *   <datum>
 *     <a>1</a>
 *     <b>0</b>
 *     <c>1</c>
 *   </datum>
 *   <datum>
 *     <a>1</a>
 *     <b>1</b>
 *     <c>0</c>
 *   </datum>
 * </dataset>
 */

/**
 * @constructs Bot
 *
 * @param {Network} [network]
 * @param {Object} [options]
 * @param {Dataset} [options._dataset] Testing dataset
 * @param {Dataset} [options.dataset] Training dataset
 */
function Bot(network, options={}) {
  this.network = network || new Network();
  this.dataset = options.dataset || []; // Training dataset
  this._dataset = options._dataset || options.dataset || []; // Testing dataset
  this.environment;
  
  this.activate = function(input) {
    return this.network.activate(input);
  }
  this.propagate = function(target) {
    return this.network.propagate(target);
  }
  this.train = function(iterations=1) {
    const self = this;
    
    let error = 0;
    
    while(iterations > 0) {
      error = this.dataset.map(function(datum) {
        self.network.activate(datum.inputs);
        return self.network.propagate(datum.outputs);
      }).reduce(function(total, error) {
        return total += error;
      }, 0) / self.dataset.length;
      
      iterations--;
    }
    
    return error;
  }
  
  /**
   * Test the bots performance on the test dataset
   *
   * @param {Object} options
   * @param {boolean} [options.accuracy=false] Iff `true`, returns model accuracy instead of error
   * @param {boolean} [options.round=false] Iff `true`, rounds the output when testing
   *
   * @returns {number} Returns the average error on the test dataset
   */
  this.test = function(options={}) {
    const self = this;
    
    return this._dataset.map(function(datum) {
      self.network.activate(datum.inputs);
      return self.network.propagate(datum.outputs);
    }).reduce(function(total, error) {
      return total += error;
    }, 0) / self._dataset.length;
  }
}

/**
 * @param {Dataset} dataset
 * @param {Object} [options]
 * @param {boolean|number} [options.train=1] Will train `bot` for `options.train` iterations before creating it
 * @param {number} [options.test=0] Will use `options.test` ratio (e.g. `0.2 === 20%`) of the `dataset` for testing the bot's accuracy
 * @param {boolean} [options.shuffle=false] Iff `true`, the dataset will be shuffled before splitting the dataset or training the bot.
 *
 * @returns {Bot}
 */
Bot.fromDataset = function(dataset, options={}) {
  const shuffle = (array) => array.sort(() => Math.random() - 0.5);
  const inputs = Math.max(...dataset.map(function(datum) {
    return datum.inputs.length
  }));
  const outputs = Math.max(...dataset.map(function(datum) {
    return datum.outputs.length
  }));
  
  // Shuffle Dataset
  if(options.shuffle) dataset = shuffle(dataset);
  
  // Create Testing Dataset
  let _dataset = dataset || [];
  if(options.test) {
    options.test = Math.round(dataset.length * options.test) || 1;
    
    _dataset = dataset.slice(0, options.test);
    dataset = dataset.slice(options.test);
  }
  
  // Create Bot
  const bot = new Bot(new Network([inputs, outputs]), {
    _dataset,
    dataset
  })
  
  // Train Bot
  if(options.train) Number.isFinite(options.train) ? bot.train(options.train) : bot.train();
  
  return bot;
}

/**
 * @param {string} url
 * @param {Object} [options]
 *
 * @example
 * const bot = Bot.fromURL(https://liquidcarrot.io/dataset/monkeys.csv)
 */
Bot.fromURL = function(url, options) {
  
}

/**
 * @example JSON
 * const bot = Bot.fromPath("./data.train.json");
 *
 * bot.test(dataset); // { error: 0.01457, accuracy: 96.453%, fitness: 34.3412 }
 *
 * @example CSV
 * const bot = Bot.fromPath("./data.train.csv", { outputs: ["age", "height"] });
 *
 * bot.test(dataset); // { error: 0.01457, accuracy: 96.453%, fitness: 34.3412 }
 *
 * @example XML
 * const bot = Bot.fromPath("./data.train.xml");
 *
 * bot.test(dataset); // { error: 0.01457, accuracy: 96.453%, fitness: 34.3412 }
 *
 *
 */
Bot.fromPath = function(path, options) {
  
}

/**
 * @example Advanced CSV - White Wine Quality
 * const dataset = require("data.cjyvyspsy0000l2m932iv07k1");
 * const bot = Bot.fromString(dataset, {
 *   type: "csv",
 *   headers: true,
 *   outputs: ["quality"],
 *   delimeter: ";",
 *   test: 0.2 // 20% of data will used for testing, not training
 * });
 *
 * bot.test(); // { error: 0.01457, accuracy: 96.453%, fitness: 34.3412 }
 */
Bot.fromString = function(string, options) {
  
}

Bot.fromStream = function(stream, options) {
  
}

/**
 * @param {Object[]} json
 * @param {Object} options
 * @param {number} options.test Ratio of dataset to test (e.g. `0.2` is 20%)
 * @param {string[]} options.outputs JSON Keys which hold "outputs" desired outputs - _bots will try to mimic or recreate these keys given all the other keys in the objects given_
 *
 *
 * @example
 * const dataset = require("@liquid-carrot/data.cjyvyspsy0000l2m932iv07k1");
 * const bot = Bot.fromJSON(dataset, {
 *   outputs: ["quality"],
 *   test: 0.2 // 20% of data will used for testing, not training
 * })
 */
Bot.fromJSON = function(json, options) {
  const keys = new Set();
  
  json.forEach(function(datum) {
    Object.keys(datum).forEach(function(key) {
      keys.add(key);
    })
  })
  
  const outputs = options.outputs;
  const inputs = Array.from(keys).filter(function(key) {
    return outputs.every(function(output) {
      return output !== key;
    })
  })
  
  console.log(Array.from(keys));
  console.log(`Inputs: ${inputs.length}`);
  console.log(`Outputs ${outputs.length}`);
  
  const ineurons = Array.from({ length: inputs.length }, () => new Neuron()); // Input Neurons
  const oneurons = Array.from({ length: outputs.length }, () => new Neuron()); // Output Neurons
  
  ineurons.forEach(function(ineuron) {
    oneurons.forEach(function(oneuron) {
      ineuron.connect(oneuron);
    })
  })
  
  const shuffle = (array) => array.sort(() => Math.random() - 0.5);
  
  json = shuffle(json);
  
  const testing = Math.round(json.length * options.test);
  
  const testset = json.slice(0, testing).map(function(entry) {
    const inps = inputs.map(function(input) {
      return entry[input];
    });
    const outs = outputs.map(function(output) {
      return entry[output];
    })
    
    return {
      inputs: inps,
      outputs: outs
    }
  });
  const trainset = json.slice(testing).map(function(entry) {
    const inps = inputs.map(function(input) {
      return entry[input];
    });
    const outs = outputs.map(function(output) {
      return entry[output];
    })
    
    return {
      inputs: inps,
      outputs: outs
    }
  });
  
  console.log(testing);
  console.log(testset.length);
  console.log(trainset.length);
  
  const activate = function(inputs) {
    ineurons.forEach(function(neuron, index) {
      neuron.activate(inputs[index]);
    });
    return oneurons.map(function(neuron) {
      return neuron.activate();
    })
  }
  const propagate = function(targets) {
    // MSE
    const error = targets.reduce(function(total, target, index) {
      return total += 0.5 * Math.pow(target - oneurons[index].output, 2);
    }, 0)
    
    oneurons.forEach(function(neuron, index) {
      return neuron.propagate(targets[index],0.5);
    })
    ineurons.forEach(function(neuron) {
      return neuron.propagate(undefined,0.5);
    })
    
    return error;
  }
  const train = function(iterations=1) {
    function _train() {
      const error = trainset.reduce(function(total, datum) {
        activate(datum.inputs);
        return total += propagate(datum.outputs);
      }, 0)
      return error / trainset.length;
    }
    const error = Array.from({ length: iterations }, () => {
      const error = _train();
      
      console.log(error);
      
      return error;
    }).reduce(function(total, error) {
      return total += error;
    }, 0);
    
    return error / iterations;
  }
  const test = function() {
    // console.log(testset.length);
    
    const error = testset.reduce(function(total, datum) {
      activate(datum.inputs);
      return total += propagate(datum.outputs);
    }, 0)
    
    // console.log(error);
    
    return error / testset.length;
  }
  
  console.log(train(60));
  console.log(test());
}

module.exports = Bot;