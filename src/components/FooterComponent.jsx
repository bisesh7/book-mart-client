import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer-container">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              Your go-to platform for discovering and connecting with the world
              of books.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#discover">Discover</a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: info@mybookmarket.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <Container>
          <p>&copy; 2023 My Book Market. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
