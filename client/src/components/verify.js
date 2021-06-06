import React ,{useState}from 'react'
import {useHistory} from 'react-router-dom'
import '../App.css'
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'; 
import { Grid,Paper,TextField, Button, Typography,Link} from '@material-ui/core'
toast.configure()
const Verify=()=>{
    const [code,setCode]=useState('')
    const history=useHistory();
    const paperStyle={padding :40,height:'60vh',width:280, margin:"20px auto"}
    const btnstyle={margin:'17px 0'}
    const textstyle={margin:'10px 0px'}
    const bodystyle={paddingtop:'45px'}
    const resend=()=>{
        fetch("/phonecode",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                phonenumber:JSON.parse(localStorage.getItem("donor")).to
            })
          }).then(res=>res.json())
          .then(data=>{ 
            if(data.message)
            toast(data.message, {position: toast.POSITION.TOP_RIGHT,width:"20px",autoClose:false}) 
              if(data.donor)
              {
               toast("verification code sent", {position: toast.POSITION.TOP_RIGHT,width:"20px",autoClose:false}) 
               localStorage.setItem("donor",JSON.stringify(data.donor))
               history.push("/verify")
              }
            })
    }
    const Postdata=()=>{
        fetch("/verifyphonecode",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                code:code,
                phonenumber:JSON.parse(localStorage.getItem("donor")).to
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.message)
            toast(data.message, {position: toast.POSITION.TOP_RIGHT,width:"20px",autoClose:false}) 
            if(data.donor)
            {
            localStorage.setItem("donor",JSON.stringify(data.donor))
            history.push('/donor')
            }
          })
    }
    return (
        <Grid style={bodystyle}>
        <Paper elevation={10} style={paperStyle}>
            <TextField style={textstyle} 
            label='verification code' 
            placeholder='Enter verification code' 
            value={code}
            onChange={(e)=>setCode(e.target.value)}
            fullWidth required/>
            <Button  onClick={()=>Postdata()}type='submit' color='secondary' variant="contained" style={btnstyle} fullWidth>verify</Button>
            <Typography style={textstyle}>Resend verification code?
                     <Link  href='#' onClick={()=>resend()}>
                        Resend 
                </Link>
                </Typography>
        </Paper>
    </Grid>
    )
}
export default Verify