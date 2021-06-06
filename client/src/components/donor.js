import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Grid,Paper,TextField, Button,Select, FormControl,MenuItem,InputLabel,makeStyles} from '@material-ui/core'
import csc from 'country-state-city'
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'; 
import '../App.css'
toast.configure()
const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
const blood=['B+','B-','A+','A-','AB+','AB-','O+','O-']
const Donor=()=>{
  const paperStyle={padding :40,height:'90%',width:'300px', margin:"20px auto"}
  const btnstyle={margin:'17px 0'}
  const textstyle={margin:'10px 0px'}
  const bodystyle={paddingtop:'45px'}
  const classes = useStyles();
  const history=useHistory();
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [number, setNumber] = useState('');
  const [country, setCountry] = useState('');
  const [countrycode, setCountrycode] = useState('');
  const [statecode,setStatecode]=useState('')
  const [city,setCity]=useState('')
  const [ustate, setUstate] = useState('');
  const [open, setOpen] =useState(false);
  const [opens, setOpens] =useState(false);
  const [open1, setOpen1] =useState(false);
  const [openss, setOpenss] =useState(false);
  const handleChange = (event) => {
    setCountry(event.target.value)
    setUstate('');
    setCity('');
    setCountrycode( csc.getAllCountries().find(country => country.name === event.target.value).isoCode)
  }
  const handleChanges = (event) => {
    setUstate(event.target.value)
    setCity('');
    setStatecode( csc.getStatesOfCountry(countrycode).find(state=> state.name === event.target.value).isoCode)
  }
  const handleChangess = (event) => {
    setCity(event.target.value)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleCloses = () => {
    setOpens(false)
  }
  const handleOpens = () => {
    setOpens(true)
  }
  const handleClosess = () => {
    setOpenss(false)
  }
  const handleOpenss = () => {
    setOpenss(true)
  }
  const handleClose1 = () => {
      setOpen1(false)
    }
    const handleOpen1 = () => {
      setOpen1(true)
  }
  const handleChange1 = (event) => {
    setGroup(event.target.value)
  }
    const postdonordata=()=>{
      if(JSON.parse(localStorage.getItem("donor"))==null)
       { const d={"status":false,"to":"00000000000"}
       localStorage.setItem("donor",JSON.stringify(d))
       }
      fetch("/createdonor",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
             "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            phonenumber:number,
            name:name,
            age:age,
            country:country,
            state:ustate,
            city:city,
            bloodgroup:group,
            verifiednumber:JSON.parse(localStorage.getItem("donor")).to,
            status:JSON.parse(localStorage.getItem("donor")).status
        })
      }).then(res=>res.json())
      .then(data=>{ 
        toast(data.msg, {position: toast.POSITION.TOP_RIGHT,width:"20px",autoClose:false}) 
        if(data.donor)
          history.push('/')
        })
      }
    const Postdata=()=>{
      fetch("/phonecode",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            phonenumber:number,
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
    return(
        <Grid style={bodystyle}>
            <Paper elevation={10} style={paperStyle}>
            <TextField style={textstyle}
                 label='phonenumber'
                  placeholder='Enter phonenum as +9198*******9'
                  value={number}
                onChange={(e)=>setNumber(e.target.value)}
                 fullWidth required/>
                    <Button onClick={()=>Postdata()} type='submit' color='secondary' variant="contained" style={btnstyle}
                fullWidth>sendcode</Button>
                <TextField style={textstyle}
                 label='Name' 
                 placeholder='Enter Name' 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                fullWidth required/>
                  <TextField style={textstyle}
                 label='Age'
                  placeholder='Enter Age'
                  value={age}
                onChange={(e)=>setAge(e.target.value)}
                 fullWidth required/>
                 <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Blood Group</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open1}
          onClose={handleClose1}
          onOpen={handleOpen1}
          value={group}
          onChange={handleChange1}
        >
          {
            blood.map((e,index)=>
            <MenuItem key={index} value={e}  >
            {e}
            </MenuItem> 
             )
           }
        </Select>
      </FormControl>
                 {/* <TextField style={textstyle}
                 label='Number of Units'
                  placeholder='Number of units'
                  value={unit}
                onChange={(e)=>setUnit(e.target.value)}
                 fullWidth required/> */}
                
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Country</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={country}
          onChange={handleChange}
        >
          {
            csc.getAllCountries().map((e,index)=>
            <MenuItem key={index} value={e.name}  >
            {e.name}
            </MenuItem> 
             )
           }
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">State</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={opens}
          onClose={handleCloses}
          onOpen={handleOpens}
          value={ustate}
          onChange={handleChanges}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
           { 
           
            csc.getStatesOfCountry(countrycode).map((e,index)=>
            <MenuItem key={index} value={e.name}>
            {e.name}
            </MenuItem> 
             )
           }
           
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">City</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openss}
          onClose={handleClosess}
          onOpen={handleOpenss}
          value={city}
          onChange={handleChangess}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            csc.getCitiesOfState(countrycode,statecode).map((e,index)=>
            <MenuItem key={index} value={e.name}>
            {e.name}
            </MenuItem> 
             )
           }
        </Select>
      </FormControl>    
                 <div className="na">
                <Button onClick={()=>postdonordata()} type='submit' color='secondary' variant="contained" style={btnstyle}
                fullWidth>Donate</Button>
                </div>    
            </Paper>
        </Grid>
    )
}

export default Donor