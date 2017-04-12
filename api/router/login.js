var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var cookieUtil = require('../util/cookieUtil');
var config = require('../config');
var logger = require('../../logger')();

/**
 * 密码登录
 */
router.post('/', function(req, res) {
    ws.post({
        url: '/auth/credentials',
        data: req.body,
        headers: {
            sessionId: req.cookies.sessionId,
            channelId: req.cookies.channelId
        }
    }).then(function(response) {
        var data = response.data;
        if(response.code == 0) {
            cookieUtil.setToken(res, data);
        }
        delete response.data.token;
        ws.handleResponse(response, res);
    });
});

/**
 * 登出
 */
router.post('/logout', function(req, res) {
    cookieUtil.clearToken(res);
    res.send({
        code: 0,
        msg: '登出成功'
    });
});

/**
 * 获取微信登录跳转链接
 */
router.post('/wx', function(req, res) {
    var isMobileWx = req.query.isMobileWx;
    var cfg = config[process.env.NODE_ENV || 'dev'];
    try {
        var url;
        // query 中获取的都是字符串类型，所以要用字符串比较
        if(isMobileWx == "true") {
            url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE&connect_redirect=1#wechat_redirect";
            url = url.replace(/APPID/, cfg.wxAppId)
                .replace(/REDIRECT_URI/, encodeURIComponent(cfg.wxRedirectUrl))
                .replace(/SCOPE/, 'snsapi_userinfo')
                .replace(/STATE/, '');
        } else {
            url = "https://open.weixin.qq.com/connect/qrconnect?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect";
            url = url.replace(/APPID/, cfg.wxPlatformAppId)
                .replace(/REDIRECT_URI/, encodeURIComponent(cfg.wxRedirectUrl))
                .replace(/SCOPE/, 'snsapi_login')
                .replace(/STATE/, 'platform');
        }
        res.send({
            code: 0,
            msg: '成功',
            data: url
        });
    } catch (error) {
        res.send({
            code : 500,
            msg: '获取微信第三方登录跳转链接失败'
        });
    }
});

/**
 * 获取QQ登录跳转链接
 */
router.post('/qq', function(req, res) {
    var cfg = config[process.env.NODE_ENV || 'dev'];
    var url = "https://graph.qq.com/oauth2.0/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE";
    url = url.replace(/CLIENT_ID/, cfg.qqClientId)
        .replace(/REDIRECT_URI/, encodeURIComponent(cfg.qqRedirectUrl))
        .replace(/SCOPE/, 'get_user_info')
        .replace(/STATE/, '');
    res.send({
        code: 0,
        msg: '成功',
        data: url
    })
});

module.exports = router;
