const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");
const _ = require("lodash");
const csv = require("fast-csv");

const source = "json";
const destination = "dataset";

// abalone.csv
{
  const json = require("./json/abalone.json");
  const outputkeys = ["rings"]
  
  
  const dataset = json.map(function(data) {
    const inputs = Object.values(_.omit(data, outputkeys));
    const outputs = Object.values(_.pick(data, outputkeys));
    
    return { inputs, outputs };
  })
  
  fs.writeFileSync("./dataset/abalone.json", JSON.stringify(dataset, null, 2));
}

// auto-insurance-sweden.csv
{
  
  const json = require("./json/auto-insurance-sweden.json");
  const outputkeys = ["Total Payments"];
  
  const dataset = json.map(function(data) {
    const inputs = Object.values(_.omit(data, outputkeys));
    const outputs = Object.values(_.pick(data, outputkeys));
    
    return { inputs, outputs };
  })
  
  fs.writeFileSync("./dataset/auto-insurance-sweden.json", JSON.stringify(dataset, null, 2));
}

// banknote.csv
{
  const json = require("./json/banknote.json");
  const outputkeys = ["fake"];
  
  const dataset = json.map(function(data) {
    const inputs = Object.values(_.omit(data, outputkeys));
    const outputs = Object.values(_.pick(data, outputkeys));
    
    return { inputs, outputs };
  })
  
  fs.writeFileSync("./dataset/banknote.json", JSON.stringify(dataset, null, 2));
}

// boston-housing-prices.csv
{
  const json = require("./json/boston-housing-prices.json");
  const outputkeys = ["MEDV"];
  
  const dataset = json.map(function(data) {
    const inputs = Object.values(_.omit(data, outputkeys));
    const outputs = Object.values(_.pick(data, outputkeys));
    
    return { inputs, outputs };
  })
  
  fs.writeFileSync("./dataset/boston-housing-prices.json", JSON.stringify(dataset, null, 2));
}

// ionosphere.csv
{
  const json = require("./json/ionosphere.json");
  const outputkeys = ["Good"];
  
  const dataset = json.map(function(data) {
    const inputs = Object.values(_.omit(data, outputkeys));
    const outputs = Object.values(_.pick(data, outputkeys));
    
    return { inputs, outputs };
  })
  
  fs.writeFileSync("./dataset/ionosphere.json", JSON.stringify(dataset, null, 2));
}

// iris-flower.csv
{
  const json = require("./json/iris-flower.json");
  const outputkeys = ["Flower"];
  
  const dataset = json.map(function(data) {
    const inputs = Object.values(_.omit(data, outputkeys));
    const outputs = Object.values(_.pick(data, outputkeys));
    
    return { inputs, outputs };
  })
  
  fs.writeFileSync("./dataset/iris-flower.json", JSON.stringify(dataset, null, 2));
}

// pima-indians-diabetes.csv
{
  const json = require("./json/pima-indians-diabetes.json");
  const outputkeys = ["Diabetic"];
  
  const dataset = json.map(function(data) {
    const inputs = Object.values(_.omit(data, outputkeys));
    const outputs = Object.values(_.pick(data, outputkeys));
    
    return { inputs, outputs };
  })
  
  fs.writeFileSync("./dataset/pima-indians-diabetes.json", JSON.stringify(dataset, null, 2));
}

// sonar.csv
{
  const json = require("./json/sonar.json");
  const outputkeys = ["Rock"];
  
  const dataset = json.map(function(data) {
    const inputs = Object.values(_.omit(data, outputkeys));
    const outputs = Object.values(_.pick(data, outputkeys));
    
    return { inputs, outputs };
  })
  
  fs.writeFileSync("./dataset/sonar.json", JSON.stringify(dataset, null, 2));
}

// wheat-seeds.csv
{
  const json = require("./json/wheat-seeds.json");
  const outputkeys = ["Class"];
  
  const dataset = json.map(function(data) {
    const inputs = Object.values(_.omit(data, outputkeys));
    const outputs = Object.values(_.pick(data, outputkeys));
    
    return { inputs, outputs };
  })
  
  fs.writeFileSync("./dataset/wheat-seeds.json", JSON.stringify(dataset, null, 2));
}

// wine-quality.csv
{
  const json = require("./json/wine-quality.json");
  const outputkeys = ["quality"];
  
  const dataset = json.map(function(data) {
    const inputs = Object.values(_.omit(data, outputkeys));
    const outputs = Object.values(_.pick(data, outputkeys));
    
    return { inputs, outputs };
  })
  
  fs.writeFileSync("./dataset/wine-quality.json", JSON.stringify(dataset, null, 2));
}