/* 
author  : Yassine Mathlouhi . 

nodejs mongodb data base contains two models, user and product with full crud . 

features include being able to login, 
verify,  
create an account, as well as being able to upload files and photos for products to the server's uploads folder. 


*/ 




const { response } = require('express');
const express = require('express') ;
const app = express() ; 
const productRouter = require('./routes/prouduct')
const userRouter =require ('./routes/user')
const cors = require('cors');
app.use(cors());
require("./config/connect")



app.use(express.json())
app.use('/product', productRouter)
app.use("/user",userRouter)
app.use('/getimage',express.static('./uploads/productData'))

app.listen(3000,()=>{
    console.log("server on | port : 3000 | powred by : Yassine Mathlouthi ")
}
);
