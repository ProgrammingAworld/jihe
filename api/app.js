var express = require('express');
var tokenFilter = require('./filter/tokenFilter');
var logger = require('../logger')();

var app = express();
app.use(tokenFilter);
app.use('/login', require('./router/login'));
app.use('/cp', require('./router/cp'));
app.use('/game', require('./router/game'));
app.use('/gameServer', require('./router/gameServer'));
app.use('/gameWeight', require('./router/gameWeight'));
app.use('/slideImg', require('./router/slideImg'));
app.use('/gift', require('./router/gift'));
app.use('/gameNews', require('./router/gameNews'));
app.use('/register', require('./router/register'));
app.use('/system', require('./router/system'));
app.use('/user', require('./router/user'));
app.use('/event', require('./router/event'));
app.use('/activity', require('./router/activity'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    var status = err.status || 500;
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error json
    logger.error(err);
    res.status(status);
    res.send(err.message);
});

module.exports = app;