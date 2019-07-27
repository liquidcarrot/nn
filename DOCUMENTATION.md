## Classes

<dl>
<dt><a href="#Connection">Connection</a></dt>
<dd></dd>
<dt><a href="#Neuron">Neuron</a></dt>
<dd></dd>
</dl>

<a name="Connection"></a>

## Connection
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique connection ID |
| a | [<code>Neuron</code>](#Neuron) \| [<code>Array.&lt;Neuron&gt;</code>](#Neuron) | Side "A" of connection(s) |
| b | [<code>Neuron</code>](#Neuron) \| [<code>Array.&lt;Neuron&gt;</code>](#Neuron) | Side "B" of connection(s) |
| [weight] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | Weight of connection(s) |

<a name="new_Connection_new"></a>

### new Connection(a, b, [weight], [options])

| Param | Type | Description |
| --- | --- | --- |
| a | [<code>Neuron</code>](#Neuron) \| [<code>Array.&lt;Neuron&gt;</code>](#Neuron) | Neuron(s) on one edge of the connection |
| b | [<code>Neuron</code>](#Neuron) \| [<code>Array.&lt;Neuron&gt;</code>](#Neuron) | Neruon(s) on another edge of the connection |
| [weight] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | Weight of connection(s) |
| [options] | <code>Object</code> |  |

**Example**  
```js
const connection = new Connection(neuron, other) // Connection { a: neuron, b: other }

const connection = new Connection(neuron, other, 0.3) // Connection { a: neuron, b: other, weight: 0.3 }
```
<a name="Neuron"></a>

## Neuron
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique neuron ID |
| bias | <code>number</code> | Neuron's signaling bias |
| incoming.connections | <code>Object</code> | Incoming connection(s) - `{ "[ID]": connection }` |
| incoming.weights | <code>Object</code> | Incoming weight(s) - `{ "[ID]": weight }` |
| incoming.neurons | <code>Object</code> | Incoming neurons(s) - `{ "[ID]": neuron }` |
| outgoing.connections | <code>Object</code> | Outgoing connection(s) - `{ "[ID]": connection }` |
| outgoing.weights | <code>Object</code> | Outgoing weight(s) - `{ "[ID]": weight }` |
| outgoing.neurons | <code>Object</code> | Outgoing neurons(s) - `{ "[ID]": neuron }` |


* [Neuron](#Neuron)
    * [new Neuron([bias], [options])](#new_Neuron_new)
    * [.fire(input)](#Neuron+fire) ⇒ <code>number</code> \| <code>Feedback</code> \| <code>Output</code>
    * [.update([connection_id], [new_weights])](#Neuron+update) ⇒ <code>Array.&lt;number&gt;</code>

<a name="new_Neuron_new"></a>

### new Neuron([bias], [options])

| Param | Type | Description |
| --- | --- | --- |
| [bias] | <code>number</code> | Neuron's signaling bias |
| [options] | <code>Object</code> |  |

**Example**  
```js
const neuron = new Neuron(); // Neuron { bias }

const neuron = new Neuron(0.2); // Neuron { bias: 0.2 }
```
<a name="Neuron+fire"></a>

### neuron.fire(input) ⇒ <code>number</code> \| <code>Feedback</code> \| <code>Output</code>
Can bi-directionally fire a neuron

**Kind**: instance method of [<code>Neuron</code>](#Neuron)  
**Returns**: <code>number</code> \| <code>Feedback</code> \| <code>Output</code> - Returns a number or a Feedback or Output Object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>number</code> |  |  |
| [options.forward] | <code>boolean</code> | <code>true</code> | Iff `!options.forward`, neuron will fire backward (i.e. backpropagate) |
| [options.update] | <code>boolean</code> | <code>true</code> | Iff `!options.forward && options.update`, neuron will update connection weights |

<a name="Neuron+update"></a>

### neuron.update([connection_id], [new_weights]) ⇒ <code>Array.&lt;number&gt;</code>
Updates neuron's weights

**Kind**: instance method of [<code>Neuron</code>](#Neuron)  
**Returns**: <code>Array.&lt;number&gt;</code> - Returns an array of weights or weight deltas  

| Param | Type | Description |
| --- | --- | --- |
| [connection_id] | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Connection ID(s) |
| [new_weights] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | New weight(s) |
| [options.delta] | <code>boolean</code> | Iff `options.delta`, `neuron.update()` will return the difference (i.e. delta) between the previous and current weight(s) |

