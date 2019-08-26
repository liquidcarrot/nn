const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");
const csv = require("fast-csv");

// abalone.csv
{
  const filename = "abalone.csv";
  const source = "csv";
  const destination = "dataset";
  
  const output = csv.format({ headers: true });
  const outputfile = fs.createWriteStream(path.resolve(__dirname, destination, filename));
  
  output.pipe(outputfile);
  
  const input = csv.parseFile(path.resolve(__dirname, source, filename), {
    headers: ["sex", "length", "diameter", "height", "whole weight", "shucked weight", "viscera weight", "shell weight", "rings"]
  }).pipe(output);
}

// auto-insurance-sweden.csv
{
  const filename = "auto-insurance-sweden.csv";
  const source = "csv";
  const destination = "dataset";
  
  const output = csv.format({ headers: true, delimeter: "," });
  const outputfile = fs.createWriteStream(path.resolve(__dirname, destination, filename));
  
  output.pipe(outputfile);
  
  const input = csv.parseFile(path.resolve(__dirname, source, filename), {
    headers: ["Total Claims", "Total Payments"],
    renameHeaders: true,
    delimiter: "\t"
  }).transform(function(data) {
    data["Total Payments"] = parseFloat(data["Total Payments"].replace(",", ".")) * 1000 + ""; // Original dataset uses European notation for numbers (i.e. 3,14159) & represented value in thousands
    return data;
  }).pipe(output);
}

// banknote.csv
{
  const filename = "banknote.csv";
  const source = "csv";
  const destination = "dataset";
  
  const output = csv.format({ headers: true, delimeter: "," });
  const outputfile = fs.createWriteStream(path.resolve(__dirname, destination, filename));
  
  output.pipe(outputfile);
  
  const input = csv.parseFile(path.resolve(__dirname, source, filename), {
    headers: ["variance", "skewness", "kurtosis", "entropy", "fake"]
  }).pipe(output);
}

// boston-housing-prices.csv
{
  const filename = "boston-housing-prices.csv";
  const source = "csv";
  const destination = "dataset";
  
  const output = csv.format({ headers: true });
  const outputfile = fs.createWriteStream(path.resolve(__dirname, destination, filename));
  const inputfile = fs.createReadStream(path.resolve(__dirname, source, filename));
  
  inputfile.pipe(new Transform({
    // This trims the arbitrary whitespace delimiting cells in the original file
    transform: function(data, index, callback) {
      const lines = data.toString().split("\n");
      lines.forEach(function(line, index) {
        lines[index] = line.split(" ").filter(string => string).join(",");
      })
      callback(null, lines.join("\n"));
    }
  })).pipe(csv.parse({
    headers: ["CRIM","ZN","INDUS","CHAS","NOX","RM","AGE","DIS","RAD","TAX","PTRATIO","B","LSTAT","MEDV"],
  })).pipe(output).pipe(outputfile);
}

// ionosphere.csv
{
  const filename = "ionosphere.csv";
  const source = "csv";
  const destination = "dataset";
  
  const output = csv.format({ headers: true });
  const outputfile = fs.createWriteStream(path.resolve(__dirname, destination, filename));
  
  output.pipe(outputfile);
  
  const input = csv.parseFile(path.resolve(__dirname, source, filename), {
    headers: Array.from({ length: 34 }, (_, i) => `Radar ${i}`).concat(["Good"])
  }).transform(function(data) {
    data["Good"] = data["Good"] === "g" ? 1 : 0;
    return data;
  }).pipe(output);
}

// iris-flower.csv
{
  const filename = "iris-flower.csv";
  const source = "csv";
  const destination = "dataset";
  
  const output = csv.format({ headers: true });
  const outputfile = fs.createWriteStream(path.resolve(__dirname, destination, filename));
  
  output.pipe(outputfile);
  
  const input = csv.parseFile(path.resolve(__dirname, source, filename), {
    headers: ["Sepal Length", "Sepal Width", "Petal Length", "Petal Width", "Flower"],
    ignoreEmpty: true
  }).transform(function(data) {
    data["Flower"] = data["Flower"] === "Iris-setosa" ? 1 :
                     data["Flower"] === "Iris-versicolor" ? 2 :
                     data["Flower"] === "Iris-virginica" ? 3 : 0;
    return data;
  }).pipe(output);
}

// pima-indians-diabetes.csv
{
  const filename = "pima-indians-diabetes.csv";
  const source = "csv";
  const destination = "dataset";
  
  const output = csv.format({ headers: true });
  const outputfile = fs.createWriteStream(path.resolve(__dirname, destination, filename));
  
  output.pipe(outputfile);
  
  const input = csv.parseFile(path.resolve(__dirname, source, filename), {
    headers: ["Pregnancies", "Plasma Glucose Concentration", "Diastolic Blood Pressure", "Triceps Skinfold Thickness", "Insulin", "Body Mass Index", "Diabetes Pedigree", "Age", "Diabetic"],
  }).pipe(output);
}

// sonar.csv
{
  const filename = "sonar.csv";
  const source = "csv";
  const destination = "dataset";
  
  const output = csv.format({ headers: true });
  const outputfile = fs.createWriteStream(path.resolve(__dirname, destination, filename));
  
  output.pipe(outputfile);
  
  const input = csv.parseFile(path.resolve(__dirname, source, filename), {
    headers: Array.from({ length: 60 }, (_, i) => `Sonar Angel ${i}`).concat(["Rock"])
  }).transform(function(data) {
    data["Rock"] = data["Rock"] === "R" ? 1 : 0;
    return data;
  }).pipe(output);
}

// wheat-seeds.csv
{
  const filename = "wheat-seeds.csv";
  const source = "csv";
  const destination = "dataset";
  
  const output = csv.format({ headers: true });
  const outputfile = fs.createWriteStream(path.resolve(__dirname, destination, filename));
  const inputfile = fs.createReadStream(path.resolve(__dirname, source, filename));
  
  inputfile.pipe(new Transform({
    // This trims the arbitrary whitespace delimiting cells in the original file
    transform: function(data, index, callback) {
      const lines = data.toString().split("\n");
      lines.forEach(function(line, index) {
        lines[index] = line.split("\t").filter(string => string).join(",");
      })
      callback(null, lines.join("\n"));
    }
  })).pipe(csv.parse({
    headers: ["Area", "Perimeter", "Compactness", "Length of Kernel", "Width of Kernel", "Assymetry Coefficient", "Length of Kernel Grove", "Class"],
  })).pipe(output).pipe(outputfile);
}

// wine-quality.csv
{
  const filename = "wine-quality.csv";
  const source = "csv";
  const destination = "dataset";
  
  const output = csv.format({ headers: true });
  const outputfile = fs.createWriteStream(path.resolve(__dirname, destination, filename));
  
  output.pipe(outputfile);
  
  const input = csv.parseFile(path.resolve(__dirname, source, filename), {
    headers: true,
    delimiter: ";"
  }).pipe(output);
}