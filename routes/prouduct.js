
const Product = require('../models/Product') 

const express = require('express')
const router = express.Router() ;
const multer= require('multer')
var filename =""
/* var config= {
    destination :"./uploads/productData",
    fileName : (req , file , redirect)=>{
        let date=Date.now()
        console.log(date)
        let fn= date +"."+file.mimetype.split('/')[1] ;
        filename=fn
        redirect(null , fn)
        
    }
} */


const Productstorage = multer.diskStorage({
    destination :"./uploads/productData",
    filename : (req , file , redirect)=>{
        let date=Date.now()
        console.log(date)
        let fn= date +"."+file.mimetype.split('/')[1] ;
        filename=fn
        redirect(null , fn)
        
    }
})


const upload = multer({storage:Productstorage})


router.post("/add", upload.any('files') , async (request , response)=>{
    try{
        console.log("adding Product")
        data = request.body ;
        var product = new Product(data) ;
        product.image=filename ; 
        
        var productInfo= await product.save() 
        var status  = {
            "message" : "Product added successfully",
            "productInfo": productInfo
        } 
        filename =""
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