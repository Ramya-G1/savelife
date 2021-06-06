const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Donor=mongoose.model("Donor")
const requirelogin=require('../middleware/requirelogin')
router.post('/createdonor',requirelogin,(req,res)=>{
    const {name,area,bloodgroup,phonenumber,age}=req.body
    if(!name || !area || !bloodgroup || !phonenumber || !age)
    {
       return  res.status(422).json({err:"please fill all the details"})
    }
    req.user.password=undefined
    const donor=new Donor({
        name,
        area,
        bloodgroup,
        phonenumber,
        postedBy:req.user
    })
    donor.save().then(result=>{
        res.json({donor:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports=router