'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const config = require('./libs/config')('./config.json');
const logger = require('./libs/logger');

const app = express();
app.use(cors());
app.use(morgan('dev', { stream: logger.stream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = config.get('port');
app.listen(port, function() {
    logger.info('Server started on: ' + port);
});