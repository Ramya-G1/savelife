import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Grid,Paper,TextField, Button,Link} from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'; 
import '../App.css'
toast.configure()
const Verification=()=>{
    const [email,setEmail]=useState("");
    const history=useHistory();
    const paperStyle={padding :40,height:'40vh',width:280, margin:"20px auto"}
    const btnstyle={margin:'17px 0'}
    const textstyle={margin:'10px 0px'}
    const bodystyle={paddingtop:'45px'}
    const resend=()=>{
        console.log("hi")
        fetch("/resend",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.msg)
            toast(data.msg,{autoClose:false}) 
            if(data.smsg)
               {
                toast(data.smsg,{autoClose:false}) 
                history.push('/login')
               }
          })
        }
    return(
        <Grid style={bodystyle}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <h2 style={{color:"red"}}>Verify Email</h2>
                </Grid>
                <TextField style={textstyle} 
                label='Email' 
                placeholder='Enter email to be verified' 
                 value={email}
                onChange={(e)=>setEmail(e.target.value)}
                 fullWidth required/>
                <Button type='submit' color='secondary' variant="contained" style={btnstyle}
                onClick={()=>resend()}
                fullWidth>Verify</Button>
                     <Link style={{paddingLeft:"90px"}} href="/login" >
                     Login Here
                </Link>
            </Paper>
        </Grid>
    )
}

export default Verification