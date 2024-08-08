const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

let gfsBucket;

const connectGridFS = () => {
  if (gfsBucket) return gfsBucket;

  gfsBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
  return gfsBucket;
};

const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const gfs = connectGridFS();
      const uploadStream = gfs.openUploadStream(file.originalname, {
        contentType: file.mimetype
      });

      uploadStream.on('finish', () => {
        if (uploadStream.id) {
          console.log('File upload completed:', uploadStream.id);
          resolve({ _id: uploadStream.id });
        } else {
          console.error('Failed to get file ID during upload');
          reject(new Error('Failed to get file ID during upload'));
        }
      });

      uploadStream.on('error', (err) => {
        console.error('Error during file upload:', err);
        reject(err);
      });

      uploadStream.end(file.buffer);
    } catch (error) {
      console.error('Error during file upload:', error);
      reject(error);
    }
  });
};

const getFile = (filename) => {
  return new Promise((resolve, reject) => {
    try {
      const gfs = connectGridFS();
      const downloadStream = gfs.openDownloadStreamByName(filename);

      const fileChunks = [];
      downloadStream.on('data', (chunk) => {
        fileChunks.push(chunk);
      });

      downloadStream.on('end', () => {
        const fileBuffer = Buffer.concat(fileChunks);
        resolve(fileBuffer);
      });

      downloadStream.on('error', (err) => {
        console.error('Error during file download:', err);
        reject(err);
      });
    } catch (error) {
      console.error('Error getting file:', error);
      reject(error);
    }
  });
};

module.exports = { uploadFile, getFile };
