const cars = require('../../dataAccess/cars');

class CarService {
    create(car) {
        return cars.create(car);
    }

    updateById(id, car) {
        return cars.updateById(id, car);
    }

    patch(query, car) {
        return cars.updateBy(query, car);
    }

    getAll(query) {
        return cars.getAll(query);
    }

    findFuelLevelLess(level) {
        const query = { fuelLevel: { $lte: parseInt(level, 10) } };

        return cars.getAll(query);
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

    findById(id) {
        return cars.findById(id);
    }

    deleteById(id) {
        return cars.deleteById(id);
    }

    deleteBy(query) {
        return cars.deleteBy(query);
    }
}

module.exports = new CarService();
