import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { toggleLogin, logout, login } from "../../actions/auth";
import { connect } from "react-redux";
import { NavLink, withRouter  } from "react-router-dom";
import { PAGE_ROUTES } from "../../constants/pageRoutes";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu'
import { getData } from "../../utilities/localStorage";
import { LOGIN_STORAGE_KEY } from "../../constants/keys";


const styles = {
  logo: {
    "flex-grow": "1",
    marginLeft: 5
  },
};

class NavBar extends Component {
  constructor(props){
    super(props)

    this.state = {
      openSubMenu: false,
      anchorEl: null
    }

    this.onLogoutClickHandler = this.onLogoutClickHandler.bind(this)
  }

  onLoginCLickHandler = (e) => {
    this.props.dispatch(toggleLogin())
  }

  onLogoutClickHandler = () => {
    const { history } = this.props
    this.closeSubMenu();
    this.props.dispatch(logout())
    .then(() => history.push(PAGE_ROUTES.HOME))
  }

  openSubMenu = (e) => {
    this.setState({
      openSubMenu: true,
      anchorEl: e.currentTarget 
    })
  }

  closeSubMenu = () => {
    this.setState({
      openSubMenu: false,
      anchorEl: null
    })
  }

  componentDidMount() {
    if(getData(LOGIN_STORAGE_KEY)) {
      this.props.dispatch(login({ userProfile: getData(LOGIN_STORAGE_KEY)}) )
    }
  }

  render() {
    const { classes, auth } = this.props
    const { openSubMenu, anchorEl } = this.state

    return (
      <div>
          <AppBar position="static" >
            <Toolbar>
              {
                auth.isLoggedIn ? 
                <IconButton color="inherit">
                  <MenuIcon />
                </IconButton>
                : null
              }
              <Typography variant="h6" color="inherit" className={classes.logo}>
                Sneak
              </Typography>
              {
                !auth.isLoggedIn ? 
                <Button color="inherit" to={PAGE_ROUTES.LOGIN} component={NavLink} 
                  onClick={auth.isLoggedIn ? this.onLogoutClickHandler : this.onLoginCLickHandler }>
                  {auth.isLoggedIn ? "Log Out" : "Login" }
                </Button>
                :
                <div id="submenu">
                  <IconButton
                    aria-owns='menu-appbar'
                    aria-haspopup="true"
                    onClick={this.openSubMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={openSubMenu}
                    onClose={this.closeSubMenu}
                  >
                    <MenuItem>Profile</MenuItem>
                    <MenuItem onClick={this.onLogoutClickHandler}>Sign out</MenuItem>
                  </Menu>
                </div>
              }
            </Toolbar>
          </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(NavBar)));