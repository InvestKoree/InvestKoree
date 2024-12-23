import fs from 'fs';
import path from 'path';
import PendingPost from '../models/pendingPost.js';
import FounderPending from '../models/founderpending.js';
import { sanitizeFilename } from '../utils/sanitize.js';
import { fileURLToPath } from 'url'; // Import for getting __dirname
import { dirname } from 'path';

// Create __dirname equivalent for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the upload directory
const UPLOAD_DIR = path.join(__dirname, '../uploads'); // Assuming 'uploads' folder is in the root

// Ensure the user directory exists with the name of the userId
const ensureUserDirectoryExists = (userId) => {
  const userDir = path.join(UPLOAD_DIR, userId); // Use userId as the folder name
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
  }
  return userDir;
};

// Helper function to generate indexed filenames
const getIndexedFilePath = (userId, file) => {
  const userDir = ensureUserDirectoryExists(userId);
  const sanitizedFilename = sanitizeFilename(file.originalname);

  // No need for fieldDir, just use userDir
  const existingFiles = fs.readdirSync(userDir);
  
  // Extract numeric indices from filenames
  let indices = existingFiles
    .map(f => parseInt(f.match(/_(\d+)\./)?.[1] || 0)) // Extract number after '_'
    .filter(num => !isNaN(num)); // Filter valid numbers

  // Calculate the next index
  let nextIndex = indices.length > 0 ? Math.max(...indices) + 1 : 1; // Start from 1 if no files exist

  // Save the sanitized filename with the next index
  const indexedFilename = `${sanitizedFilename}_${nextIndex}${path.extname(file.originalname)}`;
  const filePath = path.join(userDir, indexedFilename); // Store directly in userDir

  return filePath;
};

export const createFounderPost = async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request Files:", req.files);
  console.log("User ID:", req.user?.id);

  try {
    // Retrieve the user ID from middleware
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // Destructure fields with fallback values
    const {
      businessName = "", email = "", address = "", phone = "", businessCategory = "",
      businessSector = "", investmentDuration = "", securityOption = "", otherSecurityOption = "",
      documentationOption = "", otherDocumentationOption = "", assets = "", revenue = "",
      fundingAmount = "", fundingHelp = "", returndate = "", projectedROI = "",
      returnPlan = "", businessSafety = "", additionalComments = "", description = "",
    } = req.body;

 // Prepare the new post
const newPost = new PendingPost({
  userId,
  businessName,
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
  description,
  // Handle multiple business pictures and sanitize paths
  businessPictures: req.files?.businessPicture
    ? req.files.businessPicture.map(file => getIndexedFilePath(userId, file)) // No field parameter
    : [],
  nidFile: req.files?.nidCopy?.[0] 
    ? getIndexedFilePath(userId, req.files.nidCopy[0]) // No field parameter
    : null,
  tinFile: req.files?.tinCopy?.[0] 
    ? getIndexedFilePath(userId, req.files.tinCopy[0]) // No field parameter
    : null,
  taxFile: req.files?.taxCopy?.[0]
    ? getIndexedFilePath(userId, req.files.taxCopy[0]) // No field parameter
    : null,
  tradeLicenseFile: req.files?.tradeLicense?.[0]
    ? getIndexedFilePath(userId, req.files.tradeLicense[0]) // No field parameter
    : null,
  bankStatementFile: req.files?.bankStatement?.[0]
    ? getIndexedFilePath(userId, req.files.bankStatement[0]) // No field parameter
    : null,
  securityFile: req.files?.securityFile?.[0]
    ? getIndexedFilePath(userId, req.files.securityFile[0]) // No field parameter
    : null,
  financialFile: req.files?.financialFile?.[0]
    ? getIndexedFilePath(userId, req.files.financialFile[0]) // No field parameter
    : null,
  videoFile: req.files?.video?.[0]
    ? getIndexedFilePath(userId, req.files.video[0]) // No field parameter
    : null,
});
    // Save the new post to the PendingPost collection
    const savedPost = await newPost.save();

    // Create a new document in FounderPending collection
    const founderPendingPost = new FounderPending({
      ...savedPost._doc, // Use the saved data from PendingPost
    });

    await founderPendingPost.save();

    // Respond to the client
    res.status(201).json({
      message: "Founder post created successfully and saved to pending approval!",
      data: savedPost,
    });
  } catch (error) {
    console.error("Error creating founder post:", error.message || error);
    res.status(500).json({ error: "Server error occurred while creating founder post." });
  }
};
