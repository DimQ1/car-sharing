const { carServices } = require('../services/cars');

class CarController {
    constructor(fuellowLevel = 15) {
        this.fuellowLevel = fuellowLevel;
    }

    async create(req, res) {
        res.status(201)
            .json(await carServices.create(req.body));
    }

    async getAll(req, res) {
        res.json(await carServices.getAll(req.query));
    }

    async findFuelLevelLess(req, res) {
        res.json(await carServices.findFuelLevelLess(this.fuellowLevel));
    }

    async findUnautorazedCard(req, res) {
        res.json(await carServices.findUnautarazedCard());
    }

    async getById(req, res) {
        res.json(await carServices.findById(req.params.carId));
    }

    async update(req, res) {
        res.json({ updated: await carServices.update(req.params.carId, req.body) });
    }

    async deleteById(req, res) {
        await carServices.deleteById(req.params.carId);
        res.status(204)
            .send();
    }
}

module.exports = new CarController();
