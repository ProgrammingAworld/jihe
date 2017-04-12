var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var getToken = require('../util/cookieUtil').getToken;

/**
 * cp列表查询
 */
router.get('/', function(req, res) {
    var token = getToken(req);
    ws.get({
        url: '/cps',
        token: token,
        qs: req.query,
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

/**
 * cp新增
 */
router.post('/', function(req, res) {
    ws.post({
        url: '/cps',
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

/**
 * cp修改
 */
router.post('/:id', function(req, res) {
    ws.post({
        url: '/cps/' + req.params.id,
        data: req.body,
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
 * cp单个查询
 */
router.get('/:id', function(req, res) {
    ws.get({
        url: '/cps/cp/' + req.params.id,
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
 * cp删除
 */
router.delete('/:id', function(req, res) {
    ws.delete({
        url: '/cps/' + req.params.id,
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
