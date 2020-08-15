import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import uuid from "uuid"; // Generates a seemingly random id. Used for user sign ups.

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
  }
});

class SignUpClientForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: uuid(),
      isServiceWorker: false,
      patientFirstName: "",
      patientLastName: "",
      parentGuardianFirstName: "",
      parentGuardianLastName: "",
      email: "",
      phoneNumber: "",
      passwordOne: "",
      passwordTwo: "",
      aboutMe: "",
      patientCondition: "",
      patientNeeds: ""
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onFormSubmit = e => {
    const {
      id,
      patientFirstName,
      patientLastName,
      parentGuardianFirstName,
      parentGuardianLastName,
      email,
      phoneNumber,
      passwordOne,
      passwordTwo,
      patientCondition,
      patientNeeds,
      aboutMe,
      isServiceWorker
    } = this.state;

    //
    // The reason why I created a new object is to exclude "passwordTwo" in the
    // creation of a new user. The "passwordTwo" property is only used to confirm
    // that both "passwordOne" and "passwordTwo" are the same.
    const user = {
      id: id,
      patientFirstName: patientFirstName,
      patientLastName: patientLastName,
      parentGuardianFirstName: parentGuardianFirstName,
      parentGuardianLastName: parentGuardianLastName,
      isServiceWorker: isServiceWorker,
      email: email,
      password: passwordOne,
      phoneNumber: phoneNumber,
      aboutMe: aboutMe,
      patientCondition: patientCondition,
      patientNeeds: patientNeeds
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
      patientFirstName,
      patientLastName,
      parentGuardianFirstName,
      parentGuardianLastName,
      email,
      phoneNumber,
      passwordOne,
      passwordTwo,
      patientCondition,
      patientNeeds,
      aboutMe
    } = this.state;

    return (
      <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign Up: Patient
            </Typography>
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={this.onChange}
                    name="patientFirstName"
                    variant="outlined"
                    fullWidth
                    id="patientFirstName"
                    label="Patient's First Name"
                    autoFocus
                    value={patientFirstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={this.onChange}
                    variant="outlined"
                    fullWidth
                    id="patientLastName"
                    label="Patient's Last Name"
                    name="patientLastName"
                    value={patientLastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={this.onChange}
                    name="parentGuardianFirstName"
                    variant="outlined"
                    fullWidth
                    id="parentGuardianFirstName"
                    label="Guardian's First Name"
                    autoFocus
                    value={parentGuardianFirstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={this.onChange}
                    variant="outlined"
                    fullWidth
                    id="parentGuardianLastName"
                    label="Guardian's Last Name"
                    name="parentGuardianLastName"
                    value={parentGuardianLastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={this.onChange}
                    name="passwordOne"
                    variant="outlined"
                    fullWidth
                    id="passwordOne"
                    label="Password"
                    autoFocus
                    value={passwordOne}
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={this.onChange}
                    variant="outlined"
                    fullWidth
                    id="passwordTwo"
                    label="Confirm Password"
                    name="passwordTwo"
                    value={passwordTwo}
                    type="password"
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
                <Grid item xs={12}>
                  <TextField
                    onChange={this.onChange}
                    variant="outlined"
                    fullWidth
                    name="patientCondition"
                    label="Patient's Condition"
                    id="patientCondition"
                    value={patientCondition}
                    multiline
                    rows="4"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={this.onChange}
                    variant="outlined"
                    fullWidth
                    name="patientNeeds"
                    label="Patient Needs"
                    id="patientNeeds"
                    value={patientNeeds}
                    multiline
                    rows="4"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onFormSubmit}
              >
                Register
              </Button>
            </form>
          </div>
        </Container>
      </>
    );
  }
}
SignUpClientForm.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SignUpClientForm);
