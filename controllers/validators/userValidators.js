const Joi = require('@hapi/joi');

const paramsUserId = {
    params: {
        userId: Joi.string()
            .min(24)
            .max(24)
            .required()
    }
};

module.exports = {
    paramsUserId
};
