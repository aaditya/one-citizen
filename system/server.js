const mongoose = require("mongoose");
const http = require("http");

const config = require("./config");

// Load Balancer
const lb = require('../handlers/cluster');

// Data handling configuration.
let db = config.setup.database;
let port = process.env.PORT || config.setup.port;

mongoose.Promise = global.Promise;

// This global variable saves all the information about the type of server required.
global.xe = {
  "sign": config.setup.sign,
  "salt": config.setup.salt,
  "ckey": config.setup.cryptoKey,
  "cblink": config.setup.callback
}

// Server Setup
const app = require("../app");
const server = http.createServer(app);

// Here, lb stands for load balancer, we are using the inbuilt node cluster module and useing the limiter in config
// to set up cpu . 0 -> all, anything else -> if possible then max amt or the amount of cpu threads specified.
lb(() => {
  // Mongo Connection
  mongoose.connect(db, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log(`Connected to database.`); }
    else { 
      console.log(err.message);
    }
  });

  // Core Server Setup
  server.listen(port, () => {
    console.log(`Server running on port ${port}.`);
  });
});

// In case we need to expand our server to enable sockets or run test cases, we need this object.
module.exports = server;