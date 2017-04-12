var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var getToken = require('../util/cookieUtil').getToken;

/**
 * 查询游戏服务器列表
 */
router.get('/', function(req, res) {
    ws.get({
        url: '/gameServers',
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
 * 查询今日开服游戏服务器
 */
router.get('/listToday', function(req, res) {
    ws.get({
        url: '/gameServerTime/1',
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
 * 查询未来一周游戏服务器
 */
router.get('/listNextWeek', function(req, res) {
    ws.get({
        url: '/gameServerTime/2',
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

module.exports = router;
