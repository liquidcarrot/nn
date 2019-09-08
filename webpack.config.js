// CHECK: https://tech.trivago.com/2015/12/17/export-multiple-javascript-module-formats/
const path = require("path");
const variants = require("parallel-webpack").createVariants;

function config(options) {
  return {
    "entry": "./src/index.js",
    "output": {
      "path": path.resolve(__dirname, "dist"),
      "filename": `nn.${options.target}.js`,
      "library": "NN",
      "libraryTarget": options.target
    },
    "mode": "production"
  }
}

module.exports = variants({
  target: ["window", "commonjs2", "amd", "umd2"]
}, config);
