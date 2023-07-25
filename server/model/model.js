const mongoose = require('mongoose');

var schema = new mongoose.Schema({
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


/**
 * 
var schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    emergencyNumber: {
        type: String,
        required: true        
    }
    
})
 */

const Passangerdb = mongoose.model("passangerdb", schema);

module.exports = Passangerdb;