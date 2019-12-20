const fs = require('fs');
const jwt = require('jsonwebtoken');
const private_key = fs.readFileSync('./keys/private.key','utf-8');
const public_key = fs.readFileSync('./keys/public.key','utf-8');



module.exports={
    sign:async (payload,$options,user)=>{
        $Options = {
            issuer: "Acesocloud Inc.",
            subject: "bdrs service auth", 
            audience: user 
           }
    }
}