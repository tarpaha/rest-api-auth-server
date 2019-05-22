'use strict';

const logger = require('../../libs/logger');
const messageModel = require('../models/messages');

function getAll(req, res) {
    logger.info('-> messages.getAll()')
    messageModel.find(function(err, messages) {
        if(err) {
            logger.error('-> messages.getAll() error: ' + err.message);
            res.statusCode = 500;
            return res.send({
                status: 'error',
                error: 'Server error'
            });
        }
        logger.info('-> messages.getAll() successful, count = ' + messages.length);
        res.send({ status: 'success', messages });
    });
}

module.exports = { getAll }