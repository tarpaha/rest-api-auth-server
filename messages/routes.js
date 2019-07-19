'use strict';

const router = require('express').Router();
const usersController = require('../users/controllers');
const messagesController = require('./controllers');

router.get('/', messagesController.getAll);
router.get('/test', usersController.validate,  messagesController.createTest);

module.exports = router;