'use strict';

const jwt = require('jsonwebtoken');
const logger = require('../libs/logger');
const config = require('../libs/config');

const router = require('express').Router();
const messagesController = require('../api/controllers/messages');

router.get('/', messagesController.getAll);
router.get('/test', validateUser, messagesController.createTest);

function validateUser(req, res, next) {
    logger.info('-> validateUser()')
    jwt.verify(req.headers['x-access-token'], config.get('jwt:key'), function(err, decoded) {
        if(err) {
            res.statusCode = 500;
            res.json({
                status: 'error',
                error: err.message
            });
        }
        logger.info('-> validateUser() success, id = ' + decoded.id);
        req.userId = decoded.id;
        next();
    });
}

module.exports = router;