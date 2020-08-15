import React, { Component } from "react";
import { TimeTableBlock } from "./TimeTableBlock.js";
import "../TheBlock.css";

import Typography from "@material-ui/core/Typography";

//Takes an array of objects into the -times- prop.
//Comes from the Model.List() returned array[x].availability
/*
    times: [
        {   day: "Monday", 
            start: "00:00:00", 
            end: "00:00:00" 
        }
    ]
*/
export class TimeTable extends Component {
  displayTimeBlocks = () => {
    let availableTimeBlocks = null;

    if (this.props.times) {
      availableTimeBlocks = this.props.times.map((block, index) => {
        return (
          <TimeTableBlock
            day={block.day}
            beginning={block.start}
            ending={block.end}
            key={index}
          />
        );
      });
    }
    return availableTimeBlocks;
  };

  tableRowValues = () => {
    let rowValues = [];

    for (let i = 0; i <= 24; i++) {
      rowValues.push(
        <div className="timesBlock">
          <Typography variant="h5">{i}:00:00</Typography>
        </div>
      );
    }

    return rowValues;
  };

  tableColValues = () => {
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    const columns = days.map(day => (
      <div className="daysBlock">
        <Typography variant="h5">{day}</Typography>
      </div>
    ));

    return columns;
  };

  render() {
    return (
      <div className="timeTable">
        <div className="squareBlock"></div>
        {this.tableRowValues()}
        {/* <div className="timesBlock">00:00:00</div>
                <div className="timesBlock">01:00:00</div>
                <div className="timesBlock">02:00:00</div>
                <div className="timesBlock">03:00:00</div>
                <div className="timesBlock">04:00:00</div>
                <div className="timesBlock">05:00:00</div>
                <div className="timesBlock">06:00:00</div>
                <div className="timesBlock">07:00:00</div>
                <div className="timesBlock">08:00:00</div>
                <div className="timesBlock">09:00:00</div>
                <div className="timesBlock">10:00:00</div>
                <div className="timesBlock">11:00:00</div>
                <div className="timesBlock">12:00:00</div>
                <div className="timesBlock">13:00:00</div>
                <div className="timesBlock">14:00:00</div>
                <div className="timesBlock">15:00:00</div>
                <div className="timesBlock">16:00:00</div>
                <div className="timesBlock">17:00:00</div>
                <div className="timesBlock">18:00:00</div>
                <div className="timesBlock">19:00:00</div>
                <div className="timesBlock">20:00:00</div>
                <div className="timesBlock">21:00:00</div>
                <div className="timesBlock">22:00:00</div>
                <div className="timesBlock">23:00:00</div>
                <div className="timesBlock">24:00:00</div> */}

        {/* <div className="daysBlock">Monday</div>
        <div className="daysBlock">Tuesday</div>
        <div className="daysBlock">Wednesday</div>
        <div className="daysBlock">Thursday</div>
        <div className="daysBlock">Friday</div>
        <div className="daysBlock">Saturday</div>
        <div className="daysBlock">Sunday</div> */}
        {this.tableColValues()}
        {this.displayTimeBlocks()}
      </div>
    );
  }
}
