const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    isVerified:
     { type: Boolean,
         default: false },
    password:{
        type:String,
        required:true
    },
    resetToken :String,
    expireToken:Date
})
mongoose.model("User",userSchema)