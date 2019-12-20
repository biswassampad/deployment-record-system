const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const jwtKey = 'Aj>-Hddo2.fp,!d~oa,|Y,@Rw9kH+oQEfnDJ-H?L`u$K[I{YZ&P6neuGG=fq)~)';
const jwtexpirehours = '12h';

//internal calls 
const Users = require('../models/users');
const privateKey = fs.readFileSync('private.key')


// insert a user
router.post('/addUser',(req,res,next)=>{
    // hashing the password
   try{
    var email = req.body.email;
    var password = req.body.password;
    var hash = bcrypt.hashSync(password);
    var user = Users.findOne({email:email});
    if(user.length>0){
        res.send('User is already present');
    }else{
        const data = new Users({
            name :req.body.name,
            email:req.body.email,
            employee_id:req.body.employee_id,
            role:req.body.role,
            password:hash
            });
        data.save()
        .then(result=>{
            res.status(200).json({message:'User Created',createdUser:result});
        }).catch(error=>{
            res.status(500).json({error:error});
        });
    }
   }catch{
       res.status(500).json({message:"Internal Server Error"});
   }
  
});

// login user 

router.post('/login',async(req,res,next)=>{
    try{
        var email = req.body.email;
        var password = req.body.password;
        var query = await Users.find({email:email});
        if(query.length>0){
            var userData={
                _id:query[0]._id,
                name:query[0].name,
                email:query[0].email,
                employee_id:query[0].employee_id,
                role:query[0].role,                
            }
            var returned_password = query[0].password;
            bcrypt.compare(password,returned_password,function(error,isAuth){
               if(error){
                    
                   res.status(200).json({Auth:"UnAuthorized"});
               }
               if(isAuth){
                const token = jwt.sign({ email }, jwtKey, {
                    algorithm: 'HS256',
                    expiresIn: jwtexpirehours
                  });
                  
                  console.log('token:', token);            
                   res.status(200).json({Auth:"Authorised",token:token,user:userData});
               }
            });
        }
    }catch{
        res.status(500).json({message:"Internal Server error"});
    }
});

module.exports = router;