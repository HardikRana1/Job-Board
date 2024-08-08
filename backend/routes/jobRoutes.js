// routes/jobRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getJobs, getJobDetails, submitApplication,appliedJobs } = require('../controllers/jobController');
const router = express.Router();



router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobDetails);
router.post('/jobs/:id/apply',protect,
     submitApplication);
router.get('/applied-jobs',protect, appliedJobs);
module.exports = router;
