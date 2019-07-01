const cars = require('../../dataAccess/cars');

class CarService {
    create(car) {
        return cars.create(car);
    }

    update(car, id) {
        return cars.update(car, id);
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
}

module.exports = new CarService();
