import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import logo from '../assets/Login.jpeg'; 
import { useNavigate } from 'react-router-dom';
import userApi from '../api/userAPi';
import Header from './Header'; 
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const userData = { email, password };
      await userApi.login(userData);
      setSuccessMessage('Login successful! Redirecting to home page...');
      setTimeout(() => {
        navigate('/');
      }, 3000);
      console.log('Login successfully');
    } catch (error) {
      setErrorMessage('Login failed. Please check your email and password.');
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <Container className="login-container mt-5">
        <Row className="align-items-center">
          <Col md={6} className="d-none d-md-block">
            <img src={logo} alt="Logo" className="img-fluid larger-logo" />
          </Col>
          <Col md={6}>
            <h2 className="text-center mb-4">Login</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">Login</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginPage;
