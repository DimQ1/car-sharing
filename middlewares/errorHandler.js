const expressJwt = require('express-jwt');

module.exports = (err, req, res, next) => {
    if (err instanceof expressJwt.UnauthorizedError) {
        // jwt authentication error
        return res.status(401)
            .json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500)
        .json({ message: err.message });
};
