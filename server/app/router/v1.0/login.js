const express = require('express');
const jwtVerify = require('~server/app/middleware/jwtVerify');
const login = require('~root/server/app/controller/v1.0/login/auth');

const router = express.Router();

router.get('/login', jwtVerify(), login);

module.exports = router;
