const mongoose = require("mongoose") ;
mongoose.connect("mongodb://127.0.0.1:27017/eshop")
    .then(()=>
    {
        console.log("connected to DATA BASE")
    })
    .catch((error)=>
    {
        console.log("error connecting to data base",error)
    })
module.exports=mongoose ;