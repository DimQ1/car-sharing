module.exports = fn => (req, res, next) => {
    Promise.resolve()
        .then(() => {
            return fn(req, res, next);
        })
        .catch((error) => {
            next(error);
        });
};
