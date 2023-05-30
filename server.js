const express = require('express') ;
const app = express() ; 

require("./config/connect")


app.post("/add",()=>{
    console.log("add")
})











app.listen(3000,()=>{
    console.log("server on")
}
);
