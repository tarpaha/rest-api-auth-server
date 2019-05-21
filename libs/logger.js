'use strict';

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [new transports.Console()]
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message.slice(0, -1));
    }
};

module.exports = logger;