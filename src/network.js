
/**
 * @constructs Network
 *
 * @prop {Group[]} [layers=[]] An ordered list of groups in the network
 *
 * @param {CostFunction} [cost=cost.MSE] Cost function
 */
function Network() {
  this.layers = []; // Stores order of forward/backward propagation
  this.cost; // Function: cost(outputs, targets)
  
  this.activate = function(inputs) {
    this.layers[0].activate(inputs);
    
    for(let l = 1, last = this.layers.length - 1; l < last; l++) {
      this.layers[l].activate();
    }
    
    return this.layers[this.layers.length - 1].activate();
  }
  
  
  this.propagate = function(targets) {
    const { error, critiques } = this.cost(this.outputs, targets);
    
    this.layers[this.layers.length - 1].propagate(critiques); // Critques = Errors w.r.t Output Neuron
    
    for(let l = this.layers.length - 2; l > 0; l--) {
      this.layers[l].propagate();
    }
    
    this.layers[0].propagate();
    
    return error;
  }
}