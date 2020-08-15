import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import SignUpClientForm from "./pages/SignUp/ClientForm";
import ListServiceWorkers from "./pages/ListServiceWorkers";
import SignIn from "./pages/SignIn";

// Pages to render when signing up.
import SignUpServiceWorkerForm from "./pages/SignUp/ServiceWorkerForm";
import Paths from "./pages/SignUp/Paths";

// Pages to render when signed in.
import ServiceWorkerProfile from "./pages/Profile/ServiceWorkerProfile";
import ClientProfile from "./pages/Profile/ClientProfile";
import ServiceWorkerEditProfile from "./pages/Profile/Edit/ServiceWorkerEditProfile";
import ClientEditProfile from "./pages/Profile/Edit/ClientEditProfile";

import Splash from "./pages/Splash";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/profile">
            {sessionStorage.getItem("isServiceWorker") === "true" ? (
              <Redirect to="/profile/service_worker" />
            ) : (
              <Redirect to="/profile/client" />
            )}
          </Route>
          <Route
            exact
            path="/"
            render={props => <SignIn model={this.props.model} {...props} />}
          />
          <Route
            exact
            path="/signup"
            model={this.props.model}
            render={props => <Paths {...props} />}
          />
          <Route
            exact
            path="/signin"
            render={props => <SignIn model={this.props.model} {...props} />}
          />
          <Route
            exact
            path="/signup/service_worker"
            render={props => (
              <SignUpServiceWorkerForm model={this.props.model} {...props} />
            )}
          />
          <Route
            exact
            path="/signup/client"
            render={props => (
              <SignUpClientForm model={this.props.model} {...props} />
            )}
          />
          <Route
            exact
            path="/profile/service_worker"
            render={props => (
              <ServiceWorkerProfile model={this.props.model} {...props} />
            )}
          />
          <Route
            exact
            path="/profile/service_worker/edit"
            render={props => (
              <ServiceWorkerEditProfile model={this.props.model} {...props} />
            )}
          />
          <Route
            exact
            path="/profile/client/edit"
            render={props => (
              <ClientEditProfile model={this.props.model} {...props} />
            )}
          />
          <Route
            exact
            path="/profile/client"
            render={props => (
              <ClientProfile model={this.props.model} {...props} />
            )}
          />
          <Route
            exact
            path="/list"
            render={props => (
              <ListServiceWorkers model={this.props.model} {...props} />
            )}
          />
          <Route
            exact
            path="/splash"
            render={props => <Splash model={this.props.model} {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
