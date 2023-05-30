const express = require('express') ;
const app = express() ; 

const User= require("./models/User")

require("./config/connect")
app.use(express.json())

app.post("/signIn", async (request , response)=>{
    try{
        console.log("adding user")
        data = request.body ;
        var user = new User(data) ;
        var userInfo= await user.save() 
        var status  = {
            "message" : "user added successfully",
            "userInfo": userInfo
        } 
        response.send(status)
    }
    catch (error) {
        var status = {
            "message" : "error in adding the new user",
            "error": error
        }
        response.send(status)
    }

})

app.listen(3000,()=>{
    console.log("server on")
}
);
