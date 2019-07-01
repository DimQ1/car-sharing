const expressJwt = require('express-jwt');

module.exports = (err, req, res, next) => {
    if (err instanceof expressJwt.UnauthorizedError) {
        return res.status(401)
            .json({ message: 'Invalid Token' });
    }

    return res.status(500)
        .json({ message: err.message });
};
