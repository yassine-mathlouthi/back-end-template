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


app.get("/all", async (request , response)=>{
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







app.listen(3000,()=>{
    console.log("server on")
}
);
