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

class ClientEditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patientFirstName: "",
      patientLastName: "",
      parentGuardianFirstName: "",
      parentGuardianLastName: "",
      email: "",
      phoneNumber: "",
      aboutMe: "",
      patientCondition: "",
      patientNeeds: ""
    };
  }

  async componentDidMount() {
    const user = await this.getUser();
    console.log(this.state);
    // Set state from matched user.
    this.setState({
      patientFirstName: user.patientFirstName,
      patientLastName: user.patientLastName,
      parentGuardianFirstName: user.parentGuardianFirstName,
      parentGuardianLastName: user.parentGuardianLastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      aboutMe: user.aboutMe,
      patientCondition: user.patientCondition,
      patientNeeds: user.patientNeeds
    });
    console.log(this.state);
  }

  updateUser = async e => {
    e.preventDefault();

    let user, userId;
    const {
      patientFirstName,
      patientLastName,
      parentGuardianFirstName,
      parentGuardianLastName,
      aboutMe,
      email,
      phoneNumber,
      patientCondition,
      patientNeeds
    } = this.state;

    if (this.props.model.FindOne) {
      userId = sessionStorage.getItem("id");
      user = JSON.parse(JSON.stringify(await this.props.model.FindOne(userId)));

      user.patientFirstName = patientFirstName;
      user.patientLastName = patientLastName;
      user.parentGuardianFirstName = parentGuardianFirstName;
      user.parentGuardianLastName = parentGuardianLastName;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.aboutMe = aboutMe;
      user.patientCondition = patientCondition;
      user.patientNeeds = patientNeeds;

      if (this.props.model.UpdateUser) {
        if (await this.props.model.UpdateUser(user)) {
          this.props.history.replace("/profile/client");
          console.log(user);
        }
        return true;
      }
    }
  };

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

  render() {
    const {
      patientFirstName,
      patientLastName,
      parentGuardianFirstName,
      parentGuardianLastName,
      email,
      phoneNumber,
      aboutMe,
      patientCondition,
      patientNeeds
    } = this.state;
    const { classes } = this.props;

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
ClientEditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ClientEditProfile);
