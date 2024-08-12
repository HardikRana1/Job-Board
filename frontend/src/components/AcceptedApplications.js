import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Link, Container, Grid } from '@mui/material';
import jobApplicationsAPI from '../api/jobApplications';
import Header from './Header';
import axios from 'axios';

const AcceptedApplicationPage = () => {
  const [acceptedApplications, setAcceptedApplications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    jobApplicationsAPI.getAllJobApplications(token).then((applications) => {
      console.log('application');
      console.log(applications);
      setAcceptedApplications(applications.filter(app => app.status !== '"Rejected"'));
    });
  }, []);

  const decideApplication = async (application, status) => {
    const token = localStorage.getItem('token');
    const { _id: id } = application;

    try {
        const response = await jobApplicationsAPI.decideApplication(token, id, status);
        const updatedApplication = response;
        console.log(updatedApplication);
        setAcceptedApplications((current) => {
            return current.map(app => app._id === id ? { ...app, status: updatedApplication.status } : app);
        });

    } catch (error) {
        console.error('Failed to update application status:', error);
    }
};


  const deleteApplication = async (application) => {
    const token = localStorage.getItem('token');
    await jobApplicationsAPI.deleteJobApplication(token, application._id);

    setAcceptedApplications((current) => {
      return current.filter(app => app._id !== application._id);
    });
  };
  const handleDownload = async (fileId, fileName) => {
    const token = localStorage.getItem('token');
    console.log(fileId);
    try {
      const response = await axios.get(`https://job-board-backend-59cu.onrender.com/api/jobApplications/files/${fileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Important for handling binary data
      });

      // Create a URL for the blob and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // or extract from response.headers['content-disposition']
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  };
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Applications
        </Typography>
        <Grid container spacing={3}>
          {acceptedApplications.map((application, index) => (
            <Grid item xs={12} key={index}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6">{application.applicantName}</Typography>
                <Typography>Job Title: {application.jobId.title}</Typography>
                <Typography>Company: {application.jobId.companyName}</Typography>
                <Typography>Application Date: {application.appliedDate}</Typography>
                <Typography>Status: {application.status}</Typography>
                <Typography>Email: {application.applicantEmail}</Typography>
                <Typography>
                  Resume: <Link component="button" onClick={() => handleDownload(application.resumeId, application.applicantName+'.pdf')}>Download</Link>
                </Typography>
                {application.coverLetter && (
                  <Typography>
                    Cover Letter: <Link component="button" onClick={() => handleDownload(application.coverLetter, 'coverLetter.pdf')}>Download</Link>
                  </Typography>
                )}
                <Box sx={{ mt: 2 }}>
                  {application.status === 'Pending' ? (
                    <>
                      <Button variant="contained" color="success" sx={{ mr: 1 }} onClick={() => decideApplication(application, 'Accepted')}>
                        Accept
                      </Button>
                      <Button variant="contained" color="error" onClick={() => decideApplication(application, 'Rejected')}>
                        Reject
                      </Button>
                    </>
                  ) : (
                    <div style={{ display: 'flex', height: '3rem', alignItems: 'center' }}>
                      <Typography variant="body1" color={application.status === 'Accepted' ? 'green' : 'error'}>
                        Status: {application.status}
                      </Typography>
                      <Button style={{ marginLeft: '1rem' }} onClick={() => deleteApplication(application)}>
                        Delete
                      </Button>
                    </div>
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default AcceptedApplicationPage;
