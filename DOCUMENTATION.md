## Members

<dl>
<dt><a href="#id">id</a></dt>
<dd><p>Fast ID Generation: <a href="https://www.npmjs.com/package/hyperid">https://www.npmjs.com/package/hyperid</a>
Strong ID Generation: <a href="https://www.npmjs.com/package/cuid">https://www.npmjs.com/package/cuid</a></p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#environment">environment</a></dt>
<dd><p>Returns the environment type &quot;browser&quot;, &quot;node&quot;, &quot;common&quot;, <em>undefined</em>.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#SIGMOID">SIGMOID()</a></dt>
<dd></dd>
<dt><a href="#Connection">Connection(a, b, [weight], [directed])</a></dt>
<dd></dd>
<dt><a href="#Neuron">Neuron()</a></dt>
<dd></dd>
<dt><a href="#connect">connect(target, [weight])</a> ⇒ <code><a href="#Connection">Connection</a></code></dt>
<dd></dd>
<dt><a href="#disconnect">disconnect(target)</a></dt>
<dd></dd>
<dt><a href="#activate">activate([input])</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SquashFunction">SquashFunction</a></dt>
<dd></dd>
</dl>

<a name="id"></a>

## id
Fast ID Generation: https://www.npmjs.com/package/hyperid
Strong ID Generation: https://www.npmjs.com/package/cuid

**Kind**: global variable  
<a name="environment"></a>

## environment
Returns the environment type "browser", "node", "common", _undefined_.

**Kind**: global constant  
<a name="SIGMOID"></a>

## SIGMOID()
**Kind**: global function  
**See**

- [Activation Functions](https://towardsdatascience.com/activation-functions-neural-networks-1cbd9f8d91d6#9dcb)
- [Sigmoid Function](https://en.wikipedia.org/wiki/Sigmoid_function)

<a name="Connection"></a>

## Connection(a, b, [weight], [directed])
**Kind**: global function  

| Param | Type |
| --- | --- |
| a | [<code>Neuron</code>](#Neuron) \| [<code>Array.&lt;Neuron&gt;</code>](#Neuron) | 
| b | [<code>Neuron</code>](#Neuron) \| [<code>Array.&lt;Neuron&gt;</code>](#Neuron) | 
| [weight] | <code>number</code> \| <code>Array.&lt;number&gt;</code> | 
| [directed] | <code>boolean</code> | 

<a name="Neuron"></a>

## Neuron()
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options.squash | <code>string</code> | Activation function name - _e.g. `SIGMOID`_ |

<a name="connect"></a>

## connect(target, [weight]) ⇒ [<code>Connection</code>](#Connection)
**Kind**: global function  

| Param | Type |
| --- | --- |
| target | [<code>Neuron</code>](#Neuron) | 
| [weight] | <code>number</code> | 

<a name="disconnect"></a>

## disconnect(target)
**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target | <code>string</code> \| [<code>Neuron</code>](#Neuron) |  |  |
| [options.incoming] | <code>boolean</code> | <code>false</code> | Deletes connection from `incoming` & `outgoing` for both neurons - _by default `neuron.disconnect()` just removes outgoing connections_ |

<a name="activate"></a>

## activate([input])
**Kind**: global function  

| Param | Type |
| --- | --- |
| [input] | <code>number</code> | 

<a name="SquashFunction"></a>

## SquashFunction
**Kind**: global typedef  

| Param | Type | Default |
| --- | --- | --- |
| input | <code>number</code> |  | 
| [depth] | <code>number</code> | <code>0</code> | 

