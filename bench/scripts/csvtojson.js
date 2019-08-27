const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const csvtojson = require("csvtojson");

const files = fs.readdirSync(path.resolve(__dirname,"csv"));

const source = "csv";
const destination = "json";

files.forEach(async function(file) {
  const csvfile = path.resolve(__dirname, source, file);
  const jsonfile = path.resolve(__dirname, destination, file.replace(".csv", ".json"));
  
  const json = await csvtojson().fromFile(csvfile);
  
  fs.writeFileSync(jsonfile, JSON.stringify(json, null, 2));
})
