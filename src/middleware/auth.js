const jwt = require('jsonwebtoken');
const express = require('express');

const SECRET_KEY = 'NOTHING'

const auth = (req,res,next)=>{
    try {
        let token = req.headers.authorization;
        // console.log(token)
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token,SECRET_KEY);
            req.userId = user.id;
            // req.username = user.username;
            next();
        }
        else{
            res.status(401).json({message:'Unauthorized Login!'});
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({message:'Invalid Login'});

    }
      
   
};

module.exports = auth;