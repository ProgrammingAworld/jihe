var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var getToken = require('../util/cookieUtil').getToken;

/**
 * 游戏资讯查询
 */
router.get('/', function(req, res) {
    ws.get({
        url: '/flashnews',
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
 * 单个资讯查询
 */
router.get('/:id', function(req, res) {
    ws.get({
        url: '/flashnews/' + req.params.id,
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
