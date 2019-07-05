const cars = require('../../dataAccess/cars');

class CarService {
    _allCarsModelToObject(carsModel) {
        return carsModel.map(car => car.toObject({ virtuals: true }));
    }

    async create(car) {
        const newCar = (await cars.create(car))
            .toObject({ virtuals: true });

        return newCar;
    }

    async updateById(id, car) {
        const updateResult = (await cars.updateById(id, car))
            .toObject({ virtuals: true });

        return updateResult;
    }

    async patch(query, car) {
        const updateResult = (await cars.updateBy(query, car))
            .toObject({ virtuals: true });

        return updateResult;
    }

    async getAll(query) {
        const allCarsObject = this._allCarsModelToObject(await cars.getAll(query));

        return allCarsObject;
    }

    async findFuelLevelLess(level) {
        const query = { fuelLevel: { $lte: parseInt(level, 10) } };
        const allCarsObject = this._allCarsModelToObject(await cars.getAll(query));

        return allCarsObject;
    }

    async findUnautarazedCard() {
        const query = {
            'curentRun.driver.card': { $exists: false },
            'status.name': 'Reserved'
        };
        const allCars = await cars.getAll(query);
        const reservedCars = allCars
            .map(car => ({
                VIN: car.VIN,
                driver: car.curentRun.driver,
                location: car.location
            }));

        return reservedCars;
    }

    async findById(id) {
        const car = (await cars.findById(id))
            .toObject({ virtuals: true });

        return car;
    }

    async deleteById(id) {
        const deleResult = await cars.deleteById(id);

        return deleResult;
    }

    async deleteBy(query) {
        const deleResult = await cars.deleteBy(query);;

        return deleResult;
    }
}

module.exports = new CarService();
