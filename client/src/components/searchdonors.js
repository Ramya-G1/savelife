import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CallIcon from '@material-ui/icons/Call';
import {useHistory} from 'react-router-dom'
import { Grid} from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css';
import {WhatsappShareButton,WhatsappIcon} from "react-share";
import {toast} from 'react-toastify'; 
import '../App.css'
const useStyles = makeStyles({
  root: {
    backgroundColor:"#CF0029"
  },
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  }
});
const Searchdonor=()=>
{
    const history=useHistory()
  const [upload,setUpload]=useState([]);
  const classes = useStyles();
  useEffect(()=>{
    fetch('/searchusers',{
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          query:JSON.parse(localStorage.getItem("searchgroup")).value
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.user.length)
        setUpload(data.user)
        else{
            toast("No donors found", {position: toast.POSITION.TOP_RIGHT,width:"20px",autoClose:false})
            history.push('/') 
      }
    }).catch(error=>{
        console.log(error)
    })
 })
  return (
    <Grid
    container
    spacing={4}
    className={classes.gridContainer}
  >
          {
              upload.map(item=>{
                  return(
                   
                    <Grid  key={item._id} item xs={12} sm={6} md={4} display="inline-block">
                   
                    <Card className={classes.root}>
                    <CardContent>
                      <Typography>
                        {item.name}
                      </Typography>
                      <Typography>
                        {item.bloodgroup}
                      </Typography>
                      <Typography>
                        {item.city},{item.state},{item.country}
                      </Typography>
                 <Typography>
                 <a href={`tel:${item.phonenumber}`}><CallIcon/></a>
                    {item.phonenumber}
                  </Typography>
                  <div style={{float:'right' ,paddingRight:"20px"}}>
                  <WhatsappShareButton 
                title={` *****DONOR***** \n NAME:${item.name} \n BLOOD GROUP:${item.bloodgroup} \n COUNTRY:${item.country} \n PHONE:${item.phonenumber} \n`}
                url={"http://localhost:3000/open"}
                >
                 <WhatsappIcon size={36} borderRadius={40}/>
              </WhatsappShareButton>
              </div>
                    </CardContent>
                  </Card>
                  
                  </Grid>
               
                  )
              })
          }
   </Grid>
  );
}
export default Searchdonor