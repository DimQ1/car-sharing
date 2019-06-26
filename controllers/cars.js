const { services } = require('../services/cars');

class CarsController {
    async create(req, res, next) {
        try {
            res.json(await services.create(req.body.card));
        } catch (error) {
            next(error);
        }
    }

    getAll(req, res, next) {
        try {
            res.json(services.getAll());
        } catch (error) {
            next(error);
        }
    }

    findById(req, res, next) {
        try {
            res.json(services.findById(req.params.cardId));
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            res.json({ updated: await services.Update(req.body.card) });
        } catch (error) {
            next(error);
        }
    }

    async deleteById(req, res, next) {
        try {
            res.json({ deleted: await services.deleteById(req.params.cardId) });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CarsController();
