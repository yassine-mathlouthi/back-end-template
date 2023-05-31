
const Product = require('../models/Product') 

const express = require('express')

const router = express.Router() ;

router.post("/add", async (request , response)=>{
    try{
        console.log("adding Product")
        data = request.body ;
        var product = new Product(data) ;
        var productInfo= await product.save() 
        var status  = {
            "message" : "Product added successfully",
            "productInfo": productInfo
        } 
        response.status(200).send(status)
    }
    catch (error) {
        var status = {
            "message" : "error in adding the new Product",
            "error": error
        }
        response.send(status)
    }
})


router.get("/all", async (request , response)=>{
    try{
        console.log("finding Products")
        var products= await Product.find()
        response.send(products)

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
    console.log("finding product with id : ",id)
    var status = {
        message : "product found",
        productInfo : await Product.findOne({_id:id})
    }    
    response.send(status)
   }catch(error){
    var status = {
        "message" : "error finding product  from the data base",
        "error": error
    }
    response.send(status)
   }




})


router.get("/delete/:id" , async (request , response)=>{
    try {    
        var id = request.params.id ; 
        console.log("deleting product with id : ", id )
        var status ={
            messgae : "product deleted",
            productDeleted: await Product.findByIdAndDelete({_id:id})
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
        infoproduct = await Product.findByIdAndUpdate({_id:id}, data)
        response.send(infoproduct)
    }catch(error){
        var status = {
            "message" : "error finding product  from the data base",
            "error": error
        }
        response.send(status)
    }
})


module.exports = router ;