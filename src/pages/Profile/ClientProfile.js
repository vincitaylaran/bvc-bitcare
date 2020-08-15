import React, { Component } from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import NavBar from "../../components/NavBar";

const styles = theme => ({});

class ClientProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientFirstName: "",
      patientLastName: "",
      parentGuardianFirstName: "",
      parentGuardianLastName: "",
      aboutMe: "",
      email: "",
      phoneNumber: "",
      patientCondition: "",
      patientNeeds: ""
    };
  }

  async componentDidMount() {
    const user = await this.getUser();

    // Set state from matched user.
    this.setState({
      patientFirstName: user.patientFirstName,
      patientLastName: user.patientLastName,
      parentGuardianFirstName: user.parentGuardianFirstName,
      parentGuardianLastName: user.parentGuardianLastName,
      aboutMe: user.aboutMe,
      email: user.email,
      phoneNumber: user.phoneNumber,
      patientCondition: user.patientCondition,
      patientNeeds: user.patientNeeds
    });
  }

  onEditProfile = () => {
    this.props.history.push("client/edit");
  };

  getUser = async () => {
    if (this.props.model.FindOne) {
      const user = await this.props.model.FindOne(sessionStorage.getItem("id"));
      return user;
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
      patientCondition,
      patientNeeds
    } = this.state;

    return (
      <>
        <NavBar
          username={parentGuardianFirstName + " " + parentGuardianLastName}
        />
        <Container>
          <Grid item xs={12}>
            <Grid>
              <h1>
                {patientFirstName} {patientLastName}
              </h1>
              <Button
                onClick={this.onEditProfile}
                color="primary"
                variant="contained"
              >
                Edit
              </Button>
            </Grid>
            <h2>Condition</h2>
            <p>{patientCondition}</p>

            <h2>Needs</h2>
            <p>{patientNeeds}</p>

            <h2>Parent/Guardian</h2>
            <p>
              {parentGuardianFirstName} {parentGuardianLastName}
            </p>

            <h2>Phone</h2>
            <p>{phoneNumber}</p>

            <h2>Email</h2>
            <p>{email}</p>
          </Grid>
        </Container>
      </>
    );
  }
}

ClientProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientProfile);
