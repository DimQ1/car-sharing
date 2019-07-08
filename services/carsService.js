const carsRepository = require('../dataAccess/carsRepository');

class CarService {
    _allCarsModelToObject(carsModel) {
        return carsModel.map(car => car.toObject({ virtuals: true }));
    }

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

    async getAll(query) {
        const allCarsObject = this._allCarsModelToObject(await carsRepository.getAll(query));

        return allCarsObject;
    }

    async findFuelLevelLess(level) {
        const allCarsObject = await carsRepository.findFuelLevelLess(level);

        return allCarsObject;
    }

    async findUnautarazedCard() {
        const query = {
            'curentRun.driver.card': { exists: false },
            'status.name': 'Reserved'
        };
        const allCars = await carsRepository.getAll(query);
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
