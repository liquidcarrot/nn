const environment = require("../util/environment");

switch(environment) {
  case "node":
    console.log("node");
    break;
  case "browser":
    console.log("browser");
    break;
  case "common":
    console.log("common");
    break;
}