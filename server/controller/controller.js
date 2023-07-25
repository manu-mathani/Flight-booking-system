const routerr = require("express").Router();
const flights = require("../database/movies.json");

const Flights = require("../model/model");

routerr.get("/flights", async (req, res) => {
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


module.exports = routerr;