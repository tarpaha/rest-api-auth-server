'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const config = require('./libs/config')('./config.json');
const logger = require('./libs/logger');

mongoose.connect(config.get('mongoose:uri'), { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', function(err) {
    logger.error('DB connection error:', err.message);
});
db.once('open', function() {
    logger.info('Connected to DB');
});

const app = express();
app.use(cors());
app.use(morgan('dev', { stream: logger.stream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/messages', require('./routes/messages'));
app.use('/users', require('./routes/users'));

const port = config.get('port');
app.listen(port, function() {
    logger.info('Server started on: ' + port);
});