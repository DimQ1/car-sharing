const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductionInfoSchema = new Schema({
    brand: String,
    model: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const DriverSchema = new Schema({
    licenseNumber: {
        type: Number,
        required: [true, 'License number required']
    },
    firstName: {
        type: String,
        required: [true, 'First name required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name required']
    },
    card: {
        number: {
            type: Number,
            required: [true, 'User card number required']
        },
        owner: String,
        validThrogh: {
            type: Date,
            require: [true, 'Card issue date required']
        }
    }
});

const CurrentRunSchema = new Schema({
    startDate: Date,
    startFuelLevel: Number,
    startMilage: Number,
    driver: DriverSchema
});

const HistoryRunSchema = new Schema();
HistoryRunSchema.add(CurrentRunSchema)
    .add({
        finishFuelLevel: Number,
        finishMilage: Number
    });

const pointShema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates:
    {
        type: [Number],
        require: true
    }
});


const carSchema = new Schema({
    id: Number,
    VIN: {
        type: Number,
        required: [true, 'Vehicle identification number required']
    },
    registrationNumber: Number,
    productionInfo: ProductionInfoSchema,
    status: String,
    tankLevel: Number,
    fuelLevel: Number,
    mileage: Number,
    curentRun: CurrentRunSchema,
    location: {
        type: pointShema
    },
    bookingsHistory: [HistoryRunSchema]
});

module.exports = mongoose.model('Car', carSchema);
