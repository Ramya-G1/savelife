const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types;
const donorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
         type:Number,
         required:true
    },
    country:{
         type:String,
         required:true
    },
    state:{
        type:String
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
mongoose.model("Donor",donorSchema);
