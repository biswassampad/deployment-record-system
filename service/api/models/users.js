const mongoose = require('mongoose');
const timestamps =require('mongoose-timestamp');

// defining the database schema for mongodb 
const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    employe_id:{
        type:String,
        reuired:true,
    },
    role:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }

});
ProductSchema.plugin(timestamps);

const Product = mongoose.model('User',ProductSchema);
module.exports = Product;
