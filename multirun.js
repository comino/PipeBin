const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  cluster.setupMaster({
    exec: 'run',
  });

  for (let i = 0; i < numCPUs; i++) {
    console.log(`Starting core: ${i}`);
    cluster.fork();
  }

  cluster.on('listening', (worker, address) => {
    console.log(`Worker id: ${worker.id} listening at: ${JSON.stringify(address)}`);
  });

  Object.keys(cluster.workers).forEach((id) => {
    console.log(`Worker id: ${id} with pid: ${cluster.workers[id].process.pid}`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died: Respawning...`);
    cluster.fork();
  });
}
