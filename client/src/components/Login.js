import React,{useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'; 
import {UserContext} from "../App"
import '../App.css'
toast.configure()
const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const history=useHistory();
    const {dispatch}=useContext(UserContext);
    const paperStyle={padding :40,height:'60vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'17px 0'}
    const textstyle={margin:'10px 0px'}
    const bodystyle={paddingtop:'45px'}
    const Postdata=()=>{
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password,
            })
        }).then(res=>res.json())
        .then(data=>{ 
            if(data.msg)
            toast(data.msg, {position: toast.POSITION.TOP_RIGHT,width:"20px",autoClose:false}) 
            if(data.token)
            {
            localStorage.setItem("jwt",data.token);
             localStorage.setItem("user",JSON.stringify(data.user));
              dispatch({type:"USER",payload:data.user});
              history.push("/profile")
            }
          })
        }
    return(
        <Grid style={bodystyle}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2 style={{color:"red"}}>Sign In</h2>
                </Grid>
                <TextField style={textstyle} 
                label='Email' 
                placeholder='Enter email' 
                 value={email}
                onChange={(e)=>setEmail(e.target.value)}
                 fullWidth required/>
                <TextField label='Password'
                 placeholder='Enter password' 
                 type='password' 
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 fullWidth required/>
                <Button  onClick={()=>Postdata()}type='submit' color='secondary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography style={textstyle}>
                     <Link href="/signup" >
                        Sign Up 
                </Link>
                </Typography>
                <Typography style={textstyle}>
                     <Link href="/resetpassword" >
                        Forgot Password
                </Link>
                </Typography>
                <Typography style={textstyle}>
                     <Link href="/verifyemail" >
                        Resend Verification email
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login
