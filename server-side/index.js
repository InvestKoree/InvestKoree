import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
// import multer from 'multer';
// import { storage,gfsBucket } from './gridfs.js'; 
import helmet from 'helmet'; // Import helmet
import connectDB from './config/db.js';
import signupRoute from '../server-side/routes/signup.js';
import loginRoute from '../server-side/routes/login.js';
import userSpecificRoute from './routes/userRoutes.js';
import userPostsRoute from './routes/userPostsRoute.js';
import founderPostRoute from './routes/founderPostRoute.js';
import investmentRoute from './routes/investmentRoutes.js';
import allPostsRoute from './routes/allPostRoute.js';
// import { createFounderPost } from './controllers/founderFormController.js';
import { authToken } from './utils/authMiddleware.js';
import FounderPost from './models/founderFormPostModels.js';
import Notification from './models/notification.js';
import CheckDuplicate from './routes/checkDuplicate.js';
// import mongoose from 'mongoose';
import search from './routes/search.js';
import watchlist from './routes/watchlistRoute.js';
import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import cloudinary from './cloudinaryConfig.js'; 
import PendingPost from './models/pendingPost.js';
import FounderPending from './models/founderpending.js';
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();


// Initialize App
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://investkoree.onrender.com', 'http://localhost:5173', 'https://investkoree-c8l8.onrender.com', 'https://investkoree.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
});

// Connect to Database
connectDB();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Serve the robots.txt file
// app.get('/robots.txt', (req, res) => {
//     res.type('text/plain');
//     res.sendFile(path.join(__dirname, 'robots.txt'));
// });

// app.get('/sitemap.xml', (req, res) => {
//   res.sendFile(path.join(__dirname, 'sitemap.xml'));
// });

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const cspOptions = {
  directives: {
    defaultSrc: ["'self'"],
    connectSrc: [
      "'self'",
      "http://localhost:3000",
      "https://investkoree.onrender.com",
      "http://localhost:5173",
      "https://investkoree.com",
      "https://www.investkoree.com",
    ],
    scriptSrc: ["'self'", "'unsafe-eval'"], // Temporarily allow 'unsafe-eval'
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
  },
};

app.use(helmet.contentSecurityPolicy(cspOptions));


// // Multer Setup
// const upload = multer({ storage });

// Create Founder Post with Pending Approval

const upload = multer({ storage: multer.memoryStorage() }); 
// Routes
app.use('/searchpost', search);
app.use('/users', signupRoute);
app.use('/api',CheckDuplicate)
app.use('/founderpost', founderPostRoute);
app.use('/users/auth', loginRoute);
app.use('/api', userSpecificRoute);
app.use('/investments', investmentRoute);
app.use('/api', userPostsRoute);
app.use('/api', allPostsRoute);
app.use('/watchlist', watchlist);
app.use('/uploads', express.static('uploads'));
// Real-time Socket.IO Setup
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Create Founder Post with Pending Approval
app.post('/adminpost/pendingpost',authToken, upload.fields([
  { name: 'businessPicture', maxCount: 10 },
  { name: 'video', maxCount: 1 },
  { name: 'nidCopy', maxCount: 1 },
  { name: 'tinCopy', maxCount: 1 },
  { name: 'taxCopy', maxCount: 1 },
  { name: 'tradeLicense', maxCount: 1 },
  { name: 'bankStatement', maxCount: 1 },
  { name: 'securityFile', maxCount: 1 },
  { name: 'financialFile', maxCount: 1 },
  
]),async (req, res) => {
  console.log('Request Body:', req.body); // Log the request body to debug

  try {
    const userId = req.user?.id; // Retrieve user ID from authenticated request
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // Destructure fields from the request body
    const {
      businessName, email, address, phone, businessCategory, businessSector,
      investmentDuration, securityOption, otherSecurityOption, documentationOption,
      otherDocumentationOption, assets, revenue, fundingAmount, fundingHelp,
      returndate, projectedROI, returnPlan, businessSafety, additionalComments,
      description, businessPicture, nidCopy,  tinCopy, taxCopy, tradeLicense,
       bankStatement, securityFile, financialFile, video,bkash
    } = req.body;

    // Validate that required fields are provided
 

    // Create the new post object
    const newPost = new PendingPost({
      userId,
      businessName,
      description,
      email,
      address,
      phone,
      businessCategory,
      businessSector,
      investmentDuration,
      securityOption,
      otherSecurityOption,
      documentationOption,
      otherDocumentationOption,
      assets,
      revenue,
      fundingAmount,
      fundingHelp,
      returnPlan,
      businessSafety,
      additionalComments,
      returndate,
      projectedROI,
      businessPicture,
      video, // Array of URLs from the frontend
      nidCopy,
      tinCopy,
      taxCopy,
      tradeLicense,
      bankStatement,
      securityFile,
      financialFile,
      bkash
    });

    // Save the new post to the PendingPost collection
    const savedPost = await newPost.save();

    // Create a duplicate document in the FounderPending collection
    const founderPendingPost = new FounderPending({
      ...savedPost._doc, // Spread saved data from PendingPost
    });

    await founderPendingPost.save();

    // Respond to the client with success
    res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post: ' + error.message });
  }
});

app.put('/adminpost/pendingpost/:postId', authToken, upload.fields([
  { name: 'businessPicture', maxCount: 10 },
  { name: 'video', maxCount: 1 },
  { name: 'nidCopy', maxCount: 1 },
  { name: 'tinCopy', maxCount: 1 },
  { name: 'taxCopy', maxCount: 1 },
  { name: 'tradeLicense', maxCount: 1 },
  { name: 'bankStatement', maxCount: 1 },
  { name: 'securityFile', maxCount: 1 },
  { name: 'financialFile', maxCount: 1 },
]), async (req, res) => {
  console.log('Request Body:', req.body); // Log the request body to debug
  console.log('Files received:', req.files); // Log the received files

  try {
    const userId = req.user?.id; // Retrieve user ID from authenticated request
    if (!userId) {
      return res.status(400).json({ error: "User  ID is required." });
    }

    const postId = req.params.postId; // Get the post ID from the URL

    // Find the existing post
    const existingPost = await PendingPost.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found." });
    }

    // Destructure fields from the request body
    const {
      businessName, email, address, phone, businessCategory, businessSector,
      investmentDuration, securityOption, otherSecurityOption, documentationOption,
      otherDocumentationOption, assets, revenue, fundingAmount, fundingHelp,
      returndate, projectedROI, returnPlan, businessSafety, additionalComments,
      description,
    } = req.body;

    // Update the existing post with new data
    existingPost.businessName = businessName;
    existingPost.description = description;
    existingPost.email = email;
    existingPost.address = address;
    existingPost.phone = phone;
    existingPost.businessCategory = businessCategory;
    existingPost.businessSector = businessSector;
    existingPost.investmentDuration = investmentDuration;
    existingPost.securityOption = securityOption;
    existingPost.otherSecurityOption = otherSecurityOption;
    existingPost.documentationOption = documentationOption;
    existingPost.otherDocumentationOption = otherDocumentationOption;
    existingPost.assets = assets;
    existingPost.revenue = revenue;
    existingPost.fundingAmount = fundingAmount;
    existingPost.fundingHelp = fundingHelp;
    existingPost.returnPlan = returnPlan;
    existingPost.businessSafety = businessSafety;
    existingPost.additionalComments = additionalComments;
    existingPost.returndate = returndate;
    existingPost.projectedROI = projectedROI;
    existingPost.bkash = bkash;


    // Handle file uploads
    if (req.files.businessPicture) {
      existingPost.businessPicture = req.files.businessPicture.map(file => file.secure_url);
    }
    if (req.files.video) {
      existingPost.video = req.files.video[0].secure_url;
    }
    if (req.files.nidCopy) {
      existingPost.nidCopy = req.files.nidCopy[0].secure_url;
    }
    if (req.files.tinCopy) {
      existingPost.tinCopy = req.files.tinCopy[0].secure_url;
    }
    if (req.files.taxCopy) {
      existingPost.taxCopy = req.files.taxCopy[0].secure_url;
    }
    if (req.files.tradeLicense) {
      existingPost.tradeLicense = req.files.tradeLicense[0].secure_url;
    }
    if (req.files.bankStatement) {
      existingPost.bankStatement = req.files.bankStatement[0].secure_url;
    }
    if (req.files.securityFile) {
      existingPost.securityFile = req.files.securityFile[0].secure_url;
    }
    if (req.files.financialFile) {
      existingPost.financialFile = req.files.financialFile[0].secure_url;
    }

    // Save the updated post
    const updatedPost = await existingPost.save();

    // Respond to the client with success
    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status (500).json({ message: 'Error updating post: ' + error.message });
  }
});



app.delete('/adminpost/pending/:id', authToken, async (req, res) => {
  const postId = req.params.id;

  try {
    // Find and delete the pending post
    const pendingPost = await FounderPending.findByIdAndDelete(postId);
    if (!pendingPost) {
      return res.status(404).json({ message: 'Pending post not found' });
    }

    // Also, delete the corresponding entry in the FounderPending collection
    await FounderPending.findByIdAndDelete(postId);

    res.status(200).json({ message: 'Pending post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post: ' + error.message });
  }
});
// Endpoint to retrieve a file by ID
// Assuming you have a GridFS setup
// app.get('/images/filename/:filename', async (req, res) => {
//   try {
//     const filename = req.params.filename;

//     // Find the file metadata by filename
//     const file = await mongoose.connection.db
//       .collection('uploads.files')
//       .findOne({ filename: filename });

//     if (!file) {
//       return res.status(404).json({ error: 'File not found' });
//     }

//     // Set headers
//     res.set('Content-Type', file.contentType);
//     res.set('Content-Disposition', 'inline');

//     // Stream file data
//     const downloadStream = gfsBucket.openDownloadStream(file._id);
//     downloadStream.pipe(res);
//   } catch (err) {
//     console.error('Error fetching image:', err.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
app.use("/comments", commentRoutes);
// Pending Posts Routes
app.get('/adminpost/pending', async (req, res) => {
  try {
    const posts = await PendingPost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts: ' + error.message });
  }
});
app.get('/adminpost/founderpending', async (req, res) => {
  try {
    const posts = await FounderPending.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts: ' + error.message });
  }
});

app.post('/adminpost/accept', async (req, res) => {
  const { postId, userId } = req.body;

  try {
    // Fetch the pending post by ID
    const pendingPost = await PendingPost.findById(postId);
    if (!pendingPost) {
      return res.status(404).json({ message: 'Pending post not found' });
    }

    // Check if the post exists in FounderPending as well
    const founderpending = await FounderPending.findById(postId);
    if (!founderpending) {
      return res.status(404).json({ message: 'FounderPending post not found' });
    }

    // Map all fields to create a new FounderPost document
    const acceptedPost = new FounderPost({
      userId: pendingPost.userId,
      businessName: pendingPost.businessName,
      email: pendingPost.email,
      address: pendingPost.address,
      phone: pendingPost.phone,
      description: pendingPost.description,
      businessCategory: pendingPost.businessCategory,
      businessSector: pendingPost.businessSector,
      investmentDuration: pendingPost.investmentDuration,
      securityOption: pendingPost.securityOption,
      otherSecurityOption: pendingPost.otherSecurityOption,
      documentationOption: pendingPost.documentationOption,
      otherDocumentationOption: pendingPost.otherDocumentationOption,
      assets: pendingPost.assets,
      revenue: pendingPost.revenue,
      fundingAmount: pendingPost.fundingAmount,
      fundingHelp: pendingPost.fundingHelp,
      returnPlan: pendingPost.returnPlan,
      businessSafety: pendingPost.businessSafety,
      additionalComments: pendingPost.additionalComments,
      businessPicture: pendingPost.businessPicture,
      nidCopy: pendingPost.nidCopy,
      tinCopy: pendingPost.tinCopy,
      taxCopy: pendingPost.taxCopy,
      tradeLicense: pendingPost.tradeLicense,
      bankStatement: pendingPost.bankStatement,
      securityFile: pendingPost.securityFile,
      financialFile: pendingPost.financialFile,
      projectedROI: pendingPost.projectedROI,
      returndate: pendingPost.returndate,
      startDate: pendingPost.startDate,
      video:pendingPost.video,
      bkash:pendingPost.bkash
    });

    // Save the accepted post to the FounderPost collection
    await acceptedPost.save();

    // Delete the post from PendingPost and FounderPending
    await PendingPost.findByIdAndDelete(postId);
    await FounderPending.findByIdAndDelete(postId);

    // Create and save a notification for the user
    const notification = new Notification({
      userId,
      message: `Your post for "${pendingPost.businessName}" has been accepted.`,
    });
    await notification.save();

    // Emit notification to the user
    io.to(userId).emit('notification', notification);

    // Respond with the newly created FounderPost
    res.status(200).json(acceptedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error accepting post: ' + error.message });
  }
});

app.post('/adminpost/deny', async (req, res) => {
  const { postId, userId,reason} = req.body;
  if (!reason) {
    return res.status(400).json({ message: 'Reason for denial is required' });
  }

  try {
    const pendingPost = await PendingPost.findById(postId);
    if (!pendingPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
 
    await PendingPost.findByIdAndDelete(postId);
    // Get the business name from the pending post
    const businessName = pendingPost.businessName;
    const founderpending = await FounderPending.findById(postId);
    if (!founderpending) {
      return res.status(404).json({ message: 'Post not found' });
    }
    founderpending.status = 'denied';  // Set the status to 'denied' or use provided status
    founderpending.reason = reason || 'No reason provided'; // Add the reason for denial
    await founderpending.save();
    const notification = new Notification({
      userId: userId,
      message: `Your post for "${businessName}" has been denied.`,
    });
    await notification.save();

    
    io.to(userId).emit('notification', notification);

    res.status(200).json({ message: 'Post denied and removed from pending posts' });
  } catch (error) {
    res.status(500).json({ message: 'Error denying post: ' + error.message });
  }
}); 
app.get('/adminpost/notifications/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications: ' + error.message });
  }
});

app.delete('/adminpost/notifications/read/:userId', async (req, res) => {
  try {
    // Delete all notifications for the user
    await Notification.deleteMany({ userId: req.params.userId });

    // Emit a real-time event to notify the user's client
    io.to(req.params.userId).emit('notifications-deleted');

    // Respond to the client
    res.status(200).json({ message: 'All notifications deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notifications: ' + error.message });
  }
});


// Global Error H
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
app.get('/test', (req, res) => {
  res.json({ message: 'Test route works' });
});

app.listen(4000, '0.0.0.0', () => {
  console.log('Server running on port 4000');
});