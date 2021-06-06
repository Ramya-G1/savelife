import React, {useContext ,useState} from 'react';
import {Link} from 'react-router-dom'
import {List, ListItem,IconButton, ListItemText, makeStyles, Drawer} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {UserContext} from "../App"
import "../App.css"
 const useStyles = makeStyles(theme => ({
    drawerContainer: {},
    drawerPaper: { width: 'inherit' },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary
    },
    iconButtonContainer: {
      marginLeft: 'auto',
      color: 'white',
    },
    menuIconToggle: {
      fontSize: '2rem'
    },
  }));
const DrawerComponent = () => {
   const {state,dispatch}=useContext(UserContext);
   const [openDrawer, setOpenDrawer] = useState(false);
   const classes = useStyles();
    const remove=()=>{
      setOpenDrawer(false) 
      localStorage.clear()
      dispatch({type:"CLEAR"})
    }
  const renderList=()=>{
  if(state)
  {
      return [
        <Link to='/profile' className={classes.link}>
        <ListItem divider button onClick={() => setOpenDrawer(false)}>
            <ListItemText>Profile</ListItemText>
        </ListItem>
        </Link>,
        <Link to='/' className={classes.link}>
        <ListItem divider button onClick={() => setOpenDrawer(false)}>
            <ListItemText>Donors</ListItemText>
        </ListItem>
        </Link>,
         <Link to='/allrequests' className={classes.link}>
         <ListItem divider button onClick={() => setOpenDrawer(false)}>
             <ListItemText>Requests</ListItemText>
         </ListItem>
         </Link>,
          <Link to='/covidstats' className={classes.link}>
          <ListItem divider button onClick={() => setOpenDrawer(false)}>
              <ListItemText>Covid stats</ListItemText>
          </ListItem>
          </Link>,
          <Link to='/news' className={classes.link}>
          <ListItem divider button onClick={() => setOpenDrawer(false)}>
              <ListItemText>Health News</ListItemText>
          </ListItem>
          </Link>,
         <a href="https://www.google.co.in/maps/search/near+by+hospitals+/" className={classes.link}>
         <ListItem divider button onClick={() => setOpenDrawer(false)}>
           <ListItemText>Nearby Hospitals</ListItemText>
       </ListItem>
       </a>,
        <a href="https://www.google.co.in/maps/search/near+by+bloodbanks/" className={classes.link}>
        <ListItem divider button onClick={() => setOpenDrawer(false)}>
          <ListItemText>Nearby BloodBanks</ListItemText>
      </ListItem>
      </a>, 
      <Link to='/open' className={classes.link}>
          <ListItem divider button onClick={() =>remove()}>
            <ListItemText>Logout</ListItemText>
        </ListItem>
        </Link>
      ]
    }
    else
    {
      return [
        <Link to='/signup' className={classes.link}>
          <ListItem divider button onClick={() => setOpenDrawer(false)}>
              <ListItemText>Sign up</ListItemText>
          </ListItem>
          </Link>,
         <Link to='/login' className={classes.link}>
          <ListItem divider button onClick={() => setOpenDrawer(false)}>
              <ListItemText>Login</ListItemText>
          </ListItem>
          </Link>
      ]
  }
}
  return (
       <>
      <Drawer
        anchor='left'
        classes={{ paper: classes.drawerContainer }}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}>
        <List>
         {renderList()}
        </List>
      </Drawer>
      <IconButton
        className={classes.iconButtonContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple>
        <MenuIcon className={classes.menuIconToggle} />
      </IconButton>
    </>
  );
};

export default DrawerComponent;