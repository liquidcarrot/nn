!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.NN=n():t.NN=n()}(window,function(){return function(t){var n={};function i(o){if(n[o])return n[o].exports;var e=n[o]={i:o,l:!1,exports:{}};return t[o].call(e.exports,e,e.exports,i),e.l=!0,e.exports}return i.m=t,i.c=n,i.d=function(t,n,o){i.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,n){if(1&n&&(t=i(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var e in t)i.d(o,e,function(n){return t[n]}.bind(null,e));return o},i.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(n,"a",n),n},i.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},i.p="",i(i.s=4)}([function(t,n){const i=function(){};i.clamp=function(t){return t===1/0?Number.MAX_VALUE:t===-1/0?-Number.MAX_VALUE:t},t.exports=i},function(t,n){function i(t,n,o,e){this.id=i.uid(t.id,n.id),this.from=t,this.to=n,this.weight=null==o?2*Math.random()-1:o,this.toJSON=function(){return{id:this.id,from:this.from.id,to:this.to.id,weight:this.weight}}}i.uid=function(t,n){return.5*(t+n)*(t+n+1)+n},t.exports=i},function(t,n,i){const o=i(0),e=i(1);function r(t={}){this.id=r.uid(),this.type="hidden",this.bias=null==t.bias?2*Math.random()-1:t.bias,this.optimizer={},this.optimizer.rate,this.optimizer.momentum,this.optimizer.decay,this.optimizer.alpha,this.optimizer.beta,this.optimizer.gamma,this.squash,this.cost,this.connections=[],this.incoming={targets:{},weights:{},connections:{}},this.outgoing={targets:{},weights:{},connections:{}},this._output,this.output,this.error,this._error,this.connect=function(t,n){const i=new e(this,t,n);this.outgoing.targets[t.id]=t,this.outgoing.connections[t.id]=i,t.incoming.targets[this.id]=this,t.incoming.connections[this.id]=i,this.outgoing.weights[t.id]=t.incoming.weights[this.id]=null==n?2*Math.random()-1:n,this.outgoing.connections[i.id]=t.incoming.connections[i.id]=i},this.activate=function(t){const n=this;function i(t){return 1/(1+Math.exp(-t))}if(null!=t)this._output=1,this.output=t;else{const t=Object.keys(this.incoming.targets).reduce(function(t,i,o){return t+n.incoming.targets[i].output*n.incoming.weights[i]},this.bias);this._output=i(o=t)*(1-i(o)),this.output=i(t)}var o;return this.output},this.propagate=function(t,n=.3){const i=this,o=null==t?Object.keys(this.outgoing.targets).reduce(function(t,o,e){return i.outgoing.targets[o].incoming.weights[i.id]=i.outgoing.weights[o]-=n*i.outgoing.targets[o].error*i.output,t+i.outgoing.targets[o].error*i.outgoing.weights[o]},0):this.output-t;return this.error=o*this._output,this.bias-=n*this.error,this.error},this.toJSON=function(){return{id:this.id,bias:this.bias,type:this.type}},this.weights=function(t){return(t=t||{json:!0}).json?{incoming:Object.values(this.incoming.weights),outgoing:Object.values(this.outgoing.weights)}:[Object.values(this.incoming.weights),Object.values(this.outgoing.weights)]}}r.neurons=0,r.uid=function(){return++r.neurons},r.activations={SIGMOID:function(t,n){const i=1/(1+Math.exp(-t));return n?o.clamp(i*(1-i)):o.clamp(i)},RELU:function(t,n){if(t>0){return n?1:o.clamp(t)}return 0},TANH:function(t,n){const i=Math.tanh(t);return n?o.clamp(1-i*i):o.clamp(i)},IDENTITY:function(t,n){return n?1:o.clamp(t)},STEP:function(t,n){return t>0&&n?1:0}},r.optimizers={SGD:function(){},NESTEROV:function(){},RMSPROP:function(){},ADAGRAD:function(){},ADADELTA:function(){},ADAM:function(){},AMSGRAD:function(){},ADAMAX:function(){},NADAM:function(){}},t.exports=r},function(t,n,i){const o=i(2);t.exports=function(t,n){this.neurons=null==t?[]:Array.from({length:t},function(){return new o(n)}),this.connect=function(t,n){const i=this;this.neurons.forEach(function(o,e){t.neurons.forEach(function(t,r){n?o.connect(t,n[i.neurons.length*e+r]):o.connect(t)})})},this.activate=function(t){return this.neurons.map(function(n,i){return t?n.activate(t[i]):n.activate()})},this.propagate=function(t,n=.3){return this.neurons.map(function(n,i){return t?n.propagate(t[i]):n.propagate()})}}},function(t,n,i){const o={_:i(0),Connection:i(1),Neuron:i(2),Group:i(3),Network:i(5)};t.exports=o},function(t,n,i){const o=i(3);function e(t,n,i){let r=this;this.id=e.uid(),this.neurons=[],this.connections=[],this.groups=null==t?[]:t.map(function(t,i){return null==n?new o(t):new o(t,n[i])}),this.groups.slice(0,this.groups.length-1).forEach(function(t,n){i?t.connect(r.groups[n+1],i[n]):t.connect(r.groups[n+1])}),this.activate=function(t){const n=this.groups.map(function(n,i){return 0===i?n.activate(t):n.activate()});return n[n.length-1]},this.propagate=function(t){const n=this.groups[this.groups.length-1].neurons.map(function(n,i){return.5*Math.pow(t[i]-n.output,2)}).reduce((t,n)=>t+n);return this.groups.reverse().forEach(function(n,i){if(0!==i)return n.propagate();n.propagate(t)}),this.groups.reverse(),n},this.toJSON=function(){return{neurons:this.neurons.map(function(t){return t.toJSON()}),connections:this.connections.map(function(t){return t.toJSON()})}}}e.networks=0,e.uid=function(){return++e.networks},t.exports=e}])});