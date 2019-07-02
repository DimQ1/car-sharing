const { carServices } = require('../services/cars');

class CarController {
    constructor(fuellowLevel = 15) {
        this.fuellowLevel = fuellowLevel;
    }

    async create(req, res) {
        const car = req.body;
        res.status(201)
            .json(await carServices.create(car));
    }

    async getAll(req, res) {
        const { query } = req;

        res.json(await carServices.getAll(query));
    }

    async findFuelLevelLess(req, res) {
        res.json(await carServices.findFuelLevelLess(this.fuellowLevel));
    }

    async findUnautorazedCard(req, res) {
        res.json(await carServices.findUnautarazedCard());
    }

    async getById(req, res) {
        const { carId } = req.params;

        res.json(await carServices.findById(carId));
    }

    async updateById(req, res) {
        const { carId } = req.params;
        const updateCarModel = req.body;

        res.json({ updated: await carServices.updateById(carId, updateCarModel) });
    }

    async patch(req, res) {
        const { query } = req.query;
        const updateCarModel = req.body;

        res.json({ updated: await carServices.patch(query, updateCarModel) });
    }

    async deleteById(req, res) {
        const { carId } = req.params;
        await carServices.deleteById(carId);
        res.status(204)
            .send();
    }

    async deleteBy(req, res) {
        const { query } = req.query;

        await carServices.deleteBy(query);
        res.status(204)
            .send();
    }
}

module.exports = new CarController();
