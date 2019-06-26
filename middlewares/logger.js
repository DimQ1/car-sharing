
module.exports = ({ logger, isError }) => {
    function formatMessage({ error, request }) {
        if (error) {
            return `${request.method} ${request.url} ${error.stack}`;
        }

        return `${request.method} ${request.url} ${request.get('user-agent')}`;
    }

    if (isError) {
        return function (error, request, response, next) {
            logger.error(formatMessage({ error, request }));
            next(error);
        };
    }

    return function (request, response, next) {
        logger.info(formatMessage({ request }));
        next();
    };
};
