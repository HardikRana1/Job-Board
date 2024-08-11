import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper, Container, Snackbar, Alert } from '@mui/material';

import jobPostsAPI from '../api/jobApi';
import { useNavigate } from 'react-router-dom';

import Header from './Header';


const CreateJobPage = () => {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [jobCreated, setJobCreated] = useState(false)


  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    companyName: '',
    location: '',
    type: '',
    salaryRange: '',
    applicationDeadline: '',
    contactEmail: '',
    requiredSkills: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(job);
    setOpenSnackbar(true);
  };
 
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    console.log(jobData);
  }, [jobData]) 


  const changeValues = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  }

  const submitDetails = async () => {
    const token = localStorage.getItem('token');
    const response = await jobPostsAPI.createJobPost(token, jobData);

    if (response) {
        setJobCreated(true);
    };
  };

  useEffect(() => {
    if (jobCreated) {
      setTimeout(() => {
        navigate('/employer-dashboard');
      }, 3000);
    };
  }, [jobCreated])

  return (
    <>
    <Header />
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create Job
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField 
            label="Job Title" 
            name="title" 
            required fullWidth 
            onChange={changeValues}
          />

          <TextField
            label="Job Description"
            name="description"  
            multiline
            rows={4}
            required
            fullWidth
            onChange={changeValues}
          />

          <TextField label="Company Name" name="companyName"  required fullWidth onChange={changeValues} />
          <TextField label="Location" name="location" required fullWidth onChange={changeValues} />
          <TextField label="Job Type" name="type" required fullWidth onChange={changeValues} />
          <TextField label="Salary Range" name="salaryRange" required fullWidth onChange={changeValues} />
          <TextField
            onChange={(e) => setJobData((current) => {
              const date = new Date(e.target.value);
              const timestamp = date.getTime();

              return {
                ...current,
                applicationDeadline: timestamp
              }
            })}
            label="Application Deadline"
            name="applicationDeadline"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
            required
            fullWidth
          />

          <TextField label="Contact Email" name="contactEmail" type="email" fullWidth onChange={changeValues} />
          
          <TextField
            label="Required Skills"
            name="requiredSkills"
            multiline
            rows={4}
            required
            fullWidth
            onChange={changeValues}
          />

          <Button type="submit" variant="contained" color="primary" size="large" onClick={submitDetails}>
            Create Job
          </Button>
        </Box>
      </Paper>
        
      {
        jobCreated &&
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Job created successfully! Redirecting to dashboard...
          </Alert>
        </Snackbar>
      }



    </Container>
    </>
  );
};

export default CreateJobPage;