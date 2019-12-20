const express = require('express');
const router = express.Router();

const Upload = require('../models/upload');

router.post('/create',async(req,res,next)=>{
    try{
        var customerid = req.body.customerid;
        var version = req.body.version;
        var productid = req.body.productid;

        var query = await Upload.find({customerid:customerid,version:version,productid:productid});
        if(query.length!=0){
            var upload = new Upload({
                customer_id:customerid,
                customer_name:req.body.name,
                product_id:productid,
                product_name:req.body.product_name,
                version:version,
            })
        }
    }catch{
        res.status(500).json({message:"Internal Server Error"});
    }
});

router.post('/getByCustomer',async(req,res,next)=>{
    try{
        var customerId = req.body.customer_id;
        var query  = await Upload.find({customer_id:customerId})
        if(query!=0){
            res.status(200).json({message:"This deployments has been found for the client",deployment:query});
        }else{
            res.status(404).json({message:"No data found by the reference"});
        }
    }catch{
        res.status(500).json({message:"Internal server error"});
    }
});
// get build by product for a perticular customers
