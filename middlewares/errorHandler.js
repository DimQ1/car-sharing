const errorTypes = require('../common/types/errorTypes');

module.exports = (err, req, res, next) => {
    if (err instanceof errorTypes.UnauthorizedError) {
        return res.status(401)
            .json({ message: 'Invalid Token' });
    }

    return res.status(500)
        .json({ message: err.message });
};
