const Joi = require('@hapi/joi');

const login = {
    body: {
        login: Joi.string()
            .required(),
        password: Joi.string()
            .required()
    }
};

module.exports = {
    login
};
