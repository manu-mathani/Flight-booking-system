const axios  = require("axios")
const { render } = require("ejs")
const { searchFlight } = require("../controller/controller")


exports.homeRoute = (req, res) => {
   res.render("homePage")
}

exports.results = (req, res) => {
    res.render('searchResults');
}

exports.adminLogin = (req, res) => {
    res.render("adminLogin")
}

exports.adminHomepage = (req, res) => {
    //make a get request to /api/flights
    axios
        .get('http://localhost:3000/admin/api/flights')
        .then(function (response) {
            res.render('adminHomepage', { flights: response.data })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.addFlight = (req, res) => {
    res.render("addFlight")
}


exports.updateFlight = (req, res) => {
    axios.get('http://localhost:3000/admin/api/flights', { params: { id: req.query.id } })
        .then(function (flightdata) {
            res.render("updateFlight", { flight: flightdata.data })
        })
        .catch(err => {
        res.send(err)
    })
    
}


