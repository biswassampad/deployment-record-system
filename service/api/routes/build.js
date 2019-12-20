const express = require('express');
const router = express.Router();


const Build = require('../models/build');

// adding a product build to database 
router.post('/create',(req,res,next)=>{
    try{
        var name = req.body.name;
        var version = req.body.version;
        var query = Build.find({name:name,version:version});
        if(query.length != 0){
            res.status(406).json({message:"Product build is already"})
        }else{
            var build = new Build({
                name :name,
                version:version,
                date:req.body.date,
            });
            build.save()
            .then(result=>{
                res.status(200).json({message:'Build added successfully',product:result});
            }).catch(error=>{
                res.status(500).json({error:error});
            });
        }
    }catch{
        res.status(500).json({message:"Internal Server Error"});   
    }
});

// build with versions
router.post('/getBuild',(req,res,next)=>{
    try{
        var query = Build.find({})
        if(query.length > 0){
            res.status(200).json({message:'Builds received',builds:query})
        }
    }catch{
        res.status(500).json({message:"Internal Server Error"});       
    }
});
// get build 
// versions by build 
router.post('/getVersions',(req,res,next)=>{
    try{
        var id = req.body.name;
        var query = Build.find({name:name});
        var versions = [];
        if(query.length >1){
            for(i in query){
                versions.push(i.version);
            }
            res.status(200).json({message:"the below versions found",versions:versions});
        }else{
            res.status(404).json({message:"Not found anything by this reference"});
        }
    }catch{
        res.status(500).json({message:"Internal Server Error"});
    }
});

module.exports = router;