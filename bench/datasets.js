const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(path.resolve(__dirname,"dataset"));

console.log(files);