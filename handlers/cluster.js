const cluster = require('cluster');
const config = require("../system/config.json");

//  Here, we set the configuration for the load balancer using cluster and use the old callback hell for implementing a nicer
// version :P
const balancer = (next) => {
    if (config.settings.server.balancer) {
        if (cluster.isMaster) {
            let limiter = config.setup.limiter;
            let maxWorkers = require('os').cpus().length;

            let allowedWorkers = limiter == 0 ? maxWorkers : (limiter > maxWorkers ? maxWorkers : limiter);

            console.log(`Cluster Workers: ${allowedWorkers}`);

            for (let i = 0; i < allowedWorkers; i++) {
                cluster.fork();
            }

            cluster.on('online', (worker) => {
                //  Pretty self explanatory stuff.
                console.log(`Worker Active: ${worker.process.pid}`);
            });

            cluster.on('exit', (worker, code, signal) => {
                // If a worker dies, respawn another one. ASAP.
                console.log(`${code} Worker id: ${worker.process.pid} dead. Signal: ${signal}`);
                cluster.fork();
            });
        }
        else {
            // Told you, callback hell.
            next();
        }
    }
    else {
        // Another one. DJ Khaled likes this.
        next();
    }
}

module.exports = balancer;