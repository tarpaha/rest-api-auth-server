'use strict';

const logger = require('../../libs/logger');
const MessageModel = require('../models/messages');

function getAll(req, res, next) {
    logger.info('-> messages.getAll()')
    MessageModel.find({}).sort({ createdAt: 'desc' }).exec(function(err, messages) {
        if(err) {
            logger.error('-> messages.getAll() error: ' + err.message);
            return next(new Error('server error'));
        }
        logger.info('-> messages.getAll() successful, count = ' + messages.length);
        res.json({
            status: 'success',
            messages: messages.map(message => ({
                id: message._id,
                text: message.text,
                date: message.createdAt
            }))
        });
    });
}

function createTest(req, res, next) {
    logger.info('-> messages.createTest()');
    var message = new MessageModel({
        text: 'test message created at ' + new Date().toUTCString()
    });
    message.save(function(err) {
        if(err) {
            logger.error('-> messages.createTest() error: ' + err.message);
            return next(new Error('server error'));
        }
        logger.info('-> messages.createTest() successful, id = ' + message._id);
        res.json({ status: 'success', message: message });
    });
}

module.exports = { getAll, createTest }