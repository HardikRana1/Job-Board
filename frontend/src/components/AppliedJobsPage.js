import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Container, Grid } from '@mui/material';

import jobApplicationsAPI from '../api/jobApplications';
import Header from './Header';
 
const AppliedJobPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    jobApplicationsAPI.getAllJobApplications(token).then((jobs) => {
      setAppliedJobs(jobs);
      console.log(jobs);
    });
  }, []);

  return (
    <>
    <Header/>
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Applied Jobs
      </Typography>
      <Grid container spacing={3}>
        {appliedJobs.map((application, index) => (
          <Grid item xs={12} key={index}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">{application.jobId.title}</Typography>
              <Typography>Status: {application.status}</Typography>
              <Typography>Date Applied: {application.appliedDate}</Typography>
              <Typography>Company: {application.jobId.companyName}</Typography>
              <Typography>Location: {application.jobId.location}</Typography>
              <Typography>Description: {application.jobId.description}</Typography>
            </Paper>
          </Grid>
        ))} 
      </Grid>
    </Container>
    </>
  );
};

export default AppliedJobPage;
 
