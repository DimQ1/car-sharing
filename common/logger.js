const { createLogger, format, transports } = require('winston');

class ConfigLogger {
    constructor(nodeEnv) {
        this.nodeEnv = nodeEnv || process.env.NODE_ENV;
    }

    getlogger() {
        const logger = createLogger();
        switch (this.nodeEnv) {
            case 'prodaction':
                logger.add(new transports.File({
                    filename: 'logs/combined.log',
                    format: format.json()
                }));
                break;
            default:
                logger.add(new transports.Console({
                    format: format.combine(
                        format.timestamp({
                            format: 'YY-MM-DD HH:MM:SS'
                        }),
                        format.printf(
                            info => `${info.timestamp}  ${info.level} : ${info.message}`
                        ),
                        format.colorize({
                            all: true
                        })
                    )
                }));
                break;
        }

        return logger;
    }
}

module.exports = nodeEnv => new ConfigLogger(nodeEnv)
    .getlogger();
