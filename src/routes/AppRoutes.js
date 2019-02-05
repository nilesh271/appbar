import AuthorizedRoutes from "./AuthorizedRoutes";
import UnauthorizedRoutes from "./UnauthorizedRoutes";
import { PAGE_ROUTES } from "../constants/pageRoutes";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";
import DashboardPage from "../pages/DashboardPage";
import { Switch } from "react-router-dom";
 
import React from 'react'

export default function AppRoutes() {
  return (
    <Switch>
      <AuthorizedRoutes path={ PAGE_ROUTES.DASHBOARD } component={ DashboardPage } />
      <UnauthorizedRoutes path={ PAGE_ROUTES.LOGIN } component={ LoginPage } />
      <UnauthorizedRoutes path={ PAGE_ROUTES.REGISTER } exact={true} component={ RegistrationPage } />
      <UnauthorizedRoutes path={ PAGE_ROUTES.HOME } component={ HomePage } />
    </Switch>
  )
}
