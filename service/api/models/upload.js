const mongoose = require('mongoose');
const timestamps =require('mongoose-timestamp');

// defining the database schema for mongodb 
const UploadSchema = mongoose.Schema({
   customer_id:{
       type:Schema.objectId,
       required:true,
   },
   customer_name:{
       type:String,
       required:true,
   },
   product_id:{
       type:Schema.objectId,
       required:true
   },
   product_name:{
       type:String,
       required:true
   },
   product_version:{
       type:String,
       required:true
   },
   push_date:{
       type:Date,
       required:true
   }
});
UploadSchema.plugin(timestamps);

const Upload = mongoose.model('Upload',UploadSchema);
module.exports = Product;
