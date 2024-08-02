// FAQs.js
import React from 'react';
import { Container } from 'react-bootstrap';

const FAQs = () => {
  return (
    <Container className="mt-5">
      <h1>FAQs</h1>
      <h3>What is our Job Portal?</h3>
      <p>
        Our Job Portal is a platform designed to connect job seekers with employers looking to fill job vacancies. We provide a seamless experience for both job seekers and employers.
      </p>
      <h3>How do I create an account?</h3>
      <p>
        You can create an account by clicking on the "Register" button on the top right corner of the homepage and filling in the required information.
      </p>
      <h3>How do I apply for a job?</h3>
      <p>
        Once you have created an account, you can search for jobs and apply directly through the job listings by clicking on the "Apply" button.
      </p>
      <h3>How do I post a job?</h3>
      <p>
        Employers can post a job by logging into their account and clicking on the "Post a Job" button. Fill in the job details and submit the listing for review.
      </p>
    </Container>
  );
};

export default FAQs;
