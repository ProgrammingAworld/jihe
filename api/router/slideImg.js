var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var getToken = require('../util/cookieUtil').getToken;

/**
 * 轮播图列表查询
 */
router.get('/', function(req, res) {
    ws.get({
        url: '/slideImgs/weight/desc',
        token: getToken(req),
        qs: req.qs,
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

module.exports = router;
