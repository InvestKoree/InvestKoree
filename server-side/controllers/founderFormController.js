import cloudinary from '../cloudinaryConfig.js'; // Import your Cloudinary configuration
import PendingPost from '../models/pendingPost.js';
import FounderPending from '../models/founderpending.js';

export const createFounderPost = async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request Files:", req.files);
  console.log("User  ID:", req.user?.id);

  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "User  ID is required." });
    }

    // Destructure fields with fallback values
    const {
      businessName = "", email = "", address = "", phone = "", businessCategory = "",
      businessSector = "", investmentDuration = "", securityOption = "", otherSecurityOption = "",
      documentationOption = "", otherDocumentationOption = "", assets = "", revenue = "",
      fundingAmount = "", fundingHelp = "", returndate = "", projectedROI = "",
      returnPlan = "", businessSafety = "", additionalComments = "", description = "",
    } = req.body;

    // Check if files are uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

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
    });

    // Upload business pictures to Cloudinary
    if (req.files.businessPicture) {
      const uploadPromises = req.files.businessPicture.map(file => {
        return cloudinary.uploader.upload(file.path, {
          folder: 'business_pictures', // Optional: specify a folder in Cloudinary
          resource_type: 'image',
          quality: 'auto', // Specify resource type
        });
      });
      const uploadedPictures = await Promise.all(uploadPromises);
      newPost.businessPictures = uploadedPictures.map(picture => picture.secure_url);
    }

    // Upload other files (NID, TIN, Tax, Trade License, Bank Statement, Security, Financial)
    const otherFiles = [
      { file: req.files.nidCopy, name: 'nidFile' },
      { file: req.files.tinCopy, name: 'tinFile' },
      { file: req.files.taxCopy, name: 'taxFile' },
      { file: req.files.tradeLicense, name: 'tradeLicenseFile' },
      { file: req.files.bankStatement, name: 'bankStatementFile' },
      { file: req.files.securityFile, name: 'securityFile' },
      { file: req.files.financialFile, name: 'financialFile' },
      { file: req.files.video, name: 'videoFile' },
    ];

    for (const { file, name } of otherFiles) {
      if (file) {
        const uploadResponse = await cloudinary.uploader.upload(file.path, {
          folder: 'documents',
          quality: 'auto', // Optional: specify a folder in Cloudinary
          resource_type: name === 'videoFile' ? 'video' : 'raw', // Specify resource type based on file type
        });
        newPost[name] = uploadResponse.secure_url; // Store the secure URL
      }
    }

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