const express = require('express');
const session = require("express-session");
const dotenv = require('dotenv');
const crypto = require('crypto');
const morgan = require('morgan');
const cors = require("cors");
const bodyparser = require("body-parser");
const path = require('path');


const connectDB = require('./server/database/connection')


const app = express();

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));
app.use(cors());

// Generate a secure secret key
const generateSecretKey = () => {
    const length = 32; // You can choose a different length based on your needs
    return crypto.randomBytes(length).toString('hex');
};
  
const secretKey = generateSecretKey();
app.use(
    session({
      secret: secretKey, // Replace with a secure secret key for session encryption
      resave: false,
      saveUninitialized: true
    })
  );


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



