const express = require('express') ;
const app = express() ; 

const User= require("./models/User")

require("./config/connect")
app.use(express.json())

app.post("/signIn",(request , response)=>{
    console.log("adding user")
    data = request.body ;
    user = new User(data) ;
    user.save().then(
        (userInfo)=>{
            response.send(userInfo)
        }
    ).catch(
        (error)=>{
            response.send(error)
        }
    )
})




app.listen(3000,()=>{
    console.log("server on")
}
);
