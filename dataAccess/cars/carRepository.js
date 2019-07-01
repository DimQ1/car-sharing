const BaseRepository = require('../baseRepository');
const Car = require('../models/car');

class CarRepository extends BaseRepository {
    constructor() {
        super(Car);
    }
}
exports.carRepository = new CarRepository();
