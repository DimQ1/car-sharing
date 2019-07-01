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

    findById(id) {
        return cars.findById(id);
    }

    deleteById(id) {
        return cars.deleteById(id);
    }
}

module.exports = new CarService();
