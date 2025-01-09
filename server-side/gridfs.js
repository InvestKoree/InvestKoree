import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';
import { GridFSBucket } from 'mongodb';
import connectDB from './config/db.js'; // Import the connectDB function
import sharp from 'sharp'; // For image processing
import stream from 'stream'; // For handling streams

// Connect to MongoDB
connectDB();

// MongoDB connection instance
const conn = mongoose.connection;

// Initialize GridFSBucket
let gfsBucket;

// Wait until MongoDB connection is ready
conn.on('connected', () => {
  gfsBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
  console.log('GridFSBucket initialized!');
});

conn.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Create storage engine for multer-gridfs-storage
const storage = new GridFsStorage({
  url: 'mongodb://admin:Saifinvestkoree2024@194.238.16.43:27017/investKoreeDB?authSource=admin',
  file: async (req, file) => {
    const fileTypes = [
      'image/jpeg',
      'image/png',
      'video/mp4',
      'image/jpg',
    ];

    if (!fileTypes.includes(file.mimetype)) {
      throw new Error('Invalid file type');
    }

    // Handle image conversion to WebP
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      const buffer = await new Promise((resolve, reject) => {
        const chunks = [];
        file.stream.on('data', (chunk) => chunks.push(chunk));
        file.stream.on('end', () => resolve(Buffer.concat(chunks)));
        file.stream.on('error', reject);
      });

      // Convert to WebP using sharp
      const webpBuffer = await sharp(buffer)
        .resize({ width: 800 }) // Resize if needed
        .toFormat('webp', { quality: 80 }) // Convert to WebP
        .toBuffer();

      return {
        bucketName: 'uploads',
        filename: `${file.originalname.split('.')[0]}.webp`, // Change the filename to .webp
        metadata: { uploadedBy: req.user?.id || 'unknown' },
        // Use a stream to upload the buffer directly
        stream: new stream.PassThrough().end(webpBuffer),
      };
    }

    // Handle video conversion to WebM
    if (file.mimetype === 'video/mp4') {
      return new Promise((resolve, reject) => {
        const outputFileName = `${file.originalname.split('.')[0]}.webm`;
        const outputStream = gfsBucket.openUploadStream(outputFileName);

        ffmpeg(file.stream)
          .toFormat('webm')
          .on('end', () => {
            resolve({
              bucketName: 'uploads',
              filename: outputFileName,
              metadata: { uploadedBy: req.user?.id || 'unknown' },
            });
          })
          .on('error', (err) => {
            reject(err);
          })
          .pipe(outputStream, { end: true });
      });
    }

    return {
      bucketName: 'uploads',
      filename: file.originalname,
      metadata: { uploadedBy: req.user?.id || 'unknown' },
    };
  },
});

// Export storage and gfsBucket
export { storage, gfsBucket };