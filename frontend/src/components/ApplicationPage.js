import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import jobApi from '../api/jobApi';
import NavigationHeader from './NavigationHeader';
import '../css/ApplicationPage.css';

function ApplicationPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({});
  const [coverLetter, setCoverLetter] = useState(null);
  const [resume, setResume] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await jobApi.getJobDetails(jobId);
        setJob(response.data);
      } catch (error) {
        setErrorMessage('Failed to load job details');
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleCoverLetterChange = (e) => {
    setCoverLetter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!resume) {
      setErrorMessage('Resume is required');
      return;
    }

    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('resume', resume);

    if (coverLetter) {
      formData.append('coverLetter', coverLetter);
    }

    try {
      await jobApi.submitApplication(formData);
      setSuccessMessage('Application submitted successfully!');
      setTimeout(() => navigate('/navigation'), 2000); // Redirect after 2 seconds
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to submit application');
    }
  };

  return (
    <>
      <NavigationHeader />
      <Container className="application-container mt-5">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className="text-center mb-4">Job Details</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Company:</strong> {job.companyName}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Requirements:</strong> {job.description}</p>
            <p><strong>Salary:</strong> ${job.salaryRange}</p>
            <p><strong>Job Type:</strong> {job.type}</p>
            <p><strong>Skills:</strong> {job.requiredSkills}</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formResume">
                <Form.Label>Resume *</Form.Label>
                <Form.Control
                  type="file"
                  accept=".doc,.docx,.pdf"
                  onChange={handleResumeChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCoverLetter">
                <Form.Label>Cover Letter (Optional)</Form.Label>
                <Form.Control
                  type="file"
                  accept=".doc,.docx,.pdf"
                  onChange={handleCoverLetterChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">Submit Application</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ApplicationPage;
