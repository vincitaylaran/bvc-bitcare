import React, { Component } from "react";

import AvailabilityTable from "./AvailabilityTable";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

//
// Needed for styling Material-UI components.
const styles = theme => ({
  card: {
    width: "100%"
  },
  select: {
    width: "75%",
    marginBottom: 15
  },
  inputTime: {
    width: "30%"
  },
  add: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  caption: {
    marginLeft: theme.spacing(1)
  }
});

class AvailabilityForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: "",
      start: "08:00:00",
      end: "10:00:00"
    };
  }

  getList = () => {
    if (this.props.list) {
      return this.props.list();
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClickDay = e => {
    this.setState({ day: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { day, start, end } = this.state;

    const isInvalid = start !== "" && end !== "" && day !== "";

    if (this.props.handleSubmit) {
      if (isInvalid) {
        this.props.handleSubmit([
          {
            day: day,
            start: start,
            end: end
          }
        ]);
      }
    } else if (this.props.onGetBlock) {
      const block = {
        day: this.state.day,
        start: this.state.start,
        end: this.state.end
      };

      this.props.onGetBlock(block);
    }
  };

  dayOptions = () => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    const options = days.map((item, index) => {
      return (
        <MenuItem name="day" value={item} key={index}>
          {item}
        </MenuItem>
      );
    });

    return (
      <Select labelId="label" id="select" onChange={this.onClickDay}>
        {options}
      </Select>
    );
  };

  render() {
    //
    // Needed for Material-UI styling
    const { classes } = this.props;

    return (
      <>
        <Card className={classes.card}>
          <CardContent>
            <Grid xs={6}>
              <FormControl className={classes.select}>
                <InputLabel id="demo-simple-select">Select a day</InputLabel>
                {this.dayOptions()}
              </FormControl>
            </Grid>
            <TextField
              label="From"
              name="start"
              onChange={this.onChange}
              className={classes.inputTime}
              type="time"
              value={this.state.start}
            />

            <TextField
              label="To"
              name="end"
              onChange={this.onChange}
              className={classes.inputTime}
              type="time"
              value={this.state.end}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.onSubmit}
              size="small"
              className={classes.add}
            >
              {this.props.buttonText}
            </Button>

            {// Renders a table if "true" was passed to the prop "includeTable".

            this.props.includeTable ? (
              <>
                <Typography
                  className={classes.caption}
                  variant="caption"
                  align="right"
                >
                  Click row to cancel.
                </Typography>
                <Form.Row>
                  <Col>
                    <AvailabilityTable
                      list={this.getList}
                      handleDelete={this.props.handleDelete}
                    />
                  </Col>
                </Form.Row>
              </>
            ) : (
              <br />
            )}
          </CardContent>
        </Card>
      </>
    );
  }
}

//
// Needed for Material-UI styling
AvailabilityForm.propTypes = {
  classes: PropTypes.object.isRequired
};

//
// Needed for Material-UI styling
export default withStyles(styles)(AvailabilityForm);
