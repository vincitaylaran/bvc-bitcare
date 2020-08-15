import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onClick = e =>
    e.target.value === "client"
      ? this.props.history.push("/signup/client")
      : this.props.history.push("/signup/service_worker");

  render() {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <h1>For Clients</h1>
              <Button value="client" onClick={this.onClick}>
                Client
              </Button>
            </Col>
            <Col>
              <h1>For Service Workers</h1>
              <Button value="worker" onClick={this.onClick}>
                Service Worker
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default SignUp;
