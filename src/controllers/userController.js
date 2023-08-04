const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const SECRET_KEY = 'NOTHING'

const signup = async (req,res)=>{
    const {name, username, password} = req.body;
    console.log(req.body);
    try {
        // Existing user
        const existinguser = await userModel.findOne({username: username});
        if (existinguser){
            return res.status(400).json({message:'User already exists.'});
        }

        // hashed password
        const hashedpassword = await bcrypt.hash(password,11);

        // user creation
        const result = userModel.create({
            name: name,
            username: username,
            password: hashedpassword,
        });

        // token generation
        const token = jwt.sign({name:result.name,username:result.username,id:result._id},SECRET_KEY);
        return res.status(201).json({user:result,token:token});


        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Something not good.'});
    }


};

const signin = async (req,res)=>{
    try {
        
        const {username,password} = req.body;
        // check username
        const existinguser = await userModel.findOne({username:username}); 
        if (!existinguser){
            return res.status(401).json({message:'username not found.'});
        }
        const match = await bcrypt.compare(password,existinguser.password);

        if (!match){
            return res.status(401).json({message:'password incorrect.'});
        }
        
        const token = jwt.sign({name:existinguser.name,username:existinguser.username,id:existinguser._id},SECRET_KEY)
        return res.status(201).json({user:existinguser,token:token});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Something not good.'});
    }
};

module.exports = {signin,signup};
