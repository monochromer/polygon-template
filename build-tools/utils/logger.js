const winston = require('winston');

function getLogger(module) {
    const path = module.filename
        // .split('/')
        // .slice(-2)
        // .join('/');

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                timestamp: true,
                colorize: true,
                label: path
            })
        ]
    });
}

module.exports = getLogger;
