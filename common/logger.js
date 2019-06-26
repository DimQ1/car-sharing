const { createLogger, format, transports } = require('winston');

class Logger {
    createLogger() {
        const logger = createLogger();

        if (process.env.NODE_ENV !== 'production') {
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
        } else {
            logger.add(new transports.File({
                filename: 'combined.log',
                format: format.json()
            }));
        }

        return logger;
    }
}

module.exports = new Logger()
    .createLogger();
