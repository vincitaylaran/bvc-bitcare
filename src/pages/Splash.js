import React, { Component } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

//
// This component is sed to fetch user data before rendering user's
// profile page after registering.
class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  loadProfile = () => {
    const isServiceWorker = sessionStorage.getItem("isServiceWorker");

    if (isServiceWorker === "true") {
      this.props.history.replace("/profile/service_worker");
    } else if (isServiceWorker === "false") {
      this.props.history.replace("/profile/client");
    }
  };

  componentDidMount() {
    setTimeout(this.loadProfile, 2000);
  }

  render() {
    return (
      <div>
        <h1>Please wait</h1>
        <CircularProgress />
      </div>
    );
  }
}

export default Splash;
