const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');

router.get('/login', AuthController.login)


router.post('/login', AuthController.login_post)

router.get('/register', AuthController.register)

router.post('/register', AuthController.register_post)

router.get('/logout', AuthController.logout)

module.exports = router