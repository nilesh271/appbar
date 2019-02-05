import React, { Component } from 'react'
import Register from "../components/register/Register";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  loginContainer: {
    marginLeft: "35%",
    marginTop: "5%",
    width: "30%"
  }
}

class RegistrationPage extends Component {
  render() {
    const { classes } = this.props 
    return (
      <div className={classes.loginContainer}>
          <Register />
      </div>
    )
  }
}

export default withStyles(styles)(RegistrationPage)