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
const connection = new Connection(neuron, other) // Connection {}

const connection = new Connection(neuron, other, 0.3) // Connection {}
```
