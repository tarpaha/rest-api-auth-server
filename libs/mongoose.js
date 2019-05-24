'use strict';

const mongoose = require('mongoose');

function connect(uri, logger) {
    mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
    const db = mongoose.connection;
    db.on('error', function(err) {
        logger.error('DB connection error:', err.message);
    });
    db.once('open', function() {
        logger.info('Connected to DB');
    });    
}

module.exports = { connect }