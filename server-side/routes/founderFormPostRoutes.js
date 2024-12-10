// import express from 'express';
// import http from 'http'; // Import http module
// import { Server } from 'socket.io'; // Import socket.io
// import multer from 'multer';
// import { createFounderPost } from '../controllers/founderFormController.js';
// import { authToken } from '../utils/authMiddleware.js';
// import PendingPost from '../models/pendingPost.js';
// import FounderPost from '../models/founderFormPostModels.js';
// import Notification from '../models/notification.js';

// const app = express(); // Create an Express application
// const server = http.createServer(app); // Create HTTP server using Express app
// const io = new Server(server, {
//   cors: {
//     origin: ['http://localhost:3000', 'https://investkoree.onrender.com'], // Allow your frontend origins
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });



// const storage = multer.memoryStorage(); // Files are stored in memory as Buffer objects

// // Create the multer instance
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|gif|pdf|doc|txt|ppt/; // Allowed file types
//     const mimetype = filetypes.test(file.mimetype);
//     if (mimetype) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Error: File type not allowed!'));
//     }
//   }
// });

// // Multiple image fields and single file upload
// const cpUpload = upload.fields([
//   { name: "businessPicture", maxCount: 10 }, // multiple images
//   { name: "nidCopy", maxCount: 1 }, // single file
//   { name: "tinCopy", maxCount: 1 },
//   { name: "taxCopy", maxCount: 1 },
//   { name: "tradeLicense", maxCount: 1 },
//   { name: "bankStatement", maxCount: 1 },
//   { name: "securityFile", maxCount: 1 },
//   { name: "financialFile", maxCount: 1 },
// ]);

// // Define your routes here
// const router = express.Router();

// // Define the route for creating a founder post
// router.post("/pendingpost", authToken, cpUpload, (req, res, next) => {
//     console.log("Files in req.files:", req.files); // Files should now be Buffer objects
//     next();
// }, createFounderPost);

// router.get('/pending', async (req, res) => {
//   try {
//     const posts = await PendingPost.find();
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching posts: ' + error.message });
//   }
// });

// router.post('/accept', async (req, res) => {
//   const { postId, userId } = req.body; // Ensure userId is coming from the request body
//   try {
//     const pendingPost = await PendingPost.findById(postId);
//     if (!pendingPost) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     const newFounderPost = new FounderPost({
//       ...pendingPost.toObject(), // Spread the properties of pendingPost
//       userId: pendingPost.userId, // Explicitly set userId from pendingPost
//     });

//     await newFounderPost.save();
//     await PendingPost.findByIdAndDelete(postId);

//     // Create a notification for the user
//     const notification = new Notification({
//       userId: userId,
//       message: "Your post has been accepted.",
//     });
//     await notification.save();

//     // Emit a notification event to the specific user
//     io.to(userId).emit('notification', notification);

//     res.status(200).json({ message: 'Post accepted and moved to founder posts' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error accepting post: ' + error.message });
//   }
// });
// io.on('error', (error) => {
//   console.error('Socket.IO error:', error);
// });
// process.on('uncaughtException', (error) => {
//   console.error('Uncaught Exception:', error);
// });

// process.on('unhandledRejection', (reason, promise) => {
//   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
// });

// // Define the route for denying a pending post
// router.post('/deny', async (req, res) => {
//   const { postId, userId } = req.body;
//   try {
//     const pendingPost = await PendingPost.findById(postId);
//     if (!pendingPost) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     const notification = new Notification({
//       userId: userId,
//       message: "Your post has been denied.",
//     });
//     await notification.save();

//     await PendingPost.findByIdAndDelete(postId);

//     // Emit a notification event to the specific user
//     io.to(userId).emit('notification', notification);

//     res.status(200).json({ message: 'Post denied and removed from pending posts' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error denying post: ' + error.message });
//   }
// });

// router.get('/notifications/:userId', async (req, res) => {
//   try {
//     const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     res.status(200).json(notifications);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching notifications: ' + error.message });
//   }
// });

// // Socket.IO connection handling
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Optionally, you can join the user to a room based on userId
//   socket.on('join', (userId) => {
//     socket.join(userId);
//     console.log(`User  ${userId} joined the room`);
//   });

//   socket.on('disconnect', () => {
//     console.log('User  disconnected:', socket.id);
//   });
// });

// // Use the router
// app.use('/api', router);

// // Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// export default router;