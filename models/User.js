const mongoose = require ("mongoose"); 

const schema = {
    name : {
        type : String 
    }, 
    last_name : {
        type : String 
    }, 
    email : {
        type : String
    },
    password : {
        type : String 
    }
}

const User = mongoose.model("User", schema)

module.exports = User ; 