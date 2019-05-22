'use strict';

const router = require('express').Router();
const messagesController = require('../api/controllers/messages');

router.get('/', messagesController.getAll);
router.get('/test', messagesController.createTest);

module.exports = router;