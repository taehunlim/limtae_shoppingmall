const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const dotEnv = require('dotenv');
dotEnv.config();



const app = express();



// database
require('./config/database');




// middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));

if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin : process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
}

//err handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
})

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})