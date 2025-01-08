import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';
import { GridFSBucket } from 'mongodb';
import connectDB from './config/db.js';
import sharp from 'sharp';  // For image processing
import ffmpeg from 'fluent-ffmpeg';  // For video processing
import fs from 'fs';  // To handle temporary file system

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
  file: (req, file) => {
    // Accept all file types
    const fileTypes = [
      'image/jpeg',
      'image/png',
      'video/mp4',
      'image/jpg',
      // Add more file types as needed
    ];

    if (!fileTypes.includes(file.mimetype)) {
      return reject(new Error('Invalid file type')); // Reject with an error
    }
    return new Promise((resolve, reject) => {
      // Process images
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        const outputFilename = file.originalname.split('.')[0] + '.webp'; // Convert to webp format
        const tempPath = './uploads/temp/' + outputFilename; // Temporary path for processing

        // Convert image to WebP format
        const chunks = [];
        file.stream.on('data', (chunk) => {
          chunks.push(chunk); // Collect chunks
        });
        
        file.stream.on('end', () => {
          const buffer = Buffer.concat(chunks); // Combine chunks into a single buffer
        
          sharp(buffer) // Process the buffer
            .webp({ quality: 80 })
            .toFile(tempPath, (err, info) => {
              if (err) {
                return reject(err);
              }
        
              // Resolve after processing
              resolve({
                bucketName: 'uploads',
                filename: outputFilename,
                metadata: { originalname: file.originalname },
              });
        
              fs.unlink(tempPath, (err) => {
                if (err) console.error('Error deleting temp file', err);
              });
            });
        });
        
      } else if (file.mimetype === 'video/mp4') {
        const outputFilename = file.originalname.split('.')[0] + '.webm'; // Convert to .webm
        const tempPath = './uploads/temp/' + outputFilename; // Temporary path for processing

        // Convert video to a compressed format using ffmpeg
        const inputStream = file.stream;

        ffmpeg(inputStream) 
          .output(tempPath)
          .outputOptions('-vcodec', 'libvpx-vp9') // Compress video
          .outputOptions('-b:v', '1M')
          .outputOptions('-preset', 'ultrafast')
          .on('end', () => {
            resolve({
              bucketName: 'uploads',
              filename: outputFilename,
              metadata: { originalname: file.originalname },
            });
        
            fs.unlink(tempPath, (err) => {
              if (err) console.error('Error deleting temp file', err);
            });
          })
          .on('error', (err) => {
            reject(err);
          })
          .run();
        
      }
    });
  },
});

// Export storage and gfsBucket
export { storage, gfsBucket };
