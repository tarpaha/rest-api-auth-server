'use strict';

const router = require('express').Router();
const messagesController = require('../api/controllers/messages');

router.get('/', messagesController.getAll);

module.exports = router;