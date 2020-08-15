import React, { Component } from "react";

import uuid from "uuid";

import PropTypes from "prop-types";

import AvailabilityForm from "../../../components/Availability/AvailabilityForm";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  add: {
    marginBottom: theme.spacing(2)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class ServiceWorkerEditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      aboutMe: "",
      availability: []
    };
  }

  //
  // Uses the Model's FindOne method which makes a call to our mock backend.
  updateUser = async e => {
    e.preventDefault();

    let user, userId;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      aboutMe,
      availability
    } = this.state;

    if (this.props.model.FindOne) {
      // Reads the value of "id" in the session storage.
      userId = sessionStorage.getItem("id");

      // Stores the retrieved user in "user" variable.
      user = JSON.parse(JSON.stringify(await this.props.model.FindOne(userId)));

      // Assign input values to user's corresponding property values.
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.aboutMe = aboutMe;
      user.availability = availability;

      if (this.props.model.UpdateUser) {
        if (await this.props.model.UpdateUser(user))
          // Go back to user's profile if the operation is successful.
          this.props.history.push("/profile/service_worker");

        return true;
      }
    }
  };

  //
  // Adds to the worker's list of availabilities.
  onAddRow = value => {
    const timeBlock = {
      blockId: uuid(),
      day: value[0]["day"],
      start: value[0]["start"],
      end: value[0]["end"]
    };

    let availabilityList = this.state.availability.concat(timeBlock);

    this.setState({
      availability: availabilityList // FIXME: check for duplicate time blocks.
    });

    console.log("From ServiceWorkerEditProfile: ", timeBlock);
  };

  onDeleteRow = value => {
    //
    // Creates a new array from the current array and filters out any
    // objects from the current array that DO NOT contain the same value
    // that is same as "value". For example: if an object in "availability"
    // has an id of 2, and what came back from "value" is also 2, then objects with
    // an id of 1 and 3 are included in the new array.
    const filteredArray = this.state.availability.filter(
      block => block.blockId !== value
    );

    this.setState({
      availability: filteredArray
    });
  };

  async componentDidMount() {
    const user = await this.getUser();

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

  //
  // Invokes the model's FindOne function which returns a user object whose
  // id matches to one that was stored in the session storage.
  getUser = async () => {
    if (this.props.model.FindOne) {
      const user = await this.props.model.FindOne(sessionStorage.getItem("id"));
      return user;
    }
  };

  //
  // Handles any changes made to the input fields.
  onChange = e => {
    if (!this.props.model.ExpressionIsNotSafe(e.target.value))
      this.setState({ [e.target.name]: e.target.value });
  };

  //
  // Used to pass down to the AvailabilityForm component to render the rows
  // for each of the worker's availability blocks.
  getList = () => this.state.availability;

  render() {
    const { classes } = this.props;
    const { firstName, lastName, email, phoneNumber, aboutMe } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edit
          </Typography>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={this.onChange}
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={this.onChange}
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={this.onChange}
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.onChange}
                  variant="outlined"
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                  value={phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.onChange}
                  variant="outlined"
                  fullWidth
                  name="aboutMe"
                  label="About Me"
                  id="aboutMe"
                  value={aboutMe}
                  multiline
                  rows="4"
                />
              </Grid>
            </Grid>
            <Grid>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    Set Availability
                  </Typography>
                </ExpansionPanelSummary>
                <AvailabilityForm
                  handleSubmit={this.onAddRow}
                  handleDelete={this.onDeleteRow}
                  list={this.getList}
                  includeTable={true}
                  buttonText="Add"
                />
              </ExpansionPanel>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.updateUser}
            >
              Save
            </Button>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    );
  }
}
ServiceWorkerEditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ServiceWorkerEditProfile);
