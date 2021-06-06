import React,{useEffect,createContext,useReducer,useContext} from'react'
import Login from'./components/Login'
import Signup from'./components/Signup'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Donor from './components/donor'
import Verify from './components/verify'
import Open from './components/open'
import Request from './components/request'
import Profile from './components/profile'
import Newpassword from './components/newpassword'
import NewsApp from './components/newsApp'
import Resetpassword from './components/resetpassword'
import Searchdonors from './components/searchdonors'
import Mydonation from './components/mydonation'
import Myrequests from './components/myrequests'
import Verification from './components/verification '
import Covid from './components/covid stats/covid'
import Searchrequests from './components/searchrequest'
import Allrequests from './components/Allrequests'
import {BrowserRouter,Route,Switch,useHistory}from "react-router-dom";
import {reducer} from "./reducers/userReducer";
import {initialState} from "./reducers/userReducer";
export const UserContext=createContext();
const Routing=()=>{
  const history=useHistory();
  const {state,dispatch}=useContext(UserContext);
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'));
    const donor=JSON.parse(localStorage.getItem('donor'))
    if(user || donor)
    {
     dispatch({type:"USER",payload:user})
     history.push("/profile")
    }
    else{
      if(!history.location.pathname.startsWith('/verifyemail') && !history.location.pathname.startsWith('/reset') && !history.location.pathname.startsWith('/login') && !history.location.pathname.startsWith('/signup'))
      history.push("/open")
    }
  },[])
  return (
    <Switch>
    <Route exact path="/" ><Home/></Route>
    <Route exact path="/open" ><Open/></Route>
    <Route path="/searchdonors" ><Searchdonors/></Route>
    <Route path="/profile" ><Profile/></Route>
    <Route path="/verifyemail" ><Verification/></Route>
    <Route path="/donate" ><Mydonation/></Route>
    <Route path="/login"><Login/></Route>
    <Route path="/signup"><Signup/></Route>
    <Route path="/donor"><Donor/></Route>
    <Route path="/reset/:token"><Newpassword/></Route>
    <Route path="/reset"><Resetpassword/></Route>
    <Route path="/verify"><Verify/></Route>
    <Route path="/covidstats"><Covid/></Route>
    <Route path="/news"><NewsApp/></Route>
    <Route path="/request"><Request/></Route>
    <Route path="/allrequests"><Allrequests/></Route>
    <Route path="/Myrequest"><Myrequests/></Route>
    <Route path="/searchrequest"><Searchrequests/></Route>
    </Switch>
  )
}
function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
   return (
     <UserContext.Provider value={{state,dispatch}}>
     <BrowserRouter>
     <Navbar/> 
     <Routing/>
     </BrowserRouter>
     </UserContext.Provider>
   );
 }
export default App;
