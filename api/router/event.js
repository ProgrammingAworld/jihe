var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var cookieUtil = require('../util/cookieUtil');
var getToken = cookieUtil.getToken,
    getTokenInfo = cookieUtil.getTokenInfo;
var _ = require('lodash');

/**
 * 保存埋点信息
 */
router.post('/', function(req, res) {
    var channelId = req.cookies.channelId,
        sessionId = req.cookies.sessionId,
        tokenInfo = getTokenInfo(req);
    var data = _.extend({
        chId: channelId,
        sessionId: sessionId,
        userId: tokenInfo ? tokenInfo.id : undefined
    }, req.body);
    if(data.data) {
        data.data = JSON.stringify(data.data);
    }
    ws.post({
        url: '/events',
        token: getToken(req),
        data: data,
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});


module.exports = router;
