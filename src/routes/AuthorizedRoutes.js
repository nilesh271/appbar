import { Route, Redirect } from "react-router-dom";
import React, { Fragment } from 'react'
import { connect } from "react-redux"
import { PAGE_ROUTES } from '../constants/pageRoutes'

function AuthorizedRoutes({ path, component, auth, ...rest }) {
  return (
    <Route path={path} {...rest} render={() => {
        return auth.isLoggedIn ? 
            <Route path={path} component={component} {...rest} />
            : <Redirect to={PAGE_ROUTES.LOGIN} /> 
    }} />
  )
}

const mapStateToProps = (state) => {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(AuthorizedRoutes)