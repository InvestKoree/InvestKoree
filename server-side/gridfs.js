import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import { GridFsStorage } from 'multer-gridfs-storage';
import connectDB from './config/db.js'; // Import the connectDB function

// Connect to MongoDB
connectDB(); // Ensure the database connection is established

// Create a MongoDB connection
const conn = mongoose.connection; // Use the existing connection

// Initialize GridFS
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Set the collection name
});

// Create storage engine
const storage = new GridFsStorage({
  url: 'mongodb://admin:Saifinvestkoree2024@194.238.16.43:27017/investKoreeDB?authSource=admin', // Use your MongoDB URI
  file: (req, file) => {
    const fileTypes = ['image/jpeg', 'image/png', 'video/mp4','image/jpg']; // Allowed file types
    if (!fileTypes.includes(file.mimetype)) {
      return null; // Reject the file
    }
    return {
      filename: file.originalname,
      bucketName: 'uploads',
    };
  },
});

export { storage, gfs };