const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const tSchema = new mongoose.Schema({
    _userId: 
    { type:ObjectId,  required: true,  ref: 'User' },
    token:  { type: String, required: true },
    expireAt: { type: Date, default: Date.now, index: { expires:86400000 } }
})
mongoose.model("Token",tSchema)