import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';
import { GridFSBucket } from 'mongodb';
import connectDB from './config/db.js';
import sharp from 'sharp'; // For image processing
import ffmpeg from 'fluent-ffmpeg'; // For video processing
import stream from 'stream'; // For handling streams

// Connect to MongoDB
connectDB();

// MongoDB connection instance
const conn = mongoose.connection;

// Initialize GridFSBucket
let gfsBucket;

// Wait until MongoDB connection is ready
conn.once('open', () => {
  gfsBucket = new GridFSBucket(conn.db, {
    bucketName: 'uploads', // Match the collection name
  });
  console.log('GridFSBucket initialized!');
});

// Create storage engine for multer-gridfs-storage
const storage = new GridFsStorage({
  url: 'mongodb://admin:Saifinvestkoree2024@194.238.16.43:27017/investKoreeDB?authSource=admin',
  file: async (req, file) => {
    const fileTypes = ['image/jpeg', 'image/png', 'video/mp4', 'image/jpg'];

    if (!fileTypes.includes(file.mimetype)) {
      throw new Error('Invalid file type');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = gfsBucket.openUploadStream(file.originalname);
      const passThrough = new stream.PassThrough();

      // Process Images
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        const uploadStream = gfsBucket.openUploadStream(file.originalname);
        const passThrough = new stream.PassThrough();
      
        sharp(file.stream)
          .webp({ quality: 80 })
          .pipe(passThrough)
          .on('error', (err) => {
            console.error('Error processing image:', err);
            reject(err);
          });
      
        passThrough
          .pipe(uploadStream)
          .on('finish', () => {
            resolve({
              bucketName: 'uploads',
              filename: uploadStream.filename,
              id: uploadStream.id, // Capture the id here
            });
          })
          .on('error', (err) => {
            console.error('Error uploading image:', err);
            reject(err);
          });
      }

      // Process Videos
      if (file.mimetype === 'video/mp4') {
        ffmpeg(file.stream)
          .format('webm')
          .videoCodec('libvpx-vp9') // VP9 codec for compression
          .outputOptions('-b:v', '1M') // Bitrate
          .outputOptions('-preset', 'ultrafast') // Faster processing
          .pipe(uploadStream)
          .on('finish', () => {
            resolve({
              bucketName: 'uploads',
              filename: uploadStream.filename,
              id: uploadStream.id, // Capture the id here
            });
          })
          .on('error', reject);
      }
    });
  },
});

// Export storage and gfsBucket
export { storage, gfsBucket };