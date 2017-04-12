var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var md5 = require('md5');
var cookieUtil = require('../util/cookieUtil'),
    getToken = cookieUtil.getToken,
    getTokenInfo = cookieUtil.getTokenInfo;

function getTimestamp() {
    var now = new Date();
    var year = now.getFullYear().toString(),
        month = (now.getMonth() + 1).toString(),
        date = now.getDate().toString(),
        hour = now.getHours().toString(),
        minute = now.getMinutes().toString(),
        second = now.getSeconds().toString();
    month = month.length < 2 ? '0' + month : month;
    date = date.length < 2 ? '0' + date : date;
    hour = hour.length < 2 ? '0' + hour : hour;
    minute = minute.length < 2 ? '0' + minute : minute;
    second = second.length < 2 ? '0' + second : second;
    return year + month + date + hour + minute + second;
}

/**
 * 游戏列表查询
 */
router.get('/', function(req, res) {
    ws.get({
        url: '/games',
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 热门游戏列表
 */
router.get('/hot', function(req, res) {
    var query = req.query;
    query.weightType = 'hot';
    ws.get({
        url: '/gameWeights',
        qs: query,
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

/**
 * 新上架游戏列表
 */
router.get('/new', function(req, res) {
    var query = req.query;
    query.weightType = 'new';
    ws.get({
        url: '/gameWeights',
        qs: query,
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

/**
 * 启动游戏
 */
router.post('/:id/launch', function(req, res) {
    var gameId = req.params.id,
        userId = getTokenInfo(req).id,
        sessionId = req.cookies.sessionId,
        channelId = req.cookies.channelId;

    ws.post({
        url: '/gameLaunch',
        token: getToken(req),
        data: {
            gameId: gameId,
            userId: userId,
            channelId: channelId
        },
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        if(response.code == 0) {
            var url = response.data.landingPage,
                secret = response.data.secret,
                timeStamp = getTimestamp(),
                sign,
                resUrl;
            sign = md5((gameId + userId + sessionId + timeStamp + secret).toLowerCase());
            resUrl = url + "?gameId=" + gameId + '&userId=' + userId + '&chKey=' + channelId + '&sessionId=' + sessionId
                        + '&timeStamp=' + timeStamp + '&sign=' + sign;
            res.send({
                code: 0,
                msg: '启动成功',
                data: resUrl
            })
        } else {
            ws.handleResponse(response, res);
        }
    })
});

/**
 * 查询单个游戏
 */
router.get('/:id', function(req, res) {
    var id = req.params.id;
    var token = getToken(req);
    ws.get({
        url: '/games/' + id,
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

module.exports = router;
