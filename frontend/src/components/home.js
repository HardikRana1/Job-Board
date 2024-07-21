import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import logo from '../assets/Logo.jpeg'; 

function HomePage() {
  return (
    <Container fluid className="text-center mt-5">
      <Row>
        <Col>
          <img src={logo} alt="Logo" className="mb-4" style={{ width: '150px' }} />
          <h1>Welcome to the Job Board</h1>
          <p>Your gateway to finding the perfect job</p>
          <Button variant="primary" href="/login">Login</Button>
          <Button variant="secondary" href="/register" className="ms-2">Register</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
