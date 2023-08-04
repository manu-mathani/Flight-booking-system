const mongoose = require('mongoose');

//flight schema
var flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true
    },
    departureDate: {
        type: String,
        required: true
    },
    departureCity: {
        type: String,
        required: true
    }, 
    departureTime: {
        type: String,
        required: true
    },
    destinationCity: {
        type: String,
        required: true        
    },
    destinationTime: {
        type: String,
        required: true        
    },
    regularPrice: {
        type: String,
        required: true        
    },
    economyPrice: {
        type: String,
        required: true        
    },
    businessPrice: {
        type: String,
        required: true        
    }

    
})



const Flightdb = mongoose.model("flightsdb", flightSchema);

module.exports = Flightdb;