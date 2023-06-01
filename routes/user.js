const User= require("../models/User")
const bcrypt  = require('bcrypt')
const express = require('express');
const { response } = require("express");
const router = express.Router() ;
const jwt = require ("jsonwebtoken")

router.post("/register", async (request , response)=>{
    try{
        console.log("adding user")
        data = request.body ;
        var user = new User(data) ;
        salt = bcrypt.genSaltSync(5)
        password= await bcrypt.hashSync(data.password , salt)
        user.password= password
        var userInfo= await user.save() 
        var status  = {
            "message" : "user added successfully",
            "userInfo": userInfo
        } 
        response.status(200).send(status)
    }
    catch (error) {
        var status = {
            "message" : "error in adding the new user",
            "error": error
        }
        response.status(400).send(status)
    }
})

router.post("/login" , async (request , response )=>{
    data = request.body ; 
    var user = await User.findOne({email:data.email})
    if(!user){
        response.status(404).send("invalid email or password")
    }
    else {
        console.log("user",user)
        var password = bcrypt.compareSync(data.password , user.password)
        if(!password){
            response.status(401).send("invalid name or password")
        }
        else {
            var payload = {
                name : user.name , 
                email : user.email, 
                _id : user.id
            }
            token = jwt.sign(payload , "123")
            response.status(200).send({tokens:token})
        }
    }
})



router.get("/all", async (request , response)=>{
    try{
        console.log("finding users")
        var users= await User.find()
        response.send(users)

    }catch(error){
        var status = {
            "message" : "error fetching data from the data base",
            "error": error
        }
        response.send(status)
    }

})

router.get("/find/:id", async (request , response ) =>{
   try{
    var id = request.params.id ;
    console.log("finding user with id : ",id)
    var status = {
        message : "User found",
        UserInfo : await User.findOne({_id:id})
    }    
    response.send(status)
   }catch(error){
    var status = {
        "message" : "error finding user  from the data base",
        "error": error
    }
    response.send(status)
   }




})


router.get("/delete/:id" , async (request , response)=>{
    try {    
        var id = request.params.id ; 
        console.log("deleting user with id : ", id )
        var status ={
            messgae : "User deleted",
            userDeleted: await User.findByIdAndDelete({_id:id})
        }
        response.send(status)
    }catch (error){
        var status = {
            "message" : "error deleting  from the data base",
            "error": error
        }
        response.send(status)
    }
})

router.put("/update/:id", async (request , response)=>{
    try {
        var id = request.params.id ; 
        var data = request.body
        infoUser = await User.findByIdAndUpdate({_id:id}, data)
        response.send(infoUser)
    }catch(error){
        var status = {
            "message" : "error finding user  from the data base",
            "error": error
        }
        response.send(status)
    }
})



module.exports= router