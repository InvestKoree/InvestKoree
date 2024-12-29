import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';
import { GridFSBucket } from 'mongodb';
import connectDB from './config/db.js'; // Import the connectDB function

// Connect to MongoDB
connectDB();

// MongoDB connection instance
const conn = mongoose.connection;

// Initialize GridFSBucket
let gfsBucket;

// Wait until MongoDB connection is ready
conn.once('open', () => {
  // Use GridFSBucket for streaming files
  gfsBucket = new GridFSBucket(conn.db, {
    bucketName: 'uploads', // Match the collection name
  });

  console.log('GridFSBucket initialized!');
});

// Create storage engine for multer-gridfs-storage
const storage = new GridFsStorage({
  url: 'mongodb://admin:Saifinvestkoree2024@194.238.16.43:27017/investKoreeDB?authSource=admin',
  file: (req, file) => {
    const fileTypes = ['image/jpeg', 'image/png', 'video/mp4', 'image/jpg']; // Allowed types
    if (!fileTypes.includes(file.mimetype)) {
      return null; // Reject the file
    }
    return {
      bucketName: 'uploads', // GridFS bucket name
      metadata: { originalname: file.originalname }, // Optional metadata
    };
  },
});

// Export storage and gfsBucket
export { storage, gfsBucket };
