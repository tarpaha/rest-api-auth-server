'use strict';

const router = require('express').Router();
const usersController = require('../api/controllers/users');

router.get('/test_create', usersController.testCreate);
router.get('/test_auth_wrong_email', usersController.testAuthWrongEmail);
router.get('/test_auth_wrong_password', usersController.testAuthWrongPassword);
router.get('/test_auth_success', usersController.testAuthSuccess);

module.exports = router;