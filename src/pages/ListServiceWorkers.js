import React, { Component } from "react";
import WorkerCard from "../components/WorkerCard.js";
import AvailabilityForm from "../components/Availability/AvailabilityForm";
import NavBar from "../components/NavBar";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

//
// MATERIAL-UI REQUIREMENT #1: tweak or add values here to apply styles to a Material-UI component.
const styles = theme => ({});

class ListServiceWorkers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workerCardList: null,
      availabilityBlock: undefined,
      username: null
    };
  }

  // Fishes out an object from the AvailabilityForm component which contains
  // the day, start time, and end time for a service worker.

  //desiredTime = { day: , startTime: , endTime:}
  //Gets return array from Model.List() using parameter, to display a list of {WorkerCard}s
  renderInWorkerCards = async desiredTime => {
    // console.log(
    //   `desiredTime: ${desiredTime.day}, ${desiredTime.start}, ${desiredTime.end}`
    // );

    console.log(desiredTime);

    // Is undefined without "await". WHY?????
    await this.setState({ availabilityBlock: desiredTime });

    console.log(this.state.availabilityBlock);

    let workersReturned;
    if (this.props.model.List) {
      workersReturned = await this.props.model.List(
        this.state.availabilityBlock
      );

      console.log(this.state.availabilityBlock);

      this.setState({
        workerCardList: this.CreateWorkerCard(workersReturned)
      });
    }
  };

  //Uses workers parameter (the return array from Model.List())
  // to create and return an array of {WorkerCard} components
  CreateWorkerCard = workers => {
    let cardList = null;
    console.log(workers);
    cardList = workers.map((aWorker, indexKey) => (
      <WorkerCard worker={aWorker} key={indexKey} />
    ));
    return cardList;
  };

  async componentDidMount() {
    let user = null;
    const userId = sessionStorage.getItem("id");
    const isServiceWorker = sessionStorage.getItem("isServiceWorker");

    if (this.props.model.FindOne) {
      user = await this.props.model.FindOne(userId);
      console.log(user);

      //
      // Sets state for "username". The value of "username" will be passed down to the
      // NavBar component if a user is logged in.
      if (isServiceWorker === "true") {
        this.setState({
          username: `${user.firstName} ${user.lastName}`
        });
      } else if (isServiceWorker === "false") {
        this.setState({
          username: `${user.parentGuardianFirstName} ${user.parentGuardianLastName}`
        });
      } else {
        this.setState({
          username: null
        });
      }
    }
  }

  onLogin = () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false" || isLoggedIn === null)
      this.props.history.push("signin");
  };

  onProfile = () => {
    this.props.history.push("/profile");
  };

  render() {
    //
    // MATERIAL-UI REQUIREMENT #2: Needed for accessing "styles" CB function declared above this class.
    const { classes } = this.props;

    return (
      <>
        <NavBar username={this.state.username} />

        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col s1">
              <Typography variant="h4" gutterBottom>
                Find a service worker
              </Typography>
              <AvailabilityForm
                buttonText="Filter"
                onGetBlock={this.renderInWorkerCards}
              />
            </div>
            <div className="col s1">{this.state.workerCardList}</div>
          </div>
        </div>
      </>
    );
  }
}

//
// MATERIAL-UI REQUIREMENT #3: I don't know why this is needed.
ListServiceWorkers.propTypes = {
  classes: PropTypes.object.isRequired
};

//
// MATERIAL-UI REQUIREMENT #4: Applies styles when render this component.
export default withStyles(styles)(ListServiceWorkers);
