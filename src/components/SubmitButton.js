import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

class SubmitButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Button
          sm
          lg="1"
          className="mb-3 mt-5"
          as={Col}
          variant="primary"
          type="submit"
          onClick={this.props.onClick}
        >
          {this.props.text}
        </Button>
      </>
    );
  }
}

export default SubmitButton;
