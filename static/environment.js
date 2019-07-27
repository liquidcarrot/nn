/**
* Returns the environment type "browser", "node", "common", _undefined_.
*/
const environment = typeof window === 'object' ? "browser" : (typeof module !== 'undefined' && module.exports) ? "node" : (typeof define !== 'undefined' && define.amd) ? "common" : undefined;

// CommonJS & AMD
if (typeof define !== 'undefined' && define.amd) define([], function () { return environment; });

// Node.js
if (typeof module !== 'undefined' && module.exports) module.exports = environment;

// Browser
if (typeof window === 'object') window['environment'] = environment;


