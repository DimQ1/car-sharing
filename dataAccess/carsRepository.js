const BaseRepository = require('./baseRepository');
const Car = require('./models/car');

class CarRepository extends BaseRepository {
    constructor() {
        super(Car);
    }

    async findFuelLevelLess(level, limit, offset) {
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

        const cars = await this.findByAgregateQuery(agregateQuery, limit, offset);

        return cars;
    }
}
module.exports = new CarRepository();
