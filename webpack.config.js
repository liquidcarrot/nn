const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    "library": "NN",
    "libraryTarget": "umd",
    "path": path.resolve(__dirname, "dist"),
    "filename": "bundle.js",
  }
}
