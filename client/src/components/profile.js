import React from 'react'
import {useHistory} from 'react-router-dom'


import {Button} from '@material-ui/core'
import '../App.css'
const Profile=()=>{
    const history =useHistory('')
    const btnstyle={ maxHeight: '40px',Width: '90px', minHeight: '42px', justifyContent: 'center'}
    const donate=()=>{
       history.push('/donor') 
    }
    const request=()=>{
        history.push('/request')
    }
    const mydonors=()=>{
        history.push('/donate')
    }
    const myrequests=()=>{
        history.push('/Myrequest')
    }
    return(
        <div>
        
        <img alt="" style={{width:"100%",height:"100vh"}} src="http://www.shergee.com/images/sub_banner.jpg"  /> 
       
         <div className="btn" style={{top:"17%",paddingLeft:"30%",marginBottom:"14px"}}>
            <Button onClick={()=>donate()} type='submit' color='secondary' variant="contained" style={btnstyle}
                fullWidth>Donate</Button>
          </div>
           <div className="btn" style={{top:"26%",paddingLeft:"30%",marginBottom:"14px"}}>
        <Button onClick={()=>request()} type='submit' color='secondary' variant="contained" style={btnstyle}
            fullWidth>Request</Button>
     </div>
     <div className="btn" style={{top:"35%",paddingLeft:"30%",marginBottom:"14px"}}>
     <Button onClick={()=>mydonors()} type='submit' color='secondary' variant="contained" style={btnstyle}
            fullWidth>My Donations</Button>
    </div>
     <div className="btn" style={{ top:"44%",paddingLeft:"30%"}}>
         <Button onClick={()=>myrequests()} type='submit' color='secondary' variant="contained" style={btnstyle}
             fullWidth>My Requests</Button>
    </div> 
    </div>
    )
}
export default Profile
