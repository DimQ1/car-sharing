const Joi = require('joi');

const create = {
    body: {
        card:
        {
            boardId: Joi.number()
                .required(),
            name: Joi.string()
                .required(),
            description: Joi.string()
                .required(),
            estimate: Joi.string()
                .required(),
            status: Joi.string()
                .required()
                .valid('ready', 'inprogress', 'not ready'),
            due: Joi.date()
                .required(),
            labels: Joi.array()
                .required()
        }
    }
};

const update = {
    body: {
        card:
        {
            id: Joi.number()
                .required(),
            created: Joi.date()
                .required(),
            boardId: Joi.number()
                .required(),
            name: Joi.string()
                .required(),
            description: Joi.string()
                .required(),
            estimate: Joi.string()
                .required(),
            status: Joi.string()
                .required()
                .valid('ready', 'inprogress', 'not ready'),
            due: Joi.date()
                .required(),
            labels: Joi.array()
                .required()
        }
    }
};

module.exports = {
    create,
    update
};
