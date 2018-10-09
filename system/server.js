const mongoose = require("mongoose");
const http = require("http");

const option = process.argv;
const config = require("./config");

// Load Balancer
const lb = require('../handlers/cluster');

// Data handling configuration.
let db = config.setup.development.database;
let port = config.setup.development.PORT;

mongoose.Promise = global.Promise;

// Environment Setup
if (option[2] === 'development') {
  process.env.NODE_ENV = 'development';
  port = config.setup.development.port;
  db = config.setup.development.database;
  global.xe = {
    "morgan": "dev",
    "sign": config.setup.development.sign,
    "salt": config.setup.development.salt,
    "ckey": config.setup.development.cryptoKey,
    "limiter": config.setup.development.limiter
  };
} else if (option[2] === 'testing') {
  process.env.NODE_ENV = 'testing';
  port = config.setup.testing.port;
  db = config.setup.testing.database;
  global.xe = {
    "morgan": "tiny",
    "sign": config.setup.testing.sign,
    "salt": config.setup.testing.salt,
    "ckey": config.setup.testing.cryptoKey,
    "limiter": config.setup.testing.limiter
  };
} else if (option[2] === 'production' || option[2] === null || option[2] == undefined) {
  console.log('Production Mode.');
  db = config.setup.production.database;
  port = config.setup.production.port;
  global.httpsRedir = true;
  global.xe = {
    "morgan": false,
    "type": "production",
    "sign": config.setup.production.sign,
    "salt": config.setup.production.salt,
    "ckey": config.setup.production.cryptoKey,
    "limiter": config.setup.production.limiter
  }

  if (process.env.NODE_ENV != 'production') { 
    process.env.NODE_ENV = 'production';
  }
}

// Server Setup
const app = require("../app");
const server = http.createServer(app);

lb(() => {
  // Miscellaneous Setups.
  port = process.env.PORT || port;

  // Mongo Connection
  mongoose.connect(db, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log(`Database Online.`); }
    else { console.log('Database Offline.'); }
  });

  // Core Server Setup
  server.listen(port, () => {
    console.log(`Instance Online: ${port}`);
  });
});

module.exports = server;