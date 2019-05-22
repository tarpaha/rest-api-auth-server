'use strict';

const logger = require('../../libs/logger');
const MessageModel = require('../models/messages');

function getAll(req, res) {
    logger.info('-> messages.getAll()')
    MessageModel.find(function(err, messages) {
        if(err) {
            logger.error('-> messages.getAll() error: ' + err.message);
            res.statusCode = 500;
            return res.json({
                status: 'error',
                error: 'Server error'
            });
        }
        logger.info('-> messages.getAll() successful, count = ' + messages.length);
        res.json({ status: 'success', messages });
    });
}

function createTest(req, res) {
    logger.info('-> messages.createTest()');
    var message = new MessageModel({
        text: 'test message created at ' + new Date().toUTCString()
    });
    message.save(function(err) {
        if(err) {
            logger.error('-> messages.createTest() error: ' + err.message);
            res.statusCode = 500;
            return res.json({
                status: 'error',
                error: 'Server error'
            });
        }
        logger.info('-> messages.createTest() successful, id = ' + message._id);
        res.json({ status: 'success', message: message });
    });
}

module.exports = { getAll, createTest }