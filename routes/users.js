'use strict';

const router = require('express').Router();
const usersController = require('../api/controllers/users');

router.get('/test', usersController.createTest);

module.exports = router;