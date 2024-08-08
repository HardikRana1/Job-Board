import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import jobApi from '../api/jobApi';
import NavigationHeader from './NavigationHeader';
import '../css/NavigationPage.css';

function NavigationPage() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobApi.getJobs();
        setJobs(response.data);
      } catch (error) {
        console.error('Failed to load jobs', error);
      }
    };

    const fetchAppliedJobs = async () => {
      try {
        const response = await jobApi.getAppliedJobs(); // You will need to implement this API call
        setAppliedJobs(response.data);
      } catch (error) {
        console.error('Failed to load applied jobs', error);
      }
    };

    fetchJobs();
    fetchAppliedJobs();
  }, []);

  const isJobApplied = (jobId) => {
    return appliedJobs.some((appliedJob) => appliedJob.jobId === jobId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  const filteredJobs = jobs.filter((job) => {
    const title = job.title ? job.title.toLowerCase() : '';
    const company = job.company ? job.company.toLowerCase() : '';
    const location = job.location ? job.location.toLowerCase() : '';
    const skills = job.skills ? job.skills.toLowerCase() : '';
    const term = searchTerm.toLowerCase();

    return title.includes(term) || company.includes(term) || location.includes(term) || skills.includes(term);
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <>
      <NavigationHeader />
      <Container className="navigation-container mt-5">
        <h2 className="text-center mb-4">Job Listings</h2>
        <InputGroup className="mb-3 search-input-group">
          <Form.Control
            type="text"
            placeholder="Search jobs"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>
        <Row>
          {currentJobs.map((job) => (
            <Col key={job._id} md={12} className="mb-4">
              <Card className="job-card">
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Text>
                    <strong>Company:</strong> {job.company}<br />
                    <strong>Location:</strong> {job.location}<br />
                    <strong>Requirements:</strong> {job.requirements}<br />
                    <strong>Salary:</strong> ${job.salary}<br />
                    <strong>Job Type:</strong> {job.jobType}<br />
                    <strong>Skills:</strong> {job.skills}
                  </Card.Text>
                  <Button
                    variant="primary"
                    href={`/job/${job._id}`}
                    disabled={isJobApplied(job._id)}
                  >
                    {isJobApplied(job._id) ? 'Already Applied' : 'View Details'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="secondary"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="mx-3 align-self-center">{`Page ${currentPage} of ${totalPages}`}</span>
          <Button
            variant="secondary"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </Container>
    </>
  );
}

export default NavigationPage;
