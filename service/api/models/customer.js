const mongoose = require('mongoose');
const timestamps =require('mongoose-timestamp');

// defining the database schema for mongodb 
const CustomerSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
   address:{
       type:String,
       required:true
   },
   products:{
       type:String,
       required:true,
   }
});
CustomerSchema.plugin(timestamps);

const Customer = mongoose.model('Customer',CustomerSchema);
module.exports = Customer;
