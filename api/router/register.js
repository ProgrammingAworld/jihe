var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var cookieUtil = require('../util/cookieUtil');

router.post('/', function(req, res) {
    ws.post({
        url: '/signUp/web',
        data: req.body,
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        var data = response.data;
        if(response.code == 0) {
            cookieUtil.setToken(res, data);
        }
        delete response.data.token;
        ws.handleResponse(response, res);
    })
});

module.exports = router;
