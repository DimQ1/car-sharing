const { createLogger, format, transports } = require('winston');

class configLogger {
    static getlogger() {
        const logger = createLogger();
        switch (process.env.NODE_ENV) {
            case 'prodaction':
                logger.add(new transports.File({
                    filename: 'combined.log',
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

module.exports = configLogger.getlogger();
