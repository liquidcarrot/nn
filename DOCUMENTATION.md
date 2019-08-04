## Classes

<dl>
<dt><a href="#Connection">Connection</a></dt>
<dd></dd>
<dt><a href="#Network">Network</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#fromURL">fromURL(url, [options])</a></dt>
<dd></dd>
<dt><a href="#fromPath">fromPath()</a></dt>
<dd></dd>
<dt><a href="#fromString">fromString()</a></dt>
<dd></dd>
</dl>

<a name="Connection"></a>

## Connection
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique connection ID |
| a | <code>Neuron</code> \| <code>Array.&lt;Neuron&gt;</code> | Side "A" of connection(s) |
| b | <code>Neuron</code> \| <code>Array.&lt;Neuron&gt;</code> | Side "B" of connection(s) |
| [weight] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | Weight of connection(s) |

<a name="new_Connection_new"></a>

### new Connection(a, b, [weight], [options])

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Neuron</code> \| <code>Array.&lt;Neuron&gt;</code> | Neuron(s) on one edge of the connection |
| b | <code>Neuron</code> \| <code>Array.&lt;Neuron&gt;</code> | Neruon(s) on another edge of the connection |
| [weight] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | Weight of connection(s) |
| [options] | <code>Object</code> |  |

**Example**  
```js
const connection = new Connection(neuron, other) // Connection { a: neuron, b: other }

const connection = new Connection(neuron, other, 0.3) // Connection { a: neuron, b: other, weight: 0.3 }
```
<a name="Network"></a>

## Network
**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [layers] | <code>Array.&lt;Group&gt;</code> | <code>[]</code> | An ordered list of groups in the network |

<a name="new_Network_new"></a>

### new Network([cost])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [cost] | <code>CostFunction</code> | <code>cost.MSE</code> | Cost function |

<a name="fromURL"></a>

## fromURL(url, [options])
**Kind**: global function  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [options] | <code>Object</code> | 

**Example**  
```js
const bot = Bot.fromURL(https://liquidcarrot.io/dataset/monkeys.csv)
```
<a name="fromPath"></a>

## fromPath()
**Kind**: global function  
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
<a name="fromString"></a>

## fromString()
**Kind**: global function  
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
