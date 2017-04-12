var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log4js = require('log4js');
var compression = require('compression');
var uuidV1 = require('uuid/v1');
var getTokenInfo = require('./api/util/cookieUtil').getTokenInfo;
var ws = require('./api/util/ws');
var cookieUtil = require('./api/util/cookieUtil');

var app = express();
var api = require('./api/app');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(log4js.connectLogger(require('./logger')(), {level: 'auto'}));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

app.get('/login/wx/:path', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/MP_verify_UFfyjiAv3trLNPmI.txt'));
});

app.get('/login/wx', function(req, res) {
  var code = req.query.code,
      state = req.query.state,
      url;
  if(state == 'platform') {
    url = '/auth/WeChat_web';
  } else {
    url = '/auth/WeChat_Official_Account'
  }

  //登录
  ws.get({
    url: url,
    qs: {
      code: code
    }
  }).then(function(response) {
    var data = response.data;
    if(response.code == 0) {
      cookieUtil.setToken(res, data);
      res.redirect('/?from=100115');
    } else {
      res.json(response);
    }
  })
});

app.get('/login/qq', function(req, res) {
  var code = req.query.code;
  ws.get({
    url: '/auth/QQ',
    qs: {
      code: code
    }
  }).then(function(response) {
    var data = response.data;
    if(response.code == 0) {
      cookieUtil.setToken(res, data);
      res.redirect('/?from=100114');
    } else {
      res.json(response);
    }
  })
});

app.get('*', function(req, res) {
  var tokenInfo = getTokenInfo(req);
  var userId = tokenInfo && tokenInfo.id ? tokenInfo.id : '',
      rewardPoints = tokenInfo && tokenInfo.rewardPoints ? tokenInfo.rewardPoints : '',
      phone = tokenInfo && tokenInfo.phone ? tokenInfo.phone : '',
      loginType = tokenInfo && tokenInfo.loginInfo ? tokenInfo.loginInfo.providerID : '',
      nickName = tokenInfo && tokenInfo.name ? tokenInfo.name : '',
      avatarURL = tokenInfo && tokenInfo.avatarURL ? tokenInfo.avatarURL : '';
  var channelId = req.query.channelId;
  // check outside input to avoid script attack
  if(channelId && /[0-9|a-f]{24}/.test(channelId)) {
    // 返回最新访问的channelId
    res.cookie('channelId', channelId);
  } else if(req.cookies.channelId) {
    // 返回之前访问在cookie存放的channelId
    res.cookie('channelId', req.cookies.channelId);
  } else {
    // 返回默认的channelId
    res.cookie('channelId', '586228af7b4e4a38fc20903d');
  }
  res.cookie('sessionId', uuidV1().replace(/\-/g, ''));
  res.render('index', {
    title: 'A站游戏-游戏中心',
    userId: userId,
    rewardPoints:rewardPoints,
    phone: phone,
    loginType: loginType,
    nickName: nickName,
    avatarURL: avatarURL
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
