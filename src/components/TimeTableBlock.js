import React, { Component } from "react";
import "../TheBlock.css";

import Typography from "@material-ui/core/Typography";

export class TimeTableBlock extends Component {
  adjust = () => {
    let temp = "" + this.props.ending;
    let nT = temp.split(":");
    let rNT = parseInt(nT[0]);
    if (parseInt(nT[1]) >= 30) rNT += 1;
    return rNT;
  };

  //Used to create classNames for an element
  //The classNames are used for styling (positioning on grid)
  classification = () => {
    let cNDay = this.props.day + "Zone";

    let temp = "" + this.props.beginning;
    let cNStart = "StartTime" + temp.split(":")[0];

    let cNEnd = "EndTime" + this.adjust();

    return "chosenBlock " + cNDay + " " + cNStart + " " + cNEnd;
  };

  //Shortens time by cutting off seconds.
  displayTimesText = () => {
    let firstTime = this.props.beginning;
    firstTime = firstTime.split(":");
    firstTime = firstTime[0] + ":" + firstTime[1];

    let secondTime = this.props.ending;
    secondTime = secondTime.split(":");
    secondTime = secondTime[0] + ":" + secondTime[1];

    return firstTime + "-" + secondTime;
  };

  render() {
    return (
      <div className={this.classification()}>
        {/* <p className="fitting"> */}
        <Typography variant="h6">{this.displayTimesText()}</Typography>
        {/* </p> */}
      </div>
    );
  }
}
