'use strict';

const jwt = require('jsonwebtoken');
const logger = require('../libs/logger');
const config = require('../libs/config');

const router = require('express').Router();
const usersController = require('../api/controllers/users');
const messagesController = require('../api/controllers/messages');

router.get('/', messagesController.getAll);
router.get('/test', usersController.validate,  messagesController.createTest);

module.exports = router;