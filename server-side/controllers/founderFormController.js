import fs from 'fs';
import path from 'path';
import PendingPost from '../models/pendingPost.js';
import FounderPending from '../models/founderpending.js';
import { sanitizeFilename } from '../utils/sanitize.js';
import { fileURLToPath } from 'url'; // Import for getting __dirname
import { dirname } from 'path';

// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the upload directory
const UPLOAD_DIR = path.join(__dirname, '../../uploads'); // Assuming 'uploads' folder is in the root

// Ensure the user directory exists with the name of the userId
const ensureUserDirectoryExists = (userId) => {
  const userDir = path.join(UPLOAD_DIR, userId); // Use userId as the folder name
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
  }
  return userDir;
};

// Helper function to sanitize and rename the file
const getSanitizedFilePath = (userId, field, file) => {
  const userDir = ensureUserDirectoryExists(userId);
  const sanitizedFilename = sanitizeFilename(file.originalname);
  const filePath = path.join(userDir, sanitizedFilename); // Path with userId-based folder
  return filePath; // Path that will be saved in DB
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
        ? req.files.businessPicture.map(file => getSanitizedFilePath(userId, 'businessPicture', file))
        : [],
      nidFile: req.files?.nidCopy?.[0] 
        ? getSanitizedFilePath(userId, 'nidCopy', req.files.nidCopy[0])
        : null,
      tinFile: req.files?.tinCopy?.[0] 
        ? getSanitizedFilePath(userId, 'tinCopy', req.files.tinCopy[0])
        : null,
      taxFile: req.files?.taxCopy?.[0]
        ? getSanitizedFilePath(userId, 'taxCopy', req.files.taxCopy[0])
        : null,
      tradeLicenseFile: req.files?.tradeLicense?.[0]
        ? getSanitizedFilePath(userId, 'tradeLicense', req.files.tradeLicense[0])
        : null,
      bankStatementFile: req.files?.bankStatement?.[0]
        ? getSanitizedFilePath(userId, 'bankStatement', req.files.bankStatement[0])
        : null,
      securityFile: req.files?.securityFile?.[0]
        ? getSanitizedFilePath(userId, 'securityFile', req.files.securityFile[0])
        : null,
      financialFile: req.files?.financialFile?.[0]
        ? getSanitizedFilePath(userId, 'financialFile', req.files.financialFile[0])
        : null,
      videoFile: req.files?.video?.[0]
        ? getSanitizedFilePath(userId, 'video', req.files.video[0])
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