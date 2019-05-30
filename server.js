'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const config = require('./libs/config');
const logger = require('./libs/logger');
const mongoose = require('./libs/mongoose');

 mongoose.connect(config.get('mongoose:uri'), logger);

const app = express();
app.set('secretKey', config.get('secretKey'));
app.use(cors());
app.use(morgan('dev', { stream: logger.stream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/messages', require('./routes/messages'));
app.use('/users', require('./routes/users'));

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

const port = config.get('port');
app.listen(port, function() {
    logger.info('Server started on: ' + port);
});