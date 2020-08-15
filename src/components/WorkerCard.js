import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  card: {
    maxWidth: 300,
    marginBottom: 30
  },
  button: {
    marginTop: 20,
    sizeLarge: true,
    color: "primary"
  }
});

//Takes an object into the -worker- prop.
//Comes from the array returned from Model.List()
/*  worker: {  firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      aboutMe: "",
      availability: [{
          day:"",
          start:"",
          end:""
      }] }
*/
class WorkerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonData: { buttonName: "Book", buttonFunction: this.tempFunction }
    };
  }

  //Function passed to Book button (BasicButton component)
  tempFunction = () => {
    console.log("placeholder function");
  };

  readProfile = () =>
    this.props.history.push(
      `/profile/${this.props.worker.firstName}_${this.props.worker.lastName}`
    );

  render() {
    //
    // Needed for Material-UI styling
    const { classes } = this.props;

    return (
      <>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom component="h5" align="center">
              <Button>
                <Typography
                  variant="h6"
                  color="primary"
                  onClick={this.readProfile}
                >
                  {this.props.worker.firstName} {this.props.worker.lastName}
                </Typography>
              </Button>
            </Typography>
            <Typography
              variant="body2"
              component="p"
              color="textSecondary"
              align="center"
            >
              {this.props.worker.phoneNumber}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              color="textSecondary"
              align="center"
            >
              {this.props.worker.email}
            </Typography>

            <div align="center">
              <Button className={classes.button}>Make a Booking</Button>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}
WorkerCard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(withRouter(WorkerCard));
