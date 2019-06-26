module.exports = (request, response, next) => {
    response.status(404)
        .json({
            url: request.url,
            message: 'Sorry cant find that!',
            error: '404'
        });
};
