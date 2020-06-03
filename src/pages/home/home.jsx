import React from "react";
import { Jumbotron, Container } from "reactstrap";
function home(props) {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Some content !</h1>
          <p className="lead">This is a web app for admin.</p>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default home;
