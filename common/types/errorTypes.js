const expressJwt = require('express-jwt');

class NotFoundContentError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundContentError';
    }
}

class UnauthorizedError extends expressJwt.UnauthorizedError {
}

module.exports = {
    NotFoundContentError,
    UnauthorizedError
};
