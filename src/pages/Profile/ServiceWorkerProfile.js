import React, { Component } from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

import { TimeTable } from "../../components/TimeTable";
import Navbar from "../../components/NavBar";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  panel: {
    marginTop: theme.spacing(2)
  }
});

class ServiceWorkerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      aboutMe: "",
      email: "",
      phoneNumber: "",
      availability: []
    };
  }

  async componentDidMount() {
    const user = await this.getUser();
    console.log(user);
    // Set state from matched user.
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      aboutMe: user.aboutMe,
      email: user.email,
      phoneNumber: user.phoneNumber
    });

    user.availability.forEach(block =>
      this.setState({ availability: this.state.availability.concat(block) })
    );
  }

  getUser = async () => {
    if (this.props.model.FindOne) {
      const user = await this.props.model.FindOne(sessionStorage.getItem("id"));
      return user;
    }
  };

  onEditProfile = () => {
    this.props.history.push("service_worker/edit");
  };

  render() {
    const { classes } = this.props;

    const {
      firstName,
      lastName,
      aboutMe,
      email,
      phoneNumber,
      availability
    } = this.state;
    return (
      <>
        <Navbar username={`${this.state.firstName} ${this.state.lastName} `} />
        <div className={classes.root}>
          <Container>
            <Grid spacing={4}>
              <Grid item xs={12}>
                <h1>
                  {firstName} {lastName}
                </h1>
              </Grid>

              <Grid item xs={6}>
                <h2>About Me</h2>
                <p>{aboutMe}</p>
              </Grid>
              <Grid item xs={6}>
                <h2>Email</h2>
                <p>{email}</p>
              </Grid>
              <Grid item xs={6}>
                <h2>Phone</h2>
                <p>{phoneNumber}</p>
              </Grid>
              <>
                {sessionStorage.getItem("isLoggedIn") === "true" ||
                sessionStorage.getItem("isLoggedIn") === null ? (
                  <Grid item xs={6}>
                    <Button
                      onClick={this.onEditProfile}
                      color="primary"
                      variant="contained"
                    >
                      Edit
                    </Button>
                  </Grid>
                ) : (
                  <br />
                )}
              </>
              <Grid className={classes.panel}>
                <ExpansionPanel>
                  <ExpansionPanelSummary>Availability</ExpansionPanelSummary>
                  <TimeTable times={availability} />
                </ExpansionPanel>
              </Grid>
            </Grid>
          </Container>
        </div>
      </>
    );
  }
}

ServiceWorkerProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default withStyles(styles)(ServiceWorkerProfile);
