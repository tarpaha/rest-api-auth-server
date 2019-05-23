'use strict';

const bcrypt = require('bcrypt');
const logger = require('../../libs/logger');
const userModel = require('../models/users');

function create(req, res) {
    logger.info('-> users.create()');
    var user = new userModel({
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

function authenticate(req, res) {
    logger.info('-> users.authenticate()');
    userModel.findOne({ email: req.body.email }, function(err, user) {
        if(err) {
            logger.error('-> users.authenticate() error: ' + err.message);
            res.statusCode = 500;
            return res.json({
                status: 'error',
                error: 'Server error'
            });
        }
        if(!user) {
            res.statusCode = 500;
            return res.json({
                status: 'error',
                error: 'Wrong credentials email'
            });
        }
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            logger.error('-> users.authenticate() error: bad credentials');
            res.statusCode = 500;
            return res.json({
                status: 'error',
                error: 'Wrong credentials password'
            });
        }
        logger.info('-> users.authenticate() successful');
        res.json({ status: 'success', user: { id: user._id }});
    });
}

// tests

function testCreate(req, res) {
    req.body.name = 'name';
    req.body.email = 'email';
    req.body.password = 'password';
    create(req, res);
}

function testAuthWrongEmail(req, res) {
    req.body.email = 'wrong';
    authenticate(req, res);
}

function testAuthWrongPassword(req, res) {
    req.body.email = 'email';
    req.body.password = 'wrong';
    authenticate(req, res);
}

function testAuthSuccess(req, res) {
    req.body.email = 'email';
    req.body.password = 'password';
    authenticate(req, res);
}

module.exports = { testCreate, testAuthWrongEmail, testAuthWrongPassword, testAuthSuccess }