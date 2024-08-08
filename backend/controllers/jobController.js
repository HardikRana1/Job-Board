const Job = require('../models/Job');
const Application = require('../models/application');
const multer = require('multer');
const { uploadFile } = require('../services/gridfsService');

// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('resume');

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load jobs' });
  }
};

const getJobDetails = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load job details' });
  }
};

const appliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load applied jobs' });
  }
};

const submitApplication = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to upload resume' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Resume is required' });
    }

    try {
      const { jobId, coverLetter } = req.body;

      const existingApplication = await Application.findOne({ jobId, userId: req.user.id });
      if (existingApplication) {
        return res.status(400).json({ message: 'You have already applied for this job' });
      }

      console.log('Resume file:', req.file);

      const resumeFile = await uploadFile(req.file);
      if (!resumeFile || !resumeFile._id) {
        throw new Error('Failed to upload resume file');
      }

      console.log('Resume file ID:', resumeFile._id);
      console.log('user ID:', req.user.id);

      const application = new Application({
        jobId,
        userId: req.user.id,
        coverLetter,
        resumeId: resumeFile._id,
        applicantName: req.user.name,
        applicantEmail: req.user.email
      });

      await application.save();
      res.status(201).json({ message: 'Application submitted successfully!' });
    } catch (error) {
      console.error('Error during application submission:', error);
      res.status(500).json({ message: 'Failed to submit application' });
    }
  });
};

module.exports = { getJobs, getJobDetails, submitApplication, appliedJobs };
