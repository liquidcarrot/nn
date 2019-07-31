/**
 *
 */
function Group() {
  this.layers = [];
  
  /**
   * @param {number|number[]} inputs
   *
   * @returns {number|number[]} Returns output of last layer in group
   *
   * @example
   * const group = new Group(3, 3, 3); // Group { layers: [Neuron [3], Neuron [3], Neuron[3]] }
   *
   * group.activate([-0.1, 0.3, -0.9]) // [0.345, 0.001, 0.978]
   */
  this.activate = function(inputs) {
    let layer = 0;
    
    if(inputs) {
      this.layers[layer].activate(inputs);
      layer++;
    }
    
    for(let last = this.layers.length - 1; layer < last; layer++) {
      this.layers[layer].activate();
    }
    
    return this.layers[this.layers.length - 1].activate();
  }
  
  /**
   * @param {number|number[]} critiques
   *
   * @returns {number|number[]} Returns the errors of the first layer in group
   *
   * @example
   * const group = new Group(3, 3, 3); // Group { layers: [Neuron [3], Neuron [3], Neuron[3]] }
   *
   * group.activate([-0.1, 0.3, -0.9]) // [0.345, 0.001, 0.978]
   * group.propagate([0.333, 0, 1]) // [0.013, 0.003, 0.104]
   */
  this.propagate = function(critiquess) {
    let layer = this.layers.length - 1;
    
    if(critiques) {
      this.layers[layer].propagate(critiques);
      layer--;
    }
    
    for(; layer > 0; layer--) {
      this.layers[layer].propagate();
    }
    
    return this.layers[0].propagate();
  }
}