const cars = require('../../dataAccess/cars');

class CarService {
    create(car) {
        return cars.create(car);
    }

    update(car) {
        return cars.update(car);
    }

    getAll() {
        return cars.getAll();
    }

    getById(id) {
        return cars.findById(id);
    }

    deleteById(id) {
        return cars.deleteById(id);
    }
}

module.exports = new CarService();
