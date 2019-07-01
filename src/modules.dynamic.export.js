const square = (x) => x * x;

// CommonJS & AMD
if (typeof define !== 'undefined' && define.amd) define([], function () { return square; });

// Node.js
if (typeof module !== 'undefined' && module.exports) module.exports = square;

// Browser
if (typeof window === 'object') window['square'] = square;