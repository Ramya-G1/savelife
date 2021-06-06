import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'; 
import '../App.css'
toast.configure()
const Signup=()=>{
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const history=useHistory();
    const paperStyle={padding :40,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'17px 0'}
    const textstyle={margin:'10px 0px'}
    const bodystyle={paddingtop:'45px'}
    const Postdata=()=>{
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                password:password,
                email:email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.message)
            toast(data.message,{autoClose:false}) 
            if(data.smessage)
               {
                toast(data.smessage,{autoClose:false}) 
                history.push('/login')
               }
          })
        }
    return(
        <Grid style={bodystyle}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2 style={{color:"red"}}>Sign Up</h2>
                </Grid >
                <TextField style={textstyle}
                 label='Username' 
                 placeholder='Enter username' 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                fullWidth required/>
                <TextField style={textstyle} 
                label='Email' 
                placeholder='Enter email' 
                 value={email}
                onChange={(e)=>setEmail(e.target.value)}
                 fullWidth required/>
                <TextField style={textstyle}
                 label='Password'
                  placeholder='Enter password' 
                  type='password'
                  value={password}
                onChange={(e)=>setPassword(e.target.value)} fullWidth required/>
                <Button type='submit' color='secondary' variant="contained" style={btnstyle}
                onClick={()=>Postdata()}
                fullWidth>Sign Up</Button>
                 <Typography style={textstyle}>
                     <Link href="/login" >
                        Already have an account ? Sign In 
                </Link>
                </Typography> 
            </Paper>
        </Grid>
    )
}

export default Signup