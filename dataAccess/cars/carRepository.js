const { cruid } = require('../repository');
const Car = require('../../models/car');

class CarRepository {
    async create(car) {
        const newCar = await cruid.create(new Car(car));

        return newCar;
    }

    async update(car) {
        const updatedCar = await cruid.update(Car, car.id, car);

        return updatedCar;
    }

    async getAll() {
        const cars = await cruid.getAll(Car);

        return cars;
    }

    async getByid(id) {
        const car = await cruid.getByid(Car, id);

        return car;
    }

    async deleteById(id) {
        const isDeleted = await cruid.deleteById(Car, id);

        return isDeleted;
    }
}
exports.carRepository = new CarRepository();
