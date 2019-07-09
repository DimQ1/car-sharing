const carsRepository = require('../dataAccess/carsRepository');

class CarService {
    async create(car) {
        const newCar = (await carsRepository.create(car))
            .toObject({ virtuals: true });

        return newCar;
    }

    async updateById(id, car) {
        const updateResult = (await carsRepository.updateById(id, car));

        return updateResult;
    }

    async patch(query, car) {
        const updateResult = (await carsRepository.updateBy(query, car));

        return updateResult;
    }

    async getAll({ limit, offset, ...findQuery }) {
        const carsModel = await carsRepository.getAll(findQuery, limit || 10, offset || 0);

        if (!carsModel || !carsModel.findResult) {
            return null;
        }

        const allCarsObject = {
            items: carsModel.findResult.length,
            limit: limit || 10,
            offset: offset || 0,
            count: carsModel.countResult,
            cars: carsModel.findResult.map(car => car.toObject({ virtuals: true }))
        };

        return allCarsObject;
    }

    async findFuelLevelLess(level, { limit, offset }) {
        const carsModel = await carsRepository.findFuelLevelLess(level, limit || 10, offset || 0);

        const allCars = {
            items: carsModel.findResult.length,
            limit: limit || 10,
            offset: offset || 0,
            count: carsModel.countResult,
            cars: carsModel.findResult
        };

        return allCars;
    }

    async findUnautarazedCard({ limit, offset }) {
        const query = {
            'curentRun.driver.card': { exists: false },
            'status.name': 'Reserved'
        };
        const allCars = await carsRepository.getAll(query, limit, offset);
        const reservedCars = allCars
            .map(car => ({
                VIN: car.VIN,
                driver: car.curentRun.driver,
                location: car.location
            }));

        return reservedCars;
    }

    async findById(id) {
        const car = (await carsRepository.findById(id));
        if (car) {
            return car.toObject({ virtuals: true });
        }

        return null;
    }

    async deleteById(id) {
        const deleResult = await carsRepository.deleteById(id);

        return deleResult;
    }

    async deleteByVin(VIN) {
        const query = {
            VIN
        };

        const deleResult = await carsRepository.deleteBy(query);

        return deleResult;
    }
}

module.exports = new CarService();
