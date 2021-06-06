const express=require('express')
const cors=require('cors')
const app=express()
const mongoose=require('mongoose')
const PORT=process.env.PORT||5000
const {MONGOURI}=require('./config/keys')

mongoose.connect(MONGOURI,{ useNewUrlParser: true,useUnifiedTopology: true})
mongoose.connection.on('connected',()=>{
    console.log("connected")
})
mongoose.connection.on('error',()=>{
    console.log("error")
})
require('./models/User')
require('./models/verification')
require('./models/donor')
require('./models/request')
app.use(cors())
app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/donor'))
app.use(require('./routes/request'))
if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(PORT,()=>{
    console.log("server is running")
})