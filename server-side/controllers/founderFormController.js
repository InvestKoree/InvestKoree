import PendingPost from '../models/pendingPost.js';
import FounderPending from '../models/founderpending.js';
import { sanitizeFilename } from '../utils/sanitize.js';

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

    // Helper function to sanitize file paths
    const getSanitizedFilePath = (field) => {
      if (req.files?.[field]?.[0]) {
        const sanitizedFilename = sanitizeFilename(req.files[field][0].originalname);
        return `/uploads/${sanitizedFilename}`;
      }
      return null;
    };

    // Retrieve multiple file paths for business pictures with sanitization
    const businessPictures = req.files?.businessPicture
      ? req.files.businessPicture.map(file => {
          const sanitizedFilename = sanitizeFilename(file.originalname);
          return `/uploads/${sanitizedFilename}`;
        })
      : [];

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
      businessPictures, // Save sanitized file paths for multiple images
      nidFile: getSanitizedFilePath('nidCopy'),
      tinFile: getSanitizedFilePath('tinCopy'),
      taxFile: getSanitizedFilePath('taxCopy'),
      tradeLicenseFile: getSanitizedFilePath('tradeLicense'),
      bankStatementFile: getSanitizedFilePath('bankStatement'),
      securityFile: getSanitizedFilePath('securityFile'),
      financialFile: getSanitizedFilePath('financialFile'),
      videoFile: getSanitizedFilePath('video'),
    });

    // Save the new post to the PendingPost collection
    const savedPost = await newPost.save();

    // Save the same document to FounderPending collection
    const founderPendingPost = new FounderPending({
      ...savedPost._doc, // Use the saved document data
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
