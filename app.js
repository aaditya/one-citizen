const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compress = require('compression');
const morgan = require('morgan');

/* We set this variable to ease off the require file process */
global.__base = __dirname + '/';

const config = require(__base + 'system/config');

/* Express Instance */
const app = express();

// Body Parser setup
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Now we set up basic security headers for express.
app.use(compress());
app.use(helmet());
app.enable('trust proxy');
app.use(morgan('dev'));

/* Cross-Origin Access */
if (config.settings.origin.access) {
  const cors = require(__base + 'modules/misc/xors');
  app.use(cors);
}

/* API Routes */
app.use('/api', require(__base + 'routes/index.js'));

/* Angular Application Root */
app.use(express.static(__dirname + '/dist'));
app.use((req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
});

module.exports = app;