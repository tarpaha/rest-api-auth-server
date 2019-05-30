'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../../libs/logger');
const config = require('../../libs/config');
const userModel = require('../models/users');

function create(req, res, next) {
    logger.info('-> users.create()');
    var user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save(function(err) {
        if(err) {
            logger.error('-> users.create() error: ' + err.message);
            return next(new Error(err.code == 11000 ? 'duplicate email' : 'server error'));
        }
        logger.info('-> users.create() successful, id = ' + user._id);
        res.json({ status: 'success', user: { id: user._id }});
    });
}

function authenticate(req, res, next) {
    logger.info('-> users.authenticate()');
    userModel.findOne({ email: req.body.email }, function(err, user) {
        if(err) {
            logger.error('-> users.authenticate() error: ' + err.message);
            return next(new Error('server error'));
        }
        if(!user) {
            logger.error('-> users.authenticate() error: no email found');
            return next(new Error('wrong credentials'));
        }
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            logger.error('-> users.authenticate() error: wrong password');
            return next(new Error('wrong credentials'));
        }
        logger.info('-> users.authenticate() successful');
        const token = jwt.sign({ id: user._id }, config.get('jwt:key'), { expiresIn: config.get('jwt:expiresIn') });
        res.json({ status: 'success', user: { id: user._id, token: token }});
    });
}

function validate(req, res, next) {
    logger.info('-> users.validate()')
    jwt.verify(req.headers['x-access-token'], config.get('jwt:key'), function(err, decoded) {
        if(err) {
            logger.info('-> users.validate() failed, error: ' + err.message);
            return next(new Error(err.message));
        }
        logger.info('-> users.validate() success, id = ' + decoded.id);
        req.userId = decoded.id;
        next();
    });
}

// tests

function testCreate(req, res, next) {
    req.body.name = 'name';
    req.body.email = 'email';
    req.body.password = 'password';
    create(req, res, next);
}

function testAuthWrongEmail(req, res, next) {
    req.body.email = 'wrong';
    authenticate(req, res, next);
}

function testAuthWrongPassword(req, res, next) {
    req.body.email = 'email';
    req.body.password = 'wrong';
    authenticate(req, res, next);
}

function testAuthSuccess(req, res, next) {
    req.body.email = 'email';
    req.body.password = 'password';
    authenticate(req, res, next);
}

module.exports = { validate, testCreate, testAuthWrongEmail, testAuthWrongPassword, testAuthSuccess }