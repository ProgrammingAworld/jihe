var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var cookieUtil = require('../util/cookieUtil');

router.get('/sendCaptcha', function(req, res) {
    ws.get({
        url: '/captcha',
        data: req.body,
        qs: req.query,
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});


module.exports = router;
