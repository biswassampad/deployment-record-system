const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');


// route files include here
const UserRoutes = require('./api/routes/users');
const CustomerRoutes = require('./api/routes/customer');

// mongoose connection string
mongoose.connect('mongodb://127.0.0.1:27017/bdrs',{useNewUrlParser:true,useUnifiedTopology: true});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cors policies 
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    if(req.method == 'OPTIONS'){
        res.header(
            'Access-Control-Allow-Methods',
            'GET,POST,PATCH,DELETE,PUT'
        );
        return res.status(200).json({})
    }
    next();
});

//Routes for operations
app.use('/user',UserRoutes);
app.use('/customer',CustomerRoutes);



// error handling
app.use((res,req,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports = app;