const Joi = require('joi');

const productionInfoSchema = {
    brand: Joi.string()
        .required(),
    model: Joi.string()
        .required(),
    date: Joi.date()
        .required()
};

const cardSchema = {
    number: Joi.number()
        .required(),
    owner: Joi.string()
        .required(),
    validThrogh: Joi.date()
        .required()
};

const driverSchema = {
    licenseNumber: Joi.number()
        .required(),
    firstName: Joi.string()
        .required(),
    lastName: Joi.string()
        .required(),
    card: Joi.object(cardSchema)
};

const curentRunSchema = {
    startDate: Joi.date(),
    startFuelLevel: Joi.number(),
    startMilage: Joi.number(),
    driver: Joi.object(driverSchema)
};

const locationSchema = {
    type: Joi.string()
        .required(),
    coordinates: Joi.array()
        .items(
            Joi.number()
                .required(),
            Joi.number()
                .required()
        )
};

const newCar = {
    body: {
        VIN: Joi.number()
            .required(),
        registrationNumber: Joi.number()
            .required(),
        productionInfo: Joi.object(productionInfoSchema),
        status: Joi.string()
            .required(),
        fuelLevel: Joi.number()
            .required(),
        mileage: Joi.number()
            .required(),
        curentRun: Joi.object(curentRunSchema),
        location: Joi.object(locationSchema)
            .required(),
        BookingsHistory: Joi.array()
    }
};

module.exports = {
    newCar
};
