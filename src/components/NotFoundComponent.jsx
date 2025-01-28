import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/NotFound.scss"; // Import the CSS file

const NotFound = () => {
  return (
    <div className="not-found-container">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="text-center">
            <h1 className="display-1">404</h1>
            <h2>Page Not Found</h2>
            <p className="lead">Oops! Looks like you're lost.</p>
            <Link to="/">
              <Button variant="primary">Go Home</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFound;
