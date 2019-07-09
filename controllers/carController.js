const carServices = require('../services/carsService');

class CarController {
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
        const { level } = req.params;
        const { query } = req;

        res.json(await carServices.findFuelLevelLess(level, query));
    }

    async findUnautorazedCard(req, res) {
        const { query } = req;

        res.json(await carServices.findUnautarazedCard(query));
    }

    async getById(req, res) {
        const { carId } = req.params;
        const car = await carServices.findById(carId);
        if (car) {
            return res.json(car);
        }

        return res.status(400)
            .json({ message: 'Car not found!' });
    }

    async updateById(req, res) {
        const { carId } = req.params;
        const updateCarModel = req.body;

        res.json({ updated: await carServices.updateById(carId, updateCarModel) });
    }

    async patch(req, res) {
        const { query } = req;
        const updateCarModel = req.body;

        res.json({ updated: await carServices.patch(query, updateCarModel) });
    }

    async deleteById(req, res) {
        const { carId } = req.params;
        const deleResult = await carServices.deleteById(carId);
        res.status(204)
            .json(deleResult);
    }

    async deleteByVin(req, res) {
        const { VIN } = req.params;

        const deleResult = await carServices.deleteByVin(VIN);
        res.json(deleResult);
    }
}

module.exports.carController = new CarController();
