var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var getToken = require('../util/cookieUtil').getToken;

router.get('/', function(req, res) {
    var token = getToken(req);
    ws.get({
        url: '/games_weight',
        token: token,
        qs: req.query,
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.post('/:id/hot', function(req, res) {
    var token = getToken(req);
    ws.post({
        url: '/games_weight/hot',
        token: token,
        data: req.body,
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

router.post('/:id/new', function(req, res) {
    var token = getToken(req);
    ws.post({
        url: '/games_weight/new',
        token: token,
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});


module.exports = router;
