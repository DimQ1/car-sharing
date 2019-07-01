module.exports = (req, res, next) => {
    res.status(404)
        .json({
            url: req.url,
            message: 'Sorry cant find that!',
            error: '404'
        });
};
