import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs'; 

const getJobs = async () => {
  return await axios.get(`${API_URL}/jobs`);
};

const getJobDetails = async (jobId) => {
  return await axios.get(`${API_URL}/jobs/${jobId}`);
};



const submitApplication = async (applicationData) => {
  const token = localStorage.getItem('token');
  return await axios.post(
    `${API_URL}/jobs/${applicationData.jobId}/apply`,
    applicationData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getAppliedJobs = async () => {
  const token = localStorage.getItem('token');
  return await axios.get(`${API_URL}/applied-jobs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default { getJobs, getJobDetails, submitApplication, getAppliedJobs };
