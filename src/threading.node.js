const environment = require("../util/environment");
const os = require("os");
const cluster = require("cluster");

const cores = require("os").cpus().length;

if (cluster.isMaster) {
  
  console.log(`Master ${process.pid} is running in "${environment}"`);

  // Fork workers.
  for (let i = 0; i < cores; i++) {
    cluster.fork();
  }

  cluster.on('error', function(code, signal) {
    if (code === 0) console.log(`worker ${process.id} was killed by signal: ${signal}`);
    else console.log(`worker ${process.id} exited with error code: ${signal}`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
  
} else {
  console.log(`Worker ${process.pid} started in a "${environment}" environment`);
}