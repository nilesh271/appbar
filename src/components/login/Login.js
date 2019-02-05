import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core';
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { toggleLogin, login } from "../../actions/auth";
import { getData } from "../../utilities/localStorage";
import { LOGIN_STORAGE_KEY } from "../../constants/keys";
import { PAGE_ROUTES } from "../../constants/pageRoutes";

import React, { Component } from 'react'

const styles = {
  dialog: {
    maxWidth: "600px"
  },
  avatar: {
    marginTop: -25,
    textAlign: "center",
    width: 55,
    height: 55,
    backgroundColor: "#3f51b5"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "80%"
  },
  typo: {
    marginTop: 20,
  },
  submit: {
    marginTop: 40,
    marginBottom: 40,
  }
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
    }

    this.onFormSubmitHandler = this.onFormSubmitHandler.bind(this)
  }

  onFormSubmitHandler = (e) => {
    e.preventDefault();
    const {username, password} = this.state
    const {dispatch, history, onLoginSuccess} = this.props
    if(username !== "" && password !== "")
      dispatch(login(username, password))
      .then(() => history.push(onLoginSuccess))
  }

  onFieldChangeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onDialogClose = () => {
    this.setState({username: "", password:""})
    this.props.dispatch(toggleLogin())
  }

  componentDidMount(){
    if(getData(LOGIN_STORAGE_KEY)) {
      this.props.dispatch(login({ userProfile: getData(LOGIN_STORAGE_KEY)}) )
    }
  }

  render() {
    const { classes, auth } = this.props
    const state = this.state
    const errMsg = auth.errorCode == 401 ? "Invalid username or password." : ""
    debugger;
    return (auth.isLoggedIn ? <Redirect to={ PAGE_ROUTES.DASHBOARD } /> :
      (
        <div>
          {/* <Dialog
            open={auth.isLoginDialogOpen}
            // className={classes.dialog} 
            onBackdropClick={this.onDialogClose}
            onEscapeKeyDown={this.onDialogClose}
            maxWidth="lg"
          > */}
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar} >
                <LockOutlinedIcon />
              </Avatar>

              <Typography align="center" variant="h4" className={classes.typo}>
                Sign in
              </Typography>

              <form className={classes.form} onSubmit={this.onFormSubmitHandler}>
                
                <FormControl margin="normal" required fullWidth>
                  <InputLabel >Email Address </InputLabel>
                  <Input
                    name="username"
                    placeholder="Username"
                    title="Email Address"
                    onChange={this.onFieldChangeHandler}
                    value={state.username}
                  />
                </FormControl>
                
                <FormControl margin="normal" required fullWidth>
                  <InputLabel >Password </InputLabel>
                  <Input type="password"
                    name="password"
                    placeholder="Password"
                    title="Password"
                    onChange={this.onFieldChangeHandler}
                    value={state.password}
                  />
                </FormControl>
                
                
                  <Typography color="error">
                    {errMsg}
                  </Typography>

                <Button type="submit" fullWidth
                  className={classes.submit}
                  variant="contained"
                  color="primary"
                  title="Sign In"
                >
                  Sign In
                </Button>
                
              </form>

            </Paper>
          {/* </Dialog> */}
        </div>
      )
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Login)))  