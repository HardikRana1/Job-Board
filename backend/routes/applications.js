const { Router } = require('express');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { applyForJob, getApplications, getApplicationById, updateApplication, deleteApplication, acceptOrRejectApplication } = require('../controllers/applicationController');

const router = Router();

// Initialize GridFS
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads'); // The name of the collection where files are stored
});
// Route to get and download a file (resume or cover letter)
router.get('/files/:id', async (req, res) => {
    try {
        const file = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
        
        if (!file || file.length === 0) {
            return res.status(404).json({ err: 'No file exists' });
        }

        // Set response headers and pipe the file stream to the response
        const readstream = gfs.createReadStream(file.filename);
        res.set('Content-Type', file.contentType);
        readstream.pipe(res);
    } catch (err) {
        res.status(500).json({ err: 'Error retrieving file' });
    }
});
// Application routes
router.get('/', getApplications);
router.get('/:id', getApplicationById);
router.post('/apply/:id', applyForJob);
router.put('/update/:id', updateApplication);
router.delete('/delete/:id', deleteApplication);
router.put('/status/:id', acceptOrRejectApplication);



module.exports = router;
