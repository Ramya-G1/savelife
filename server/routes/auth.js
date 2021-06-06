const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("User")
const Donor=mongoose.model("Donor")
const Token=mongoose.model("Token")
const Request =mongoose.model("Request")
const jwt=require('jsonwebtoken')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {JWT_SECRET,accountid,serviceid,authtoken}=require('../config/keys')
const requirelogin=require('../middleware/requirelogin')
const {SENDGRID_API}=require('../config/keys')
const sendgridTransport=require('nodemailer-sendgrid-transport');
const transport=nodemailer.createTransport(sendgridTransport({
      auth:{
          api_key:SENDGRID_API
      }
}))
const client = require('twilio')(accountid,authtoken)

const bcrypt=require('bcryptjs');
router.post('/phonecode',requirelogin,(req,res)=>{
    if (req.body.phonenumber) {
        client
        .verify
        .services(serviceid)
        .verifications
        .create({
            to: `+${req.body.phonenumber}`,
            channel: 'sms' 
        })
        .then(data => {
            const {to,status}=data;
            res.status(200).send({
               donor:{to,status}
            })
        }).catch(err=>{
            return res.send({msg:err})
        })
     } else {
        res.json({
            message: "Enter phone number"
        })
     }
})
router.post('/verifyphonecode', requirelogin,(req, res) => {
    if (req.body.phonenumber) {
        client
            .verify
            .services(serviceid)
            .verificationChecks
            .create({
                to: `+${req.body.phonenumber}`,
                code: req.body.code
            })
            .then(data => {
                if (data.status === "approved") {
                    const {to,status}=data;
                    res.status(200).json({
                      donor:{to,status}
                    })
                }
                else
                 {
                    res.json({
                        message: "Wrong phone number or code :(",
                    }) 
                 }
            })
    } else {
        res.status(400).send({
            message: "Wrong phone number or code :(",
            phonenumber: req.body.phonenumber
        })
    }
   
})
router.get('/confirmation/:email/:token',(req,res)=>{
    Token.findOne({ token: req.params.token }, function (err, token) {
        if (!token){
            return res.status(400).send('Your verification link may have expired. Please click on resend for verify your Email.Resend link:');
        }
        else{
            User.findOne({ _id: token._userId, email: req.params.email }, function (err, user) {
                if (!user){
                    return res.status(401).send('We were unable to find a user for this verification. Please SignUp!');
                } 
                else if (user.isVerified){
                    return res.status(200).send('User has been already verified. Please Login');
                }
                else{
                    user.isVerified = true;
                    user.save(function (err) { 
                        if(err){
                            return res.status(500).send({msg: err.message});
                        }
                        else{
                          return res.status(200).send('Your account has been successfully verified')
                        }
                    })
                }
            })
        }
        
    })
})
router.post('/resend',(req,res)=>{
    User.findOne({ email: req.body.email }).then((user)=> {
        if (!user){
            return res.json({msg:'We were unable to find a user with that email. Make sure your Email is correct!'})
        }
        else if (user.isVerified){
            return res.json({msg:'This account has been already verified. Please log in.'})
    
        } 
        else{
            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') })
            token.save(function (err) {
                if (err) {
                  return res.status(500).send({err:err.message});
                }
                    var mailOptions = { from: 'noreplybuddy1@gmail.com', to: user.email, subject: 'Account Verification Link', text: 'Hello '+ user.name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n' };
                    transport.sendMail(mailOptions, function (err) {
                       if (err) { 
                        return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
                     }
                    return res.status(200).json({smsg:'A verification email has been sent to ' + user.email + ''})
                })
            })
        }
    }).catch(err=>{
        console.log(err)
    })
})
router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body
    if(!name || !email|| !password)
    {
        return res.status(422).json({message:'Fill all the fields'})
    }
    User.findOne({email:email}).then((saveduser)=>{
    if(saveduser)
    {
       return res.status(422).json({message:'Already email exists'})
    }
    bcrypt.hash(password,12).then(hashedpassword=>{
        const user=new User({
            email:email,
            name:name,
            password:hashedpassword
        })
        user.save(function (err) {
            if (err) { 
                return res.status(500).json({msg: err.message })
            }
        const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') })
        token.save(function (err) {
            if (err) { return res.json({ msg: err.message }) }
            var mailOptions = { from: 'noreplybuddy1@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n' };
            transport.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message })}
                return res.status(200).json({smessage:'A verification email has been sent to ' + user.email + '.',user:{email}})
            })
        })
    })
        })
    }).catch(err=>{
        console.log(err)
    })
})
router.post('/signin',(req,res)=>{
    const {name,password,email}=req.body
    if(!email|| !password)
    {
       return res.status(422).json({msg:"fill all the fileds"})
    }
    User.findOne({email:email}).then((usedsaver)=>{
        if(!usedsaver)
        return res.status(422).json({msg:"Please signup"})
        bcrypt.compare(password,usedsaver.password).then((domatch)=>{
            var token=""
            if(domatch)
            {
                token=jwt.sign({_id:usedsaver._id},JWT_SECRET)
            }
            else
            return res.status(422).json({msg:"Incorrect Email or password"})
            if (!usedsaver.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' })
            const {_id,name,email}=usedsaver;
            return res.json({token,user:{_id,name,email}});
        })
    }).catch(err=>{
        console.log(err)
    })
})
router.post('/createdonor',requirelogin,(req,res)=>{
    var {name,phonenumber,country,state,city,age,bloodgroup,status,verifiednumber}=req.body;
    if(phonenumber!==verifiednumber)
    return res.json({msg:"Please enter the verified phone number"})
    if(status==false)
    return res.json({msg:"please verify your phonenumber"})
    if(!name || !phonenumber || !country || !age ||!bloodgroup)
    return res.json({msg:"fill the fields"});
    if(age<18)
    return res.json({msg:"You cannot donate"})
    name=name.toUpperCase();
    const donor=new Donor({
         name,
         phonenumber,
         country,
         state,
         city,
         age,
         bloodgroup,
         postedBy:req.user
    })
    donor.save().then(result=>{
        res.json({donor:result})
    }).catch(error=>{
        console.log(error)
    })
})
router.get('/alldonors',requirelogin,(req,res)=>{
    Donor.find()
    .populate("postedBy","_id name")
    .sort('-createdAt')
        .then(posts=>{
        return res.json({posts})
    })
    .catch(error=>{
        console.log(error);
    })
})
router.get('/allrequests',requirelogin,(req,res)=>{
    Request.find()
    .populate("postedBy","_id name")
    .sort('-createdAt')
        .then(posts=>{
        return res.json({posts})
    })
    .catch(error=>{
        console.log(error);
    })
})
router.get('/mydonation',requirelogin,(req,res)=>{
    Donor.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(posts=>{
        return res.json({posts})
    })
    .catch(error=>{
    console.log(error)
});
})
router.get('/myrequest',requirelogin,(req,res)=>{
    Request.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(posts=>{
        return res.json({posts})
    })
    .catch(error=>{
    console.log(error)
});
})
router.post('/searchusers',requirelogin,(req,res)=>{
    Donor.find({bloodgroup:req.body.query})
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })

})
router.post('/searchrequests',requirelogin,(req,res)=>{
    Request.find({bloodgroup:req.body.query})
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })

})
router.delete('/deletepost/:postId',requirelogin,(req,res)=>{

    Donor.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})
router.delete('/deleterequest/:postId',requirelogin,(req,res)=>{

    Request.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})
router.post('/reset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transport.sendMail({
                    to:user.email,
                    from:"noreplybuddy1@gmail.com",
                    subject:"password reset of SAVE LIFE APP",
                    html:
                    `<h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message:"check your email"})
            })

        })
    })
})
router.post('/newpassword',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
})
module.exports=router