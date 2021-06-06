const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Request=mongoose.model("Request")
const requirelogin=require('../middleware/requirelogin')
router.post('/createrequest',requirelogin,(req,res)=>{
    var {name,phonenumber,hospital,country,state,city,bloodgroup,status,verifiednumber}=req.body;
    if(phonenumber!==verifiednumber)
    return res.json({msg:"Please enter the verified phone number"})
    if(status==false)
    return res.json({msg:"please verify your phonenumber"})
    if(!name || !phonenumber || !country || !hospital ||!bloodgroup)
    return res.json({msg:"fill the fields"});
    name=name.toUpperCase();
    const request=new Request({
         name,
         phonenumber,
         country,
         state,
         city,
         hospital,
         bloodgroup,
         postedBy:req.user
    })
    request.save().then(result=>{
        res.json({donor:result})
    }).catch(error=>{
        console.log(error)
    })
})
module.exports=router