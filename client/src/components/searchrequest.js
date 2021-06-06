import React,{useState,useEffect,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CallIcon from '@material-ui/icons/Call';
import {useHistory} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'; 
import { Grid } from "@material-ui/core";
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { IconButton} from '@material-ui/core'
import {UserContext} from "../App"
import {WhatsappShareButton,WhatsappIcon} from "react-share";
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

const Searchrequests=()=>
{
    const history=useHistory()
  const [upload,setUpload]=useState([]);
  const classes = useStyles();
  const {state}=useContext(UserContext)
  useEffect(()=>{
    fetch('/searchrequests',{
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
            toast("No donors found with that group", {position: toast.POSITION.TOP_RIGHT,width:"20px",autoClose:false})
            history.push('/allrequests') 
      }
    }).catch(error=>{
        console.log(error)
    })
 })
 const deletePost = (postid)=>{
    fetch(`/deleterequest/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        const newData = upload.filter(item=>{
            return item._id !== result._id
        })
        setUpload(newData)
    })
  }
  return (
    <Grid
    container
    spacing={4}
    className={classes.gridContainer}
  >
          {
              upload.map(item=>{
                const {_id}=item.postedBy;
                  return(
                  
                    <Grid  key={item._id} item xs={12} sm={6} md={4} display="inline-block">
                 
                    <Card className={classes.root}>
                    <CardContent>
                    {_id ===state._id &&  <div class="icon"><IconButton onClick={()=>deletePost(item._id)}>
                  <ClearRoundedIcon/>
                  </IconButton></div> }
                      <Typography>
                        {item.name}
                      </Typography>
                      <Typography>
                        {item.bloodgroup}
                      </Typography>
                      <Typography>
                        {item.hospital}
                      </Typography>
                      <Typography>
                        {item.city},{item.state},{item.country}
                      </Typography>
                 <Typography>
                 <a href={`tel:${item.phonenumber}`}><span style={{float:'left'}}><CallIcon/></span></a>
                    {item.phonenumber}
                  </Typography>
                  <div style={{float:'right' ,paddingRight:"20px"}}>
                  <WhatsappShareButton 
                title={` *****BLOOD REQUEST***** \n NAME:${item.name} \n BLOOD GROUP:${item.bloodgroup} \n HOSPITAL: ${item.hospital} \n COUNTRY:${item.country} \n PHONE:${item.phonenumber} \n`}
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
export default Searchrequests