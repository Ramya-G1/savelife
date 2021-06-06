import React,{useContext,useState} from 'react'
import {useHistory} from 'react-router-dom'
import {AppBar,Toolbar,Button,useMediaQuery,useTheme, Grid} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase';
import {fade,makeStyles } from '@material-ui/core/styles';
import DrawerComponent from './drawer'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {UserContext} from "../App"
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'; 
toast.configure()

const useStyles = makeStyles(theme =>({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth:'300',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);
const NavBar=()=>{
  const classes = useStyles();
  const {state,dispatch}=useContext(UserContext);
  const history=useHistory();
  const [value, setValue] = useState("");
  const login=()=>{
    history.push('/login')
  }
  const signup=()=>{
    history.push('/signup')
  }
  const home=()=>{
    history.push('/')  
  }
  const profile=()=>{
    history.push('/profile')  
  }
  const allrequests=()=>{
    history.push('/allrequests')  
  }
  const covidstats=()=>{
    history.push('/covidstats')  
  }
  const news=()=>{
    history.push('/news')  
  }
  const theme=useTheme();
  const [value1, setValue1] =useState('');
  const isMatch=useMediaQuery(theme.breakpoints.down('sm'))
  const handleRadioChange = (event) => {
    setValue1(event.target.value)
  }
  const renderList=()=>{
    if(state)
    {
      return [
        <p key="2"> <Button color="inherit" onClick={()=>profile()}>Profile</Button></p>,
        <Grid>
        <Button color="inherit" onClick={()=>home()}>Donors</Button>
        </Grid>,
         <Grid>
         <Button color="inherit" onClick={()=>allrequests()}>Requests</Button>
        </Grid>,
           <Grid>
         <Button color="inherit" onClick={()=>covidstats()}>Covid Stats</Button>
         </Grid>,
          <Grid>
        <Button color="inherit" onClick={()=>news()}>Health News</Button>
          </Grid>,
        <a  style={{textDecoration:"none" ,color:"white"}} href="https://www.google.co.in/maps/search/near+by+hospitals/"><Button>Nearby Hospitals</Button></a>,
        <a  style={{textDecoration:"none" ,color:"white"}} href="https://www.google.co.in/maps/search/near+by+Bloodbanks/"><Button>Nearby BloodBanks</Button></a>,
        <p key="3" ><Button color="inherit" onClick={()=>{localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push('/open')
          }}>Logout</Button> </p>
      ]
    }
    else
    {
      return [
        <p key="4"><Button color="inherit" onClick={()=>login()}>Login</Button></p>,
       <p key="5"><Button color="inherit" onClick={()=>signup()}>signup</Button></p>
      ]
    }
  }
  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleKeypress = e => {
  if (e.keyCode?e.keyCode:e.which === 13) {
    const arr={value}
    if(value1==="donor")
    {
    localStorage.setItem("searchgroup",JSON.stringify(arr))
    setValue('')
    history.push('/searchdonors')
    }
    else if(value1==="request")
    {
      localStorage.setItem("searchgroup",JSON.stringify(arr))
      setValue('')
      history.push('/searchrequest')
    }
    else
    toast("Please select Donor or Request for searching", {position: toast.POSITION.TOP_RIGHT,width:"20px",autoClose:false}) 
  }
};
   return ( 
    <AppBar  position="relative">
    <Toolbar>
      {isMatch?(<DrawerComponent/>): (<>{renderList()}</>)}
      {state &&  <> <div><div className={classes.search}>
          <div className={classes.searchIcon}>
          <SearchIcon />
          </div>
          <InputBase
             value={value.toUpperCase()}
             onChange={handleChange}
            onKeyPress={handleKeypress}
            placeholder="BloodGroup"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
           ></InputBase>  
        </div>
        </div>
        <div>
        <RadioGroup aria-label="quiz" name="quiz" value={value1} onChange={handleRadioChange}>
      <FormControlLabel value="donor" control={<Radio />} label="Donor" />
      <FormControlLabel value="request" control={<Radio />} label="Request" />
    </RadioGroup></div></>}
    </Toolbar>
  </AppBar>
   )
}
export default NavBar;