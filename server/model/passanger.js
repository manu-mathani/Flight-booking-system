const mongoose = require('mongoose');


 
var passangerSchema = new mongoose.Schema({
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


const Passangerdb = mongoose.model("passangerdb", passangerSchema);

module.exports = Passangerdb;