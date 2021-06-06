import React,{useState} from 'react'
import {useHistory,useParams} from 'react-router-dom'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'; 
import '../App.css'
toast.configure()
const Newpassword=()=>{
    const [password,setPassword]=useState("");
    const history=useHistory();
    const {token}=useParams()
    const paperStyle={padding :40,height:'60vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'17px 0'}
    const textstyle={margin:'10px 0px'}
    const bodystyle={paddingtop:'45px'}
        const Postdata= ()=>{
            fetch("/newpassword",{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    password,
                    token
                })
            }).then(res=>res.json())
            .then(data=>{
               if(data.error){
                toast(data.error, {position: toast.POSITION.TOP_RIGHT,width:"20px",autoClose:false}) 
               }
               else{
                toast(data.msg, {position: toast.POSITION.TOP_RIGHT,width:"20px",autoClose:false}) 
                   history.push('/login')
               }
            }).catch(err=>{
                console.log(err)
            })
        }
    return(
        <Grid style={bodystyle}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2 style={{color:"red"}}>Sign In</h2>
                </Grid>
                <TextField label='Password'
                 placeholder='Enter new password' 
                 type='password' 
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 fullWidth required/>
                <Button  onClick={()=>Postdata()}type='submit' color='secondary' variant="contained" style={btnstyle} fullWidth>Update</Button>
                <Typography style={textstyle}>
                     <Link href="/signup" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Newpassword
