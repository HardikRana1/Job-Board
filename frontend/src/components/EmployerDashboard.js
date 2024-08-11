import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import jobAPI from '../api/jobApi';
import Header from './Header';

import { Link } from 'react-router-dom';

const EmployerDashboard = () => {

    const [jobsList, setJobsList] = useState([]);


    useEffect(() => {
        jobAPI.getAllJobPosts(localStorage.getItem('token'))
            .then((data) => {
                setJobsList(data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    return (
        <>
        <Header />
        <Container className="mt-5">
        <Col>
            <h2>Welcome to the Employer Dashboard</h2>
            <p>
                <Link to='/create-job'>Create</Link> & Manage jobs
            </p>
        </Col>


        <Container style={{ marginTop: '2rem' }}>
            <Col>
                <h3>Your Job Posts</h3>
            </Col>
        </Container>
            <Col>
                {
                    jobsList.map((job) => (
                        <Row key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
                            <Col>
                                <h4>{job.title}</h4>
                                <p>{job.description}</p>
                                <ul>
                                    <li>Location: {job.location}</li>
                                    <li>Deadline: {new Date(job.applicationDeadline).toString()}</li>
                                    <li>Salary Range: {job.salaryRange}</li>
                                    <li>Skills: {job.requiredSkills}</li>
                                </ul>
                            </Col>
                        </Row>
                    ))
                }
            </Col>
        </Container>
        </>
    );
};

export default EmployerDashboard;