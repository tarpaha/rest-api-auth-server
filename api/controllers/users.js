'use strict';

const logger = require('../../libs/logger');
const UserModel = require('../models/users');

function create(req, res) {
    logger.info('-> users.create()');
    var user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save(function(err) {
        if(err) {
            logger.error('-> users.create() error: ' + err.message);
            res.statusCode = 500;
            return res.json({
                status: 'error',
                error: err.code == 11000 ? 'Duplicate email' : 'Server error'
            });
        }
        logger.info('-> users.create() successful, id = ' + user._id);
        res.json({ status: 'success', user: { id: user._id }});
    });
}

function createTest(req, res) {
    req.body.name = 'name';
    req.body.email = 'email';
    req.body.password = 'password';
    create(req, res);
}

module.exports = { createTest }