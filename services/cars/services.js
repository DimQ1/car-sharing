const cars = require('../../dataAccess/cars');

class CarService {
    create(car) {
        return cars.create(car);
    }

    update(car, id) {
        return cars.update(car, id);
    }

    getAll() {
        return cars.getAll();
    }

    getById(id) {
        return cars.getById(id);
    }

    deleteById(id) {
        return cars.deleteById(id);
    }
}

module.exports = new CarService();
