## Classes

<dl>
<dt><a href="#Bot">Bot</a></dt>
<dd></dd>
<dt><a href="#Connection">Connection</a></dt>
<dd></dd>
<dt><a href="#Group">Group</a></dt>
<dd></dd>
<dt><a href="#Network">Network</a></dt>
<dd></dd>
<dt><a href="#Neuron">Neuron</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Datum">Datum</a></dt>
<dd></dd>
<dt><a href="#Dataset">Dataset</a> : <code><a href="#Datum">Array.&lt;Datum&gt;</a></code></dt>
<dd></dd>
<dt><a href="#JSON">JSON</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#CSV">CSV</a> : <code>string</code></dt>
<dd></dd>
<dt><a href="#XML">XML</a> : <code>string</code></dt>
<dd></dd>
</dl>

<a name="Bot"></a>

## Bot
**Kind**: global class  

* [Bot](#Bot)
    * [new Bot([network], [options])](#new_Bot_new)
    * _instance_
        * [.test(options)](#Bot+test) ⇒ <code>number</code>
    * _static_
        * [.fromDataset(dataset, [options])](#Bot.fromDataset) ⇒ [<code>Bot</code>](#Bot)
        * [.fromURL(url, [options])](#Bot.fromURL)
        * [.fromPath()](#Bot.fromPath)
        * [.fromString()](#Bot.fromString)
        * [.fromJSON(json, options)](#Bot.fromJSON)

<a name="new_Bot_new"></a>

### new Bot([network], [options])

| Param | Type | Description |
| --- | --- | --- |
| [network] | [<code>Network</code>](#Network) |  |
| [options] | <code>Object</code> |  |
| [options._dataset] | [<code>Dataset</code>](#Dataset) | Testing dataset |
| [options.dataset] | [<code>Dataset</code>](#Dataset) | Training dataset |

<a name="Bot+test"></a>

### bot.test(options) ⇒ <code>number</code>
Test the bots performance on the test dataset

**Kind**: instance method of [<code>Bot</code>](#Bot)  
**Returns**: <code>number</code> - Returns the average error on the test dataset  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| [options.accuracy] | <code>boolean</code> | <code>false</code> | Iff `true`, returns model accuracy instead of error |
| [options.round] | <code>boolean</code> | <code>false</code> | Iff `true`, rounds the output when testing |

<a name="Bot.fromDataset"></a>

### Bot.fromDataset(dataset, [options]) ⇒ [<code>Bot</code>](#Bot)
**Kind**: static method of [<code>Bot</code>](#Bot)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataset | [<code>Dataset</code>](#Dataset) |  |  |
| [options] | <code>Object</code> |  |  |
| [options.train] | <code>boolean</code> \| <code>number</code> | <code>1</code> | Will train `bot` for `options.train` iterations before creating it |
| [options.test] | <code>number</code> | <code>0</code> | Will use `options.test` ratio (e.g. `0.2 === 20%`) of the `dataset` for testing the bot's accuracy |
| [options.shuffle] | <code>boolean</code> | <code>false</code> | Iff `true`, the dataset will be shuffled before splitting the dataset or training the bot. |

<a name="Bot.fromURL"></a>

### Bot.fromURL(url, [options])
**Kind**: static method of [<code>Bot</code>](#Bot)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [options] | <code>Object</code> | 

**Example**  
```js
const bot = Bot.fromURL(https://liquidcarrot.io/dataset/monkeys.csv)
```
<a name="Bot.fromPath"></a>

### Bot.fromPath()
**Kind**: static method of [<code>Bot</code>](#Bot)  
**Example**  
```js
JSON
const bot = Bot.fromPath("./data.train.json");

bot.test(dataset); // { error: 0.01457, accuracy: 96.453%, fitness: 34.3412 }
```
**Example**  
```js
CSV
const bot = Bot.fromPath("./data.train.csv", { outputs: ["age", "height"] });

bot.test(dataset); // { error: 0.01457, accuracy: 96.453%, fitness: 34.3412 }
```
**Example**  
```js
XML
const bot = Bot.fromPath("./data.train.xml");

bot.test(dataset); // { error: 0.01457, accuracy: 96.453%, fitness: 34.3412 }
```
<a name="Bot.fromString"></a>

### Bot.fromString()
**Kind**: static method of [<code>Bot</code>](#Bot)  
**Example**  
```js
Advanced CSV - White Wine Quality
const dataset = require("data.cjyvyspsy0000l2m932iv07k1");
const bot = Bot.fromString(dataset, {
  type: "csv",
  headers: true,
  outputs: ["quality"],
  delimeter: ";",
  test: 0.2 // 20% of data will used for testing, not training
});

bot.test(); // { error: 0.01457, accuracy: 96.453%, fitness: 34.3412 }
```
<a name="Bot.fromJSON"></a>

### Bot.fromJSON(json, options)
**Kind**: static method of [<code>Bot</code>](#Bot)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>Array.&lt;Object&gt;</code> |  |
| options | <code>Object</code> |  |
| options.test | <code>number</code> | Ratio of dataset to test (e.g. `0.2` is 20%) |
| options.outputs | <code>Array.&lt;string&gt;</code> | JSON Keys which hold "outputs" desired outputs - _bots will try to mimic or recreate these keys given all the other keys in the objects given_ |

**Example**  
```js
const dataset = require("@liquid-carrot/data.cjyvyspsy0000l2m932iv07k1");
const bot = Bot.fromJSON(dataset, {
  outputs: ["quality"],
  test: 0.2 // 20% of data will used for testing, not training
})
```
<a name="Connection"></a>

## Connection
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique connection ID |
| a | [<code>Neuron</code>](#Neuron) \| [<code>Group</code>](#Group) | Side "A" of connection(s) |
| b | [<code>Neuron</code>](#Neuron) \| [<code>Group</code>](#Group) | Side "B" of connection(s) |
| [weight] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | Weight of connection(s) |


* [Connection](#Connection)
    * [new Connection(a, b, [weight], [options])](#new_Connection_new)
    * [.uid(fromID, toID)](#Connection.uid) ⇒ <code>number</code>

<a name="new_Connection_new"></a>

### new Connection(a, b, [weight], [options])
Connections help:
    * a) control the flow information inside of a neural network
    * b) describe the shape of a neural network
    * c) ease the use of Evolutionary Algoriths

To facilitate the use of Evolutionary Algoriths, Connections are given Unique
_Temporal-Structural IDs_ using the [Cantor Pairing Algorithm](https://en.wikipedia.org/wiki/Pairing_function).

_Temporal-Structural IDs_: are not only a method of uniquely identifying a
connection, they also allow us to identify a) where in the network the
connection exists (i.e. between what neurons), and b) when it was
"created-ish".

Connection IDs created using the _Cantor Pairing Algorithm_ enable stronger
algorithms, i.e. NEAT/HyperNEAT, to create networks of arbitrary
sizes/shapes.


| Param | Type | Description |
| --- | --- | --- |
| a | [<code>Neuron</code>](#Neuron) \| [<code>Group</code>](#Group) | Neuron(s) on one edge of the connection |
| b | [<code>Neuron</code>](#Neuron) \| [<code>Group</code>](#Group) | Neruon(s) on another edge of the connection |
| [weight] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | Weight of connection(s) |
| [options] | <code>Object</code> |  |

**Example**  
```js
const connection = new Connection(neuron, other) // Connection { a: neuron, b: other }

const connection = new Connection(neuron, other, 0.3) // Connection { a: neuron, b: other, weight: 0.3 }
```
<a name="Connection.uid"></a>

### Connection.uid(fromID, toID) ⇒ <code>number</code>
Creates a unique structural ID for connection between two neurons using the
[Cantor Pairing Algorithm](https://en.wikipedia.org/wiki/Pairing_function).

The _Cantor Pairing Algorithm_ us to a) mathematically, map any two
non-negative integers to a unique positive integer - it even is sensetive to
order (i.e. `Connection.uid([2,3]) !== Connection.uid([3,2])`), and b) "AI-ly"
it allows to keep track of unique structural connections across time as a
neural network mutates (i.e. changes "shape").

**Kind**: static method of [<code>Connection</code>](#Connection)  
**Returns**: <code>number</code> - A unique integer ID created using the [Cantor Pairing Algorithm](https://en.wikipedia.org/wiki/Pairing_function)  

| Param | Type | Description |
| --- | --- | --- |
| fromID | <code>number</code> | ID of _source_ neuron |
| toID | <code>number</code> | ID of _destination_ neuron |

<a name="Group"></a>

## Group
**Kind**: global class  
**Properties**

| Name | Type |
| --- | --- |
| id | <code>string</code> | 
| neurons | [<code>Array.&lt;Neuron&gt;</code>](#Neuron) | 


* [Group](#Group)
    * [new Group([size], [bias])](#new_Group_new)
    * [.connect(target, [weights])](#Group+connect)
    * [.activate([inputs])](#Group+activate) ⇒ <code>Array.&lt;number&gt;</code>
    * [.propagate([targets], [rate])](#Group+propagate) ⇒ <code>Array.&lt;number&gt;</code>

<a name="new_Group_new"></a>

### new Group([size], [bias])
A `Group` is an abstraction of `Neuron` and a tool for creating and manipulating a group of neurons - with `Group` we can create neural network layers and and build networks faster than neuron-by-neuron construction.


| Param | Type |
| --- | --- |
| [size] | <code>number</code> | 
| [bias] | <code>number</code> | 

<a name="Group+connect"></a>

### group.connect(target, [weights])
**Kind**: instance method of [<code>Group</code>](#Group)  

| Param | Type |
| --- | --- |
| target | [<code>Group</code>](#Group) | 
| [weights] | <code>Array.&lt;number&gt;</code> | 

**Example**  
```js
//===============================================
// 2x2 (No Weights) =============================
//===============================================
const { Group } = require("@liquidcarrot/nn")

const group = new Group(2);
const other = new Group(2);

group.connect(other);

//===============================================
// 2x2 (Weights) =============================
//===============================================
const { Group } = require("@liquidcarrot/nn")

const group = new Group(2);
const other = new Group(2);

// group[0] -- weights[0] --> other[0]
// group[0] -- weights[1] --> other[1]
// group[1] -- weights[2] --> other[0]
// group[1] -- weights[3] --> other[1]
group.connect(other, [0.1, 0.2, 0.3, 0.4]);
```
<a name="Group+activate"></a>

### group.activate([inputs]) ⇒ <code>Array.&lt;number&gt;</code>
**Kind**: instance method of [<code>Group</code>](#Group)  

| Param | Type |
| --- | --- |
| [inputs] | <code>Array.&lt;number&gt;</code> | 

**Example**  
```js
//===============================================
// One Group (No Hidden Layers) =================
//===============================================
const { Group } = require("@liquidcarrot/nn")

const group = new Group(2);

neuron.activate([0, 0]); // [0, 0]

//===============================================
// Three Groups (Hidden Layers) =================
//===============================================
const { Group } = require("@liquidcarrot/nn")

const input = new Group(2); // Input Neuron (Layer)
const hidden = new Group(2,0.1); // Hidden Neuron (Layer)
const output = new Group(2,0.15); // Output Neuron (Layer)

input.connect(hidden, [0.2,0.25,0.3,0.35]); // Connects input layer to hidden layer
hidden.connect(output, [0.4,0.45,0.5,0.55]); // Connects hidden layer to output layer

input.activate([0,0]); // [0,0]
hidden.activate(); // [0.###, 0.###]
output.activate(); // [0.###, 0.###]
```
<a name="Group+propagate"></a>

### group.propagate([targets], [rate]) ⇒ <code>Array.&lt;number&gt;</code>
**Kind**: instance method of [<code>Group</code>](#Group)  

| Param | Type | Default |
| --- | --- | --- |
| [targets] | <code>Array.&lt;number&gt;</code> |  | 
| [rate] | <code>number</code> | <code>0.3</code> | 

**Example**  
```js
//===============================================
// One Group (No Hidden Layers) =================
//===============================================
const { Group } = require("@liquidcarrot/nn")

const group = new Group(2);

neuron.activate([0, 0]); // [0, 0]
neuron.propagate([0, 1]); // [0, -1]

//===============================================
// Three Groups (Hidden Layers) =================
//===============================================
const { Group } = require("@liquidcarrot/nn")

const input = new Group(2); // Input Neuron (Layer)
const hidden = new Group(2,0.1); // Hidden Neuron (Layer)
const output = new Group(2,0.15); // Output Neuron (Layer)

input.connect(hidden, [0.2,0.25,0.3,0.35]); // Connects input layer to hidden layer
hidden.connect(output, [0.4,0.45,0.5,0.55]); // Connects hidden layer to output layer

input.activate([0,0]); // [0,0]
hidden.activate(); // [0.###, 0.###]
output.activate(); // [0.###, 0.###]

output.propagate([0, 1]); //  [0, -1]
hidden.propagate(); // [0.###, 0.###]
input.propagate(); // [0.###, 0.###]
```
<a name="Network"></a>

## Network
**Kind**: global class  
**Properties**

| Name | Type |
| --- | --- |
| id | <code>string</code> | 
| groups | [<code>Array.&lt;Group&gt;</code>](#Group) | 


* [Network](#Network)
    * [new Network(sizes, [biases], [weights])](#new_Network_new)
    * _instance_
        * [.activate(inputs)](#Network+activate) ⇒ <code>Array.&lt;number&gt;</code>
        * [.propagate(targets)](#Network+propagate) ⇒ <code>number</code>
        * [.toJSON()](#Network+toJSON) ⇒ <code>Object</code>
        * [.toGraph(element, [options])](#Network+toGraph)
    * _static_
        * [.fromSizes(sizes)](#Network.fromSizes) ⇒ [<code>Network</code>](#Network)
        * [.fromShape(inputs, outputs)](#Network.fromShape) ⇒ [<code>Network</code>](#Network)
        * [.fromGenome(genome)](#Network.fromGenome) ⇒ [<code>Network</code>](#Network)

<a name="new_Network_new"></a>

### new Network(sizes, [biases], [weights])
Each `Network` is a collective of neurons functioning as an individual and indepent agent (brain).


| Param | Type |
| --- | --- |
| sizes | <code>Array.&lt;number&gt;</code> | 
| [biases] | <code>Array.&lt;number&gt;</code> | 
| [weights] | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | 

**Example**  
```js
const { Network } = require("@liquid-carrot/nn");

const network = new Network([2,2,1]);

network.activate([0,1]);
network.propagate([1]);
```
<a name="Network+activate"></a>

### network.activate(inputs) ⇒ <code>Array.&lt;number&gt;</code>
Activates network

**Kind**: instance method of [<code>Network</code>](#Network)  

| Param | Type |
| --- | --- |
| inputs | <code>Array.&lt;number&gt;</code> | 

<a name="Network+propagate"></a>

### network.propagate(targets) ⇒ <code>number</code>
Calculates error & updates network weights

**Kind**: instance method of [<code>Network</code>](#Network)  
**Returns**: <code>number</code> - Returns Mean-Squared Error (MSE)  

| Param | Type |
| --- | --- |
| targets | <code>Array.&lt;number&gt;</code> | 

<a name="Network+toJSON"></a>

### network.toJSON() ⇒ <code>Object</code>
Returns a JSON representation of the network

**Kind**: instance method of [<code>Network</code>](#Network)  
<a name="Network+toGraph"></a>

### network.toGraph(element, [options])
**BROWSER ONLY**

Creates a graph of the network using [`vis-network`](https://www.npmjs.com/package/vis-network) on the given DOMElement
or DOMElement ID.

**Kind**: instance method of [<code>Network</code>](#Network)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>string</code> \| <code>DOMElement</code> | DOMElement, or ID, where graph will ported into |
| [options] | <code>Object</code> | `vis-network` options - [learn more](https://visjs.github.io/vis-network/docs/network/#options) |

<a name="Network.fromSizes"></a>

### Network.fromSizes(sizes) ⇒ [<code>Network</code>](#Network)
**Kind**: static method of [<code>Network</code>](#Network)  

| Param | Type | Description |
| --- | --- | --- |
| sizes | <code>Array.&lt;number&gt;</code> | Array of layer fromSizes |

**Example**  
```js
const network = Network.fromSizes([20, 10, 3]);
```
<a name="Network.fromShape"></a>

### Network.fromShape(inputs, outputs) ⇒ [<code>Network</code>](#Network)
Creates a network with the given shape (i.e. INPUTSxOUTPUTS). The created
network will not have any hidden neurons.

**Kind**: static method of [<code>Network</code>](#Network)  

| Param | Type | Description |
| --- | --- | --- |
| inputs | <code>number</code> | Size of the network's input layer |
| outputs | <code>number</code> | Size of the network's output layer |

<a name="Network.fromGenome"></a>

### Network.fromGenome(genome) ⇒ [<code>Network</code>](#Network)
Creates a deep copy of the given genome

**Kind**: static method of [<code>Network</code>](#Network)  

| Param | Type |
| --- | --- |
| genome | <code>Genome</code> | 

<a name="Neuron"></a>

## Neuron
**Kind**: global class  
**Properties**

| Name | Type |
| --- | --- |
| id | <code>string</code> | 
| bias | <code>number</code> | 
| optimizer | <code>Object</code> | 
| optimizer.rate | <code>number</code> | 
| optimizer.momentum | <code>number</code> | 
| optimizer.decay | <code>number</code> | 
| optimizer.alpha | <code>number</code> | 
| optimizer.beta | <code>number</code> | 
| optimizer.gamma | <code>number</code> | 
| incoming | <code>Object</code> | 
| incoming.targets | <code>Object</code> | 
| incoming.weights | <code>Object</code> | 
| outgoing | <code>Object</code> | 
| outgoing.targets | <code>Object</code> | 
| outgoing.weights | <code>Object</code> | 
| _output | <code>number</code> | 
| output | <code>number</code> | 
| error | <code>number</code> | 


* [Neuron](#Neuron)
    * [new Neuron(options)](#new_Neuron_new)
    * _instance_
        * [.connect(neuron, [weight])](#Neuron+connect)
        * [.activate([input])](#Neuron+activate) ⇒ <code>number</code>
        * [.propagate(target, [rate])](#Neuron+propagate) ⇒ <code>number</code>
        * [.weights([array])](#Neuron+weights) ⇒ <code>Object</code> \| <code>Array.&lt;Array.&lt;Number&gt;&gt;</code>
    * _static_
        * [.optimizers](#Neuron.optimizers)

<a name="new_Neuron_new"></a>

### new Neuron(options)
Neurons are the engines that process and guide information though a neural
network. A neural networks "intelligence" is usually measured by the ability
for neurons to effectively process information as a group.

### What is a neuron?

A _`Neuron`_ is a simplified mathematical model of a biological neuron.

In people, a neuron is a cell that collects inputs from synapses (i.e. eyes,
ears, etc. or other neurons) and triggers an `output` signal when the
incoming signals pass a certain threshold.

In biological neurons (in animals) or in artificial neurons (i.e. AI, NN,
Deep Learning, etc.), one neuron doesn’t do much, but when combined, neural
networks allow us to recognize the world around us, solve problems, and
interact with our environment.

### How do they work?

Neural networks were inspired by the human brain, and like in a human brain
the basic building block is called a `Neuron`. Its functionality is similar
to a human neuron, i.e. it takes in some inputs and fires an output. In
purely mathematical terms, a neuron in the machine learning world is a
placeholder for a mathematical function, and its only job is to provide an
output by applying the function on the inputs provided.

![](https://miro.medium.com/max/805/1*XqXu-hBHocGoHh_65Rl8lQ.png)

The function used in a neuron is generally called an _"activation function"_.
There have been 5 major activation functions tried to date, step, sigmoid,
tanh, and ReLU. For this neuron we are using a _"sigmoid"_ activation
function.

### What is a _"sigmoid activation function"_?

A sigmoid function - or logistic function - is defined mathematically as:

![](https://miro.medium.com/max/460/1*MIeka59unAhS7MQk5e7FOg.png)

The value of the function tends to zero when _**z**_ tends to negative
infinity and tends to 1 when _**z**_ tends to infinity. A sigmoid activation
function is an approximation of how a "real neuron" would behave; it's an
assumption in the field of deep learning.


| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| [options.id] | <code>number</code> | 
| [options.bias] | <code>number</code> | 
| options.optimizer | <code>Object</code> | 
| options.optimizer.rate | <code>number</code> | 
| options.optimizer.momentum | <code>number</code> | 
| options.optimizer.decay | <code>number</code> | 
| options.optimizer.alpha | <code>number</code> | 
| options.optimizer.beta | <code>number</code> | 
| options.optimizer.gamma | <code>number</code> | 

**Example**  
```js
//===============================================
// One Neuron (No Hidden Layers) ================
//===============================================
const { Neuron } = require("@liquidcarrot/nn")

const neuron = new Neuron();

neuron.activate(0); // 0
neuron.propagate(1); // -1

//===============================================
// Three Neurons (Hidden Layers) ================
//===============================================
const { Neuron } = require("@liquidcarrot/nn")

const input = new Neuron(); // Input Neuron (Layer)
const hidden = new Neuron(0.1); // Hidden Neuron (Layer)
const output = new Neuron(0.2); // Output Neuron (Layer)

input.connect(hidden, 0.3); // Connects input layer to hidden layer
hidden.connect(output, 0.4); // Connects hidden layer to output layer

input.activate(0); // 0
hidden.activate(); // 0.52497918747894
output.activate(); // 0.6010858826658407

output.propagate(1); //  -0.09565228299910712
hidden.propagate(); // -0.009900697661026392
input.propagate(); // -0.0029702092983079176
```
<a name="Neuron+connect"></a>

### neuron.connect(neuron, [weight])
**Kind**: instance method of [<code>Neuron</code>](#Neuron)  

| Param | Type |
| --- | --- |
| neuron | [<code>Neuron</code>](#Neuron) | 
| [weight] | <code>number</code> | 

**Example**  
```js
const { Neuron } = require("@liquidcarrot/nn")

const neuron = new Neuron();
const other = new Neuron();

neuron.connect(other);
```
<a name="Neuron+activate"></a>

### neuron.activate([input]) ⇒ <code>number</code>
**Kind**: instance method of [<code>Neuron</code>](#Neuron)  
**Returns**: <code>number</code> - Returns the neuron's output  

| Param | Type |
| --- | --- |
| [input] | <code>number</code> | 

**Example**  
```js
//===============================================
// One Neuron ===================================
//===============================================
const { Neuron } = require("@liquidcarrot/nn")

const neuron = new Neuron();

neuron.activate(3);

//===============================================
// Two Neurons ==================================
//===============================================
const { Neuron } = require("@liquidcarrot/nn")

const neuron = new Neuron();
const other = new Neuron(0.1);

neuron.connect(other, 0.2);

neuron.activate(3); // 3
other.activate(); // 0.6681877721681662
```
<a name="Neuron+propagate"></a>

### neuron.propagate(target, [rate]) ⇒ <code>number</code>
**Kind**: instance method of [<code>Neuron</code>](#Neuron)  
**Returns**: <code>number</code> - Returns neuron's marginal error  

| Param | Type | Default |
| --- | --- | --- |
| target | <code>number</code> |  | 
| [rate] | <code>number</code> | <code>0.3</code> | 

**Example**  
```js
//===============================================
// One Neuron ===================================
//===============================================
const { Neuron } = require("@liquidcarrot/nn")

const neuron = new Neuron();

neuron.activate(3); // 3
neuron.propagate(0); // 3

//===============================================
// Two Neurons ==================================
//===============================================
const { Neuron } = require("@liquidcarrot/nn")

const neuron = new Neuron();
const other = new Neuron(0.1);

neuron.connect(other, 0.2);

neuron.activate(3); // 3
other.activate(); // 0.6681877721681662

other.propagate(0); // 0.14814583086672545
neuron.propagate(); // 0.009876697690471913
```
<a name="Neuron+weights"></a>

### neuron.weights([array]) ⇒ <code>Object</code> \| <code>Array.&lt;Array.&lt;Number&gt;&gt;</code>
**Kind**: instance method of [<code>Neuron</code>](#Neuron)  
**Returns**: <code>Object</code> \| <code>Array.&lt;Array.&lt;Number&gt;&gt;</code> - Returns an `Array` or `Object` of incoming and outgoing weights  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [array] | <code>boolean</code> | <code>false</code> | Iff `true`, will return an `Array` (`[[INCOMING_WEIGHTS], [OUTGOING_WEIGHTS]]`) - instead of a JSON Object (`{ incoming: [INCOMING_WEIGHTS], outgoing: [OUTGOING_WEIGHTS]`) |

<a name="Neuron.optimizers"></a>

### Neuron.optimizers
Optimizers are initiated with
{ rate, momentum, decay, alpha, beta, epsilon, gamma }

**Kind**: static property of [<code>Neuron</code>](#Neuron)  
<a name="Datum"></a>

## Datum
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| inputs | <code>Array.&lt;number&gt;</code> | 
| outputs | <code>Array.&lt;number&gt;</code> | 

**Example**  
```js
{
  "inputs": [0,1],
  "outputs": [1]
}
```
<a name="Dataset"></a>

## Dataset : [<code>Array.&lt;Datum&gt;</code>](#Datum)
**Kind**: global typedef  
**Example**  
```js
[{
  "inputs": [0,0],
  "outputs": [0]
}, {
  "inputs": [0,1],
  "outputs": [1]
}, {
  "inputs": [1,0],
  "outputs": [1]
}, {
  "inputs": [1,1],
  "outputs": [0]
}]
```
<a name="JSON"></a>

## JSON : <code>Array.&lt;Object&gt;</code>
**Kind**: global typedef  
**Example**  
```js
[{
  "a": 0,
  "b": 0,
  "c": 0
}, {
  "a": 0,
  "b": 1,
  "c": 1
}, {
  "a": 1,
  "b": 0,
  "c": 1
}, {
  "a": 1,
  "b": 1,
  "c": 0
}]
```
<a name="CSV"></a>

## CSV : <code>string</code>
**Kind**: global typedef  
**Example**  
```js
a,b,c
0,0,0
0,1,1
1,0,1
1,1,0
```
**Example**  
```js
0,0,0
0,1,1
1,0,1
1,1,0
```
**Example**  
```js
0;0;0
0;1;1
1;0;1
1;1;0
```
<a name="XML"></a>

## XML : <code>string</code>
**Kind**: global typedef  
**Example**  
```js
<?xml version="1.0" encoding="UTF-8"?>
<dataset>
  <datum>
    <a>0</a>
    <b>0</b>
    <c>0</c>
  </datum>
  <datum>
    <a>0</a>
    <b>1</b>
    <c>1</c>
  </datum>
  <datum>
    <a>1</a>
    <b>0</b>
    <c>1</c>
  </datum>
  <datum>
    <a>1</a>
    <b>1</b>
    <c>0</c>
  </datum>
</dataset>
```
