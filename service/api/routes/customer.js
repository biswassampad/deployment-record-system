const express = require('express');
const router = express.Router();

const Customers = require('../models/customer');


router.post('/addcustomer',async(req,res,next)=>{
    var name = req.body.name;
    let name_lc = name.toLowerCase(name);
    

    let customer =await Customers.find({name:name_lc});
    console.log(customer.length)
    if(customer.length!=0){
        res.status(402).json({
            message:"This client is already present in system"
        });
    }else{
        const customer = new Customers({
            name:req.body.name,
            address:req.body.address,
            products:req.body.products,
        });

        customer.save()
        .then(result=>{
            res.header(200).json({message:"Customer added successfully"});
        }).catch(error=>{
            res.header(500).json({message:"There is some error occured"});
        })
    }
});

router.post('/getcustomer',async(req,res,next)=>{
    var id = req.body.id;
    try{
        var query = Customers.findById(id);
        if(query.length > 0){
            res.status(200).json({message:"Client Found",client:query});
        }
    }catch{
        res.status(200).json({message:"There is some error in getting data !!"})
    }
    
});

// get products by customer 

router.post('/getProducts',async(req,res,next)=>{
    var id = req.body.id;
    try{
        var query = Customers.findById(id);
        products = query[0].products;
        var prod_array = products.split(',');
        var product_list= [];
        for (i in prod_array){
            product_list.push(i)
        }
        res.status(200).json({message:"categories recieved",products:product_list});
    }catch{

    }
});

module.exports = router;