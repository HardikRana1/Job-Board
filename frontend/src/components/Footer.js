import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/Footer.css'; // Assuming you will add styles for the footer here

const Footer = () => {
  return (
    <footer className="footer mt-5 py-3 bg-light">
      <Container>
        <Row>
          <Col md={2}>
            <Link to="/about">About Us</Link>
          </Col>
          <Col md={2}>
            <Link to="/contact">Contact Us</Link>
          </Col>
          <Col md={2}>
            <Link to="/faqs">FAQs</Link>
          </Col>
          <Col md={2}>
            <Link to="/terms">Terms and Conditions</Link>
          </Col>
          <Col md={2}>
            <Link to="/report">Report a Problem</Link>
          </Col>
          <Col md={2}>
            <Link to="/privacy">Privacy Policy</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
