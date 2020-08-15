import React, { Component } from "react";

import AvailabilityForm from "../../components/Availability/AvailabilityForm";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import uuid from "uuid"; // Generates a seemingly random id. Used for user sign ups.

//
// Needed to style Material-UI components.
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
    margin: theme.spacing(3, 1, 2)
  },
  add: {
    marginBottom: theme.spacing(2)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class SignUpServiceWorkerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: uuid(), // Generates a unique, random id for the user.
      firstName: "",
      lastName: "",
      email: "",
      isServiceWorker: true,
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
      aboutMe: "",
      availability: []
    };
  }

  //
  // CALLBACK FUNCTIONS
  //
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

  getList = () => {
    return this.state.availability;
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onFormSubmit = e => {
    const {
      id,
      firstName,
      lastName,
      isServiceWorker,
      email,
      passwordOne,
      passwordTwo,
      phoneNumber,
      aboutMe,
      availability
    } = this.state;

    //
    // The reason why I created a new object is to exclude "passwordTwo" in the
    // creation of a new user. The "passwordTwo" property is only used to confirm
    // that both "passwordOne" and "passwordTwo" are the same.
    const user = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      isServiceWorker: isServiceWorker,
      email: email,
      password: passwordOne,
      phoneNumber: phoneNumber,
      aboutMe: aboutMe,
      availability: availability
    };

    //
    // Invokes the model's CreateUser function.
    if (this.props.model.CreateUser && passwordOne === passwordTwo) {
      this.props.model.CreateUser(user);

      if (this.props.model.Login) {
        this.props.model.Login(email, passwordOne);
        sessionStorage.setItem("id", id);
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("isServiceWorker", this.state.isServiceWorker);
        this.props.history.replace("/splash");
      }
    } else {
      console.log("One of the forms is invalid!");
    }
  };

  render() {
    const { classes } = this.props;

    const {
      firstName,
      lastName,
      email,
      passwordOne,
      passwordTwo,
      phoneNumber,
      aboutMe
    } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up: Service Worker
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
                  name="lastName"
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoFocus
                  value={lastName}
                  onChange={this.onChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  value={email}
                  onChange={this.onChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="phoneNumber"
                  variant="outlined"
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  autoFocus
                  value={phoneNumber}
                  onChange={this.onChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="passwordOne"
                  variant="outlined"
                  fullWidth
                  id="passwordOne"
                  label="Password"
                  autoFocus
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="passwordTwo"
                  variant="outlined"
                  fullWidth
                  id="passwordTwo"
                  label="Confirm Password"
                  autoFocus
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="aboutMe"
                  variant="outlined"
                  fullWidth
                  id="aboutMe"
                  label="Tell us about yourself..."
                  autoFocus
                  value={aboutMe}
                  multiline
                  rows="4"
                  onChange={this.onChange}
                />
              </Grid>

              <AvailabilityForm
                handleSubmit={this.onAddRow}
                handleDelete={this.onDeleteRow}
                list={this.getList}
                includeTable={true}
                buttonText="Add"
              />

              <Button
                color="primary"
                fullWidth
                variant="contained"
                onClick={this.onFormSubmit}
                className={classes.submit}
              >
                Register
              </Button>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

SignUpServiceWorkerForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUpServiceWorkerForm);
