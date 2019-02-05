import React, { Component, Fragment } from 'react';
import NavBar from "./components/navbar/NavBar";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

class App extends Component {
  render() {
    return (
      <div className="App">
          <BrowserRouter>
            <Switch>
              <Fragment>
                <CssBaseline />
                <NavBar />
                <div id="body">
                  <AppRoutes />
                </div>
              </Fragment>
            </Switch>
          </BrowserRouter>
      </div>
    );
  }
}
 
export default App;
