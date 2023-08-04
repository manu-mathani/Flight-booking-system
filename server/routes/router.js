const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller')

const middleware = require('../services/middleware')

route
    //customer-side renders
    .get('/', services.homeRoute)  
    .get('/searchResults', services.results)
    
    //customer-side API
    .post('/api/passangers', controller.create)
    .get('/api/flights', controller.searchFlight)
    

    //admin render
    .get('/adminLogin', services.adminLogin)
    .get('/adminHomepage', middleware.isAuthenticated, services.adminHomepage)
    .get('/addFlight', services.addFlight)
    .get('/updateFlight', services.updateFlight)


    //Admin API
    .post('/admin/api/login', controller.authentication)
    .post('/admin/api/admin', controller.createAdmin)
    .post('/admin/api/flights', controller.createFlight)
    .get('/admin/api/flights', controller.find)
        //Not yet done
    .put('/admin/api/flights/:id', controller.updateFlightList)
    .delete('/admin/api/flights/:id', controller.delete) 

    
    
    

module.exports = route;