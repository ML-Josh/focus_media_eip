const express = require('express');

const router = express.Router();

/*
如果需要cors，可使用﹕

const skCors = require('~server/app/middleware/skCors');

const cors = skCors(['http://localhost:8080']);
router.options('/api/v1.0', cors);
router.use('/api/v1.0', cors);
*/

/*
如果需要rate limite，可使用：

const skRateLimit = require('~server/app/middleware/skRatelimit');

const limiter = skRateLimit({ windowMs: 1000 * 60, max: 60 });
// 套用ratelimit (整個path會被一起算)
router.use('/api/v1.0/account', limiter);
*/

// 以下將其他router或controller接上
router.use('/api/v1.0', require('./login'));
router.use('/api/v1.0/upload', require('./upload'));

module.exports = (app) => { app.use(router); };
