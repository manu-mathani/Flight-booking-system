const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require("cors");
const bodyparser = require("body-parser");
const path = require('path');


const connectDB = require('./server/database/connection')
const flightsRoutes = require("./server/controller/controller");

const app = express();

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));
app.use(cors());
app.use("/api", flightsRoutes);

//mongo db connection
connectDB()

//parse requests to body-parser
app.use(bodyparser.urlencoded({ extennded: true }));

//set view engine
app.set("view engine", "ejs");

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

//load routes
app.use('/', require('./server/routes/router'))
app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });



