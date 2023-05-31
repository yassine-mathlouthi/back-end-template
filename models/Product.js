const mongoose = require('mongoose') ;

const schema = {
    title :{
        type : String 
    }, 
    price :{
        type : String 
    }, 
    description: {
        type : String
    },
    image : {
        type : String 
    }

}

const Product = mongoose.model("Product", schema)
module.exports=Product ;