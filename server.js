const { response } = require('express');
const express = require('express') ;
const app = express() ; 
const productRouter = require('./routes/prouduct')
const userRouter =require ('./routes/user')
require("./config/connect")




app.use(express.json())
app.use('/product', productRouter)
app.use("/user",userRouter)


app.listen(3000,()=>{
    console.log("server on")
}
);
