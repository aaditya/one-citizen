const cluster = require('cluster');
const config = require("../system/config.json");

const balancer = (next) => {
    if (config.settings.server.balancer) {
        if (cluster.isMaster) {
            let limiter = xe.limiter;
            let maxWorkers = require('os').cpus().length;

            let allowedWorkers = limiter == 0 ? maxWorkers : (limiter > maxWorkers ? maxWorkers : limiter);

            console.log(`Cluster Workers: ${allowedWorkers}`);

            for (let i = 0; i < allowedWorkers; i++) {
                cluster.fork();
            }

            cluster.on('online', (worker) => {
                console.log(`Worker Active: ${worker.process.pid}`);
            });

            cluster.on('exit', (worker, code, signal) => {
                console.log(`${code} Worker id: ${worker.process.pid} dead. Signal: ${signal}`);
                cluster.fork();
            });
        }
        else {
            next();
        }
    }
    else {
        next();
    }
}

module.exports = balancer;