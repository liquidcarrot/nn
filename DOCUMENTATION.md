## Classes

<dl>
<dt><a href="#Bot">Bot</a></dt>
<dd></dd>
<dt><a href="#Connection">Connection</a></dt>
<dd></dd>
<dt><a href="#Network">Network</a></dt>
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
    * _instance_
        * [.fromURL(url, [options])](#Bot+fromURL)
        * [.fromPath()](#Bot+fromPath)
        * [.fromString()](#Bot+fromString)
    * _static_
        * [.fromJSON(json, options)](#Bot.fromJSON)

<a name="Bot+fromURL"></a>

### bot.fromURL(url, [options])
**Kind**: instance method of [<code>Bot</code>](#Bot)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [options] | <code>Object</code> | 

**Example**  
```js
const bot = Bot.fromURL(https://liquidcarrot.io/dataset/monkeys.csv)
```
<a name="Bot+fromPath"></a>

### bot.fromPath()
**Kind**: instance method of [<code>Bot</code>](#Bot)  
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
<a name="Bot+fromString"></a>

### bot.fromString()
**Kind**: instance method of [<code>Bot</code>](#Bot)  
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

| Param | Type |
| --- | --- |
| json | <code>Array.&lt;Object&gt;</code> | 
| options | <code>string</code> | 

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
