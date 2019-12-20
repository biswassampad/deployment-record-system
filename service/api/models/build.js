const mongoose = require('mongoose');
const timestamps =require('mongoose-timestamp');

// defining the database schema for mongodb 
const BuildSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    version:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true
    }
   
});
BuildSchema.plugin(timestamps);

const Build = mongoose.model('Build',BuildSchema);
module.exports = Build;
