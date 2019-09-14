class LoggerFactory {
    constructor(logger) {
        this._logger = logger;
    }

    _formatMessage({ error, req }) {
        if (error) {
            return `${req.method} ${req.url} ${error.stack}`;
        }

        return `${req.method} ${req.url} ${req.get('user-agent')}`;
    }

    create(type) {
        const logger = this._logger;
        const formatMessage = this._formatMessage;
        switch (type) {
            case 'errorLogger':
                return function (error, req, res, next) {
                    logger.error(formatMessage({ error, req }));
                    next(error);
                };
            case 'requestLogger':
            default:
                return function (req, res, next) {
                    logger.info(formatMessage({ req }));
                    next();
                };
        }
    }
}

module.exports = LoggerFactory;
