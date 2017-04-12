var log4js = require('log4js');

log4js.configure({
    appenders: [
        { type: 'console' },
        {
            type: 'file',
            filename: 'logs/log.log',
            maxLogSize: 102400,
            backups: 10,
            category: 'normal'
        }
    ],
    replaceConsole: true
});

module.exports = function(name) {
    name = name ? name : 'normal';
    var logger = log4js.getLogger(name);
    logger.setLevel(log4js.levels.INFO);
    return logger;
};