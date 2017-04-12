var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var cookieUtil = require('../util/cookieUtil');
var getToken = cookieUtil.getToken,
    getTokenInfo = cookieUtil.getTokenInfo;
var _ = require('lodash');

/**
 * 获取本次访问集字结果
 */
router.post('/collection', function(req, res) {
    ws.post({
        url: '/activity/collection/456',
        token: getToken(req),
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

module.exports = router;