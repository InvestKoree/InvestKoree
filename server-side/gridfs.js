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
    // Acceptable file types
    const fileTypes = ['image/jpeg', 'image/png', 'video/mp4', 'image/jpg'];

    // Reject invalid file types
    if (!fileTypes.includes(file.mimetype)) {
      throw new Error('Invalid file type');
    }

    // Process Images
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      return new Promise((resolve, reject) => {
        const chunks = [];
        file.stream.on('data', (chunk) => {
          chunks.push(chunk);
        });

        file.stream.on('end', async () => {
          try {
            const buffer = Buffer.concat(chunks); // Combine chunks into a buffer

            // Process image with Sharp and convert to WebP
            const processedImageBuffer = await sharp(buffer)
              .webp({ quality: 80 })
              .toBuffer(); // Convert directly to buffer

            const readableStream = new stream.PassThrough();
            readableStream.end(processedImageBuffer); // Create a readable stream

            // Upload directly to GridFS
            readableStream.pipe(
              gfsBucket.openUploadStream(file.originalname.split('.')[0] + '.webp', {
                contentType: 'image/webp',
                metadata: { originalname: file.originalname },
              })
            );

            resolve({
              bucketName: 'uploads',
              filename: file.originalname.split('.')[0] + '.webp',
              metadata: { originalname: file.originalname },
            });
          } catch (err) {
            reject(err);
          }
        });
      });
    }

    // Process Videos
    if (file.mimetype === 'video/mp4') {
      return new Promise((resolve, reject) => {
        const passThrough = new stream.PassThrough();

        // Use ffmpeg to process the video directly
        ffmpeg(file.stream)
          .format('webm') // Convert to webm format
          .videoCodec('libvpx-vp9') // VP9 codec for compression
          .audioCodec('libvorbis') // Audio codec
          .outputOptions('-b:v', '1M') // Bitrate
          .outputOptions('-preset', 'ultrafast') // Faster processing
          .pipe(passThrough) // Stream output directly to memory
          .on('end', () => {
            // Upload directly to GridFS
            passThrough.pipe(
              gfsBucket.openUploadStream(file.originalname.split('.')[0] + '.webm', {
                contentType: 'video/webm',
                metadata: { originalname: file.originalname },
              })
            );

            resolve({
              bucketName: 'uploads',
              filename: file.originalname.split('.')[0] + '.webm',
              metadata: { originalname: file.originalname },
            });
          })
          .on('error', (err) => {
            reject(err);
          });
      });
    }
  },
});

// Export storage and gfsBucket
export { storage, gfsBucket };
