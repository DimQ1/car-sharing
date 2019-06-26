const { services } = require('../services/cars');

class CarsController {
    async create(req, res, next) {
        try {
            res.json(await services.create(req.body));
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            res.json(await services.getAll());
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            res.json(await services.getById(req.params.carId));
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            res.json({ updated: await services.update(req.body, req.params.carId) });
        } catch (error) {
            next(error);
        }
    }

    async deleteById(req, res, next) {
        try {
            res.json({ deleted: await services.deleteById(req.params.carId) });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CarsController();
