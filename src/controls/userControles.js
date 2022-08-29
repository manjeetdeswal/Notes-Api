const userModel = require("../models/user");

const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken");
const { json } = require("express");
const SECREST_KEY = process.env.SECREST_KEY;

const signin = async (req,res) =>{

    const {email , password} = req.body;

    try {
        const existingUser = await userModel.findOne({email :email})

        if(!existingUser){
           return res.status(400).json("User not found")
        }

        const matchPassword = await bcrypt.compare(password,existingUser.password);
        if(!matchPassword){
            return res.status(400).json("Password does't match")
        }
        const token = jwt.sign({email :existingUser.email ,id :existingUser._id}, SECREST_KEY);
        res.status(201).json({user :existingUser , token :token})



    } catch (error) {
        console.error(error)
        res.status(500),json("Something went wrong");
    }

}

const signup = async(req,res) =>{

    const{username,email,password} =req.body;
    try {
        const existingUser = await userModel.findOne({email :email})

         if(existingUser){
            return res.status(400).json("User Exist")
         }

        const hasPassword = await bcrypt.hash(password ,10);

        const result = await userModel.create({
            email :email,
            password :hasPassword,
            username : username
        });

        const token = jwt.sign({email :res.email ,id :result._id}, SECREST_KEY);
        res.status(200).json({user :result , token :token})



    } catch (error) {
        console.error(error)
        res.status(500),json("Something went wrong");

    }
}

module.exports = {signin ,signup};