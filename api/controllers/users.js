'use strict';

const logger = require('../../libs/logger');
const UserModel = require('../models/users');

function createTest(req, res) {
    logger.info('-> users.createTest()');
    var user = new UserModel({
        name: 'name',
        email: 'email',
        password: 'password'
    });
    user.save(function(err) {
        if(err) {
            logger.error('-> users.createTest() error: ' + err.message);
            res.statusCode = 500;
            return res.json({
                status: 'error',
                error: err.code == 11000 ? 'Duplicate email' : 'Server error'
            });
        }
        logger.info('-> users.createTest() successful, id = ' + user._id);
        res.json({ status: 'success', user: { id: user._id }});
    });
}

module.exports = { createTest }