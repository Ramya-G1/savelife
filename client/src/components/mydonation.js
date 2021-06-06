import React,{useState,useEffect,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CallIcon from '@material-ui/icons/Call';
import { IconButton} from '@material-ui/core'
import { Grid } from "@material-ui/core";
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import {UserContext} from "../App"
const useStyles = makeStyles({
  root: {
    backgroundColor:"#CF0029",
    minwidth:300
  },
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  }
});

const Mydonation=()=>
{

  const [upload,setUpload]=useState([]);
  const classes = useStyles();
  const {state}=useContext(UserContext)
  useEffect(()=>{
    fetch("/mydonation",{
     headers:{
         "Authorization":"Bearer "+localStorage.getItem("jwt")
     },
    }).then(res=>res.json())
    .then(data=>{
        setUpload(data.posts)
    }).catch(error=>{
        console.log(error)
    })
 },[])
 const deletePost = (postid)=>{
  fetch(`/deletepost/${postid}`,{
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
                   
                    <Grid key={item._id} item xs={12} sm={6} md={4} display="inline-block">
                     <div >
                    <Card className={classes.root}>
                    {_id ===state._id &&  <div class="icon"><IconButton onClick={()=>deletePost(item._id)}>
                  <ClearRoundedIcon/>
                  </IconButton></div> }
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
                 <a href={`tel:${item.phonenumber}`}><span style={{float:'left'}}><CallIcon/></span></a>
                    {item.phonenumber}
                  </Typography>
                    </CardContent>
                  </Card>
                  </div>
                  </Grid>
                  
                  )
              })
          }
  </Grid>
    
  );
}
export default Mydonation