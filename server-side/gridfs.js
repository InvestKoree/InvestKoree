// import mongoose from 'mongoose';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import { GridFSBucket } from 'mongodb';
// import connectDB from './config/db.js'; // Import the connectDB function

// // Connect to MongoDB
// connectDB();

// // MongoDB connection instance
// const conn = mongoose.connection;

// // Initialize GridFSBucket
// let gfsBucket;

// // Wait until MongoDB connection is ready
// conn.on('connected', () => {
//   gfsBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
//   console.log('GridFSBucket initialized!');
// });

// conn.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });


// // Create storage engine for multer-gridfs-storage
// const storage = new GridFsStorage({
//   url: 'mongodb://admin:Saifinvestkoree2024@194.238.16.43:27017/investKoreeDB?authSource=admin',
//   file: (req, file) => {
  
//     const fileTypes = [
//       'image/jpeg',
//       'image/png',
//       'video/mp4',
//       'image/jpg',
//       'application/pdf', // PDF files
//       'application/msword', // .doc files
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx files
//       'application/vnd.ms-excel', // .xls files
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx files
//       'application/vnd.ms-powerpoint', // .ppt files
//       'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx files
//       'text/plain', // .txt files
//       'application/zip', // .zip files
//       'application/x-rar-compressed', // .rar files
//       // Add more MIME types as needed
//     ];

//     if (!fileTypes.includes(file.mimetype)) {
//       return `${file.originalname}`;  // Reject the file if the type is not allowed
//     }

//     return {
//       bucketName: 'uploads',
//       filename: file.originalname, // GridFS bucket name
//       metadata: { uploadedBy: req.user?.id || 'unknown' }, 
//     };
//   },
// });

// // Export storage and gfsBucket
// export { storage, gfsBucket };