const BaseRepository = require('./baseRepository');
const Car = require('./models/car');

class CarRepository extends BaseRepository {
    constructor() {
        super(Car);
    }

    async findFuelLevelLess(level, limit, skip) {
        const agregateQuery = [
            {
                addFields: {
                    currentFuelLevel: {
                        $divide: ['$fuelLevel', '$tankLevel']
                    }
                }
            },
            {
                match: {
                    currentFuelLevel: { $lt: +level }
                }
            }
        ];

        const cars = await this.findByAgregateQuery(agregateQuery, limit, skip);

        return cars;
    }
}
module.exports = new CarRepository();
