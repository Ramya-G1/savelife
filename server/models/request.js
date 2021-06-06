const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types;
const requestSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    country:{
         type:String,
         required:true
    },
    state:{
        type:String
    },
    hospital:{
        type:String,
        required:true
    },
    city:{
        type:String
    },
    bloodgroup:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
})
mongoose.model("Request",requestSchema);