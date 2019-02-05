import React, { Component } from 'react'
import { Paper, InputLabel, Input, FormControl, Button, 
    Typography, withStyles, Avatar } from "@material-ui/core";
import AccountBoxOutlined from "@material-ui/icons/AccountBoxOutlined";
import { register } from "../../actions/auth";
import { withRouter } from "react-router-dom";
import { PAGE_ROUTES } from "../../constants/pageRoutes";

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

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            contactNumber: "",
            email: "",
            password: "",
        }
    }

    onFormSubmitHandler = (e) => {
        e.preventDefault();
        const { firstName, lastName, contactNumber, password, email } = this.state;
        const { history, onLoginSuccess } = this.props
        this.props.dispatch(register({ firstName, lastName, contactNumber, password, email }))
        .then(() => {
            
        })
    }
    
    onFieldChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
     
    render() {
        const { classes, auth } = this.props
        const { contactNumber, firstName, lastName, password, email} = this.state
        return (
          <div>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar} >
                        <AccountBoxOutlined />
                    </Avatar>
    
                    <Typography align="center" variant="h4" className={classes.typo}>
                        Register
                    </Typography>
                    <form onSubmit={this.onFormSubmitHandler} className={classes.form}>
                        <FormControl margin="normal" required fullWidth className={classes.name}>
                            <InputLabel >First Name </InputLabel>
                            <Input
                                name="firstName"
                                placeholder="First Name"
                                title="First Name"
                                onChange={this.onFieldChangeHandler}
                                value={firstName}
                            />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth className={classes.name}>
                            <InputLabel >Last Name </InputLabel>
                            <Input
                                name="lastName"
                                placeholder="Last Name"
                                title="Last Name"
                                onChange={this.onFieldChangeHandler}
                                value={lastName}
                            />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel >Contact Number </InputLabel>
                            <Input 
                                name="contactNumber"
                                placeholder="Contact Number"
                                title="Contact Number"
                                onChange={this.onFieldChangeHandler}
                                value={contactNumber}
                            />
                        </FormControl>
                        
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel >Email Address </InputLabel>
                            <Input 
                                name="email"
                                placeholder="Email Address"
                                title="Email Address"
                                onChange={this.onFieldChangeHandler}
                                value={email}
                            />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel >Password </InputLabel>
                            <Input type="password"
                                name="password"
                                placeholder="Password"
                                title="Password"
                                onChange={this.onFieldChangeHandler}
                                value={password}
                            />
                        </FormControl>
                            
                        <Typography color="error">
                            {/* {errMsg} */}
                        </Typography>
            
                        <Button type="submit" fullWidth
                            className={classes.submit}
                            variant="contained"
                            color="primary"
                            title="Submit"
                            >
                            Submit
                        </Button>
                    </form>
                </Paper>
          </div>
        )
    }
}

export default withRouter(withStyles(styles)(Register))