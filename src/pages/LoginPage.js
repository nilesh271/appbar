import React, { Fragment } from 'react'
import Login from "../components/login/Login";
import { PAGE_ROUTES } from "../constants/pageRoutes";
import { withStyles } from "@material-ui/core/styles";
import { Tabs, Tab } from "@material-ui/core";
import { Link } from "react-router-dom";

const classes = {
  loginContainer: {
    marginLeft: "35%",
    marginTop: "5%",
    width: "30%"
  }
}

function LoginPage({classes}) {
  return (
    <div className={classes.loginContainer} >
    
    {/* <Tabs variant="fullWidth" value={1} >
      <Tab component="a" onClick={event => event.preventDefault()} label="Page One" href="page1" />
      <Tab component="a" onClick={event => event.preventDefault()} label="Page Two" href="page2" />
      <Tab component="a" onClick={event => event.preventDefault()} label="Page Three" href="page3"/>
      
    </Tabs> */}

      <Login onLoginSuccess={PAGE_ROUTES.DASHBOARD} />
    </div>
  )
}

export default withStyles(classes)(LoginPage)