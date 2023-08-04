const bcrypt = require('bcrypt');


var Flightdb = require("../model/flight");
var Passangerdb = require("../model/passanger");
var Admindb = require('../model/admin')


//retrieve and return flights upon search
exports.searchFlight = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Body cannot be empty" });
    } else {
        const currentDate = new Date();
        const requestedDate = new Date(req.body.date);

        if (requestedDate < currentDate) {
            res.status(400).send({ message: "The departure date has already passed" });
        } else {
            Flightdb.find({
                departureCity: req.query.from,
                destinationCity: req.query.to,
                departureDate: req.query.date,
            })
                .then((flights) => {
                    console.log(flights);
                    res.render('searchResults', { flights });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || "Error occurred while retrieving flight information"
                    });
                });
        }
    }
};



//create and save passanger on flight-passanger-db after payment
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({message: "Content cannot be empty"})
    }

    
    //create passanger
    const newPassanger = new Passangerdb({
        firstName: req.body.fname,
        lastName: req.body.lname,
        phoneNumber: req.body.phoneNo,
        email: req.body.email,
        emergencyNumber: req.body.emNo
    });
    
    //save passanger in flight-passanger-db
    newPassanger
        .save(newPassanger)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some erro occurred while creating a create operation"
            });
        });

}
exports.createFlight = (req, res) => {
    //check to validate
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });

    }   
    

    //create Flight
    const newFlight = new Flightdb({
        flightNumber: req.body.fNumber,
        departureDate: req.body.depDate,
        departureCity: req.body.depCity,
        departureTime: req.body.depTime,
        destinationCity: req.body.desCity,
        destinationTime: req.body.desTime,
        regularPrice: req.body.regPrice,
        economyPrice: req.body.econPrice,
        businessPrice: req.body.businessPrice,
    });

    //save Flight in flights database
    newFlight
        .save(newFlight)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred during create operation"
            })
        });
        
}

//retrieve and return all flights
exports.find = (req, res) => {
    if (req.query.id) {
        
        const id = req.query.id
    
        Flightdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(400).send({ message: "Not found user with id" + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving flight information" })
            });
    } else {
        Flightdb.find()
            .then(flight => {
                res.send(flight)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retrieving user information" })
            })
        
    }
    

}

exports.updateFlightList = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update cannot be empty" })
    }
    
    const id = req.params.id
    Flightdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
            res.status(400).send({message: `Cannot update user with ${id}. Maybe user not Found` })
            } else {
                res.send(data)
            }            
        })
        .catch(err => {
        res.status(500).send({message: "Error Update user information"})
    })
    

    
}

//create and save admin information in the database
exports.createAdmin = async (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "Content cannot be empty"})
    } else {
        try {
            //Hashing and ecrypting the password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            
            //Save admin in the database
            const admin = new Admindb({
                username: req.body.username,
                password: hashedPassword
            });

            admin
                .save(admin)
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some erro occurred while creating a create operation"
                    });
                });
            
        } catch (error) {
            res.status(500).send();
        }
    }
 
    
}
//Authenticate admin users
exports.authentication = async (req, res) => {
    try {
        const admin = await Admindb.findOne({ username: req.body.username });

        if (!admin) {
            return res.status(400).send("Cannot find user");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, admin.password);

        if (isPasswordMatch) {
            // If authentication is successful, redirect to the adminHomepage.
            req.session.adminId =admin._id;
            res.redirect('/adminHomepage')
        } else {
            res.send("Not allowed");
        }
    } catch (error) {
        // Handle errors in a more meaningful way.
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

//deleting flight
exports.delete = (req, res) => {

}
 
 exports.search= (async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "departureTime";

        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
        
        let sortBy = {};

        if (sort[1]) {
            sortBy[sort[0] = sort[1]];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const flights = await Flights.find({ departureCity: { $regex: search, $options: "i" } })
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit)
        
        const total = await Flights.countDocuments({
            departureCity: { $regex: search, $options: "i" }
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            flights
        }
        console.log(response);
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: true, message: "internal Server Error" });
    }
});

/**
 * const insertFlights = async () => {
    try {
        const docs = await Flights.insertMany(flights);
        return Promise.resolve(docs)
    } catch (err) {
        return Promise.reject(err);
        
    }
}

insertFlights()
    .then((docs) => console.log(docs))
    .catch(err => console.log(err))

 * 
 */


