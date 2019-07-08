const BaseRepository = require('./baseRepository');
const Car = require('./models/car');

class CarRepository extends BaseRepository {
    constructor() {
        super(Car);
    }

    findFuelLevelLess(level) {
        const agregateQuery = {
            query:
                [
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
                ]
        };

        return this.findByAgregateQuery(agregateQuery);
    }
}
module.exports = new CarRepository();
