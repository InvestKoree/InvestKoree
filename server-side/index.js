import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import multer from 'multer';
import path from 'path';
import helmet from 'helmet'; // Import helmet
import connectDB from './config/db.js';
import signupRoute from '../server-side/routes/signup.js';
import loginRoute from '../server-side/routes/login.js';
import userSpecificRoute from './routes/userRoutes.js';
import userPostsRoute from './routes/userPostsRoute.js';
import founderPostRoute from './routes/founderPostRoute.js';
import investmentRoute from './routes/investmentRoutes.js';
import allPostsRoute from './routes/allPostRoute.js';
import { createFounderPost } from './controllers/founderFormController.js';
import { authToken } from './utils/authMiddleware.js';
import PendingPost from './models/pendingPost.js';
import FounderPost from './models/founderFormPostModels.js';
import Notification from './models/notification.js';
import FounderPending from './models/founderpending.js';
import CheckDuplicate from './routes/checkDuplicate.js';
import { fileURLToPath } from 'url'; // Import for getting __dirname
import { dirname } from 'path';
import { sanitizeFilename } from './utils/sanitize.js';
import fs from 'fs';

dotenv.config();
// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Initialize App
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://investkoree.onrender.com', 'http://localhost:5173', 'https://investkoree-c8l8.onrender.com', 'https://investkoree.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

// Connect to Database
connectDB();

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

// Multer Setup
const uploadsPath = path.resolve(__dirname, 'uploads'); // Use __dirname to resolve the uploads path

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const userId = req.user._id; // Assuming req.user._id contains the logged-in user's ID.
    const uploadPath = path.join(__dirname, `uploads/${userId}`);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); // Set the destination folder
  },
  filename: async (req, file, cb) => {
    const userId = req.user._id;
    const uploadPath = path.join(__dirname, `uploads/${userId}`);

    // Get all files in the directory
    const files = fs.readdirSync(uploadPath);

    // Extract numeric indices from filenames
    let indices = files
      .map(f => parseInt(f.match(/_(\d+)\./)?.[1] || 0)) // Extract number after '_'
      .filter(num => !isNaN(num)); // Filter valid numbers

    let nextIndex = indices.length > 0 ? Math.max(...indices) + 1 : 1; // Calculate next index

    // Create new filename
    const ext = path.extname(file.originalname); // Get file extension
    const baseName = path.basename(file.originalname, ext); // Get filename without extension
    const newFileName = `${baseName}_${nextIndex}${ext}`;

    cb(null, newFileName); // Set the new filename
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size (e.g., 50 MB)
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|pdf|doc|txt|ppt|mp4|mov|avi|wmv/;
    if (filetypes.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  },
});


// Routes
app.use('/users', signupRoute);
app.use('/api',CheckDuplicate)
app.use('/founderpost', founderPostRoute);
app.use('/users/auth', loginRoute);
app.use('/api', userSpecificRoute);
app.use('/investments', investmentRoute);
app.use('/api', userPostsRoute);
app.use('/api', allPostsRoute);
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
app.post(
  '/adminpost/pendingpost',
  authToken,
  upload.fields([
    { name: 'businessPicture', maxCount: 10 },
    { name: 'nidCopy', maxCount: 1 },
    { name: 'tinCopy', maxCount: 1 },
    { name: 'taxCopy', maxCount: 1 },
    { name: 'tradeLicense', maxCount: 1 },
    { name: 'bankStatement', maxCount: 1 },
    { name: 'securityFile', maxCount: 1 },
    { name: 'financialFile', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log('Files received:', req.files);
      await createFounderPost(req, res);
    } catch (error) {
      res.status(500).json({ message: 'Error creating post: ' + error.message });
    }
  }
);
// app.put('/adminpost/update/:id', authToken, upload.fields([
//   { name: 'businessPicture', maxCount: 10 },
//   { name: 'nidCopy', maxCount: 1 },
//   { name: 'tinCopy', maxCount: 1 },
//   { name: 'taxCopy', maxCount: 1 },
//   { name: 'tradeLicense', maxCount: 1 },
//   { name: 'bankStatement', maxCount: 1 },
//   { name: 'securityFile', maxCount: 1 },
//   { name: 'financialFile', maxCount: 1 },
//   { name: 'video', maxCount: 1 },
// ]), async (req, res) => {
//   try {
//     const postId = req.params.id;

//     // Prepare the updated post
//     const updatedPost = { ...req.body };

//     // Handle the uploaded files
//     if (req.files) {
//       if (req.files.businessPicture) {
//         updatedPost.businessPictures = req.files.businessPicture.map(file => file.originalname); // Store filenames
//       }
//       if (req.files.nidCopy) {
//         updatedPost.nidFile = req.files.nidCopy[0].originalname; // Store filename
//       }
//       if (req.files.tinCopy) {
//         updatedPost.tinFile = req.files.tinCopy[0].originalname; // Store filename
//       }
//       if (req.files.taxCopy) {
//         updatedPost.taxFile = req.files.taxCopy[0].originalname; // Store filename
//       }
//       if (req.files.tradeLicense) {
//         updatedPost.tradeLicenseFile = req.files.tradeLicense[0].originalname; // Store filename
//       }
//       if (req.files.bankStatement) {
//         updatedPost.bankStatementFile = req.files.bankStatement[0].originalname; // Store filename
//       }
//       if (req.files.securityFile) {
//         updatedPost.securityFile = req.files.securityFile[0].originalname; // Store filename
//       }
//       if (req.files.financialFile) {
//         updatedPost.financialFile = req.files.financialFile[0].originalname; // Store filename
//       }
//       if (req.files.video) {
//         updatedPost.videoFile = req.files.video[0].originalname; // Store filename
//       }
//     }

//     // Update the post in the database
//     const foundPost = await FounderPost.findByIdAndUpdate(postId, updatedPost, { new: true });

//     if (!foundPost) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     res.status(200).json(foundPost);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating post: ' + error.message });
//   }
// });
// Delete a pending post
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
      businessPictures: pendingPost.businessPictures,
      nidFile: pendingPost.nidFile,
      tinFile: pendingPost.tinFile,
      taxFile: pendingPost.taxFile,
      tradeLicenseFile: pendingPost.tradeLicenseFile,
      bankStatementFile: pendingPost.bankStatementFile,
      securityFile: pendingPost.securityFile,
      financialFile: pendingPost.financialFile,
      projectedROI: pendingPost.projectedROI,
      returndate: pendingPost.returndate,
      startDate: pendingPost.startDate,
      videoFile:pendingPost.videoFile,
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