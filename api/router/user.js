var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var cookieUtil = require('../util/cookieUtil'),
    getToken = cookieUtil.getToken,
    getTokenInfo = cookieUtil.getTokenInfo;

router.get('/personal', function(req, res) {
    ws.get({
        url: '/personal',
        token: getToken(req),
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.get('/games', function(req, res) {
    var tokenInfo = getTokenInfo(req),
        id = tokenInfo ? tokenInfo.id : '';
    ws.get({
        url: '/user/' + id + '/games',
        token: getToken(req),
        qs: req.query,
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 用户签到
 */
router.post('/signIn', function(req, res) {
    ws.get({
        url: '/signIn',
        token: getToken(req),
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 绑定手机号
 */
router.post('/bindPhone', function(req, res) {
    ws.post({
        url: '/signUp/web/related',
        token: getToken(req),
        data: req.body,
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

module.exports = router;
