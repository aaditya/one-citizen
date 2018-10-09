const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const compress = require("compression");
const morgan = require("morgan");

/* Global Variables */
global.__base = __dirname + '/';

const config = require(__base + 'system/config');

/* Express Instance */
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

if (xe.morgan) {
  app.use(morgan(xe.morgan));
}

app.set('sign', xe.sign);
app.set('salt', xe.salt);

if (xe.type == "production") {
  app.use(compress());
  app.use(helmet());
  app.enable('trust proxy');
}

/* Cross-Origin Access */
if (config.settings.origin.access) {
  const x_handler = require(__base + 'modules/misc/xors');
  app.use(x_handler);
}

/* API Routes */
app.use('/api', require(__base + 'routes/index.js'));

/* Angular Application Root */
app.use(express.static(__dirname + '/dist'));
app.use((req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
});

module.exports = app;