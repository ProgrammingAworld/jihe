var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var cookieUtil = require('../util/cookieUtil');
var getToken = cookieUtil.getToken,
    getTokenInfo = cookieUtil.getTokenInfo;

/**
 * 查询礼包列表
 */
router.get('/', function(req, res) {
    ws.get({
        url: '/gifts/weight',
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
 * 按游戏查询礼包列表
 */
router.get('/listByGame', function(req, res) {
    ws.get({
        url: '/gifts/weight/listById',
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
 * 获取礼包码
 */
router.get('/:id/code', function(req, res) {
    ws.post({
        url: '/gifts/code/receive',
        data: {
            giftId: req.params.id,
            userId: getTokenInfo(req).id
        },
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
