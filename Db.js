const mongoose=require("mongoose")
const Schema = mongoose.Schema;

const userschema= new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,  
        unique:true   
    },
    firstname: {
        type: String,
        required: true,
        
    },
    lastname: {
        type: String,
        required: true,
    },  
},{ timestamps: true })
module.exports=mongoose.model("login", userschema);




