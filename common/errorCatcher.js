module.exports = fn => (req, res, next) => {
    Promise.resolve()
        .then(() => fn(req, res, next))
        .catch((error) => {
            next(error);
        });
};
