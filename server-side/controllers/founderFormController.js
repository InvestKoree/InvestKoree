import PendingPost from '../models/pendingPost.js';
import FounderPending from '../models/founderpending.js';

// Create __dirname equivalent for ES module
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
      // Handle multiple business pictures and store GridFS file IDs
      businessPictures: req.files.businessPicture
        ? req.files.businessPicture.map(file => file.id) // Store GridFS file IDs
        : [],
      nidFile: req.files.nidCopy?.[0]?.id || null,
      tinFile: req.files.tinCopy?.[0]?.id || null,
      taxFile: req.files.taxCopy?.[0]?.id || null,
      tradeLicenseFile: req.files.tradeLicense?.[0]?.id || null,
      bankStatementFile: req.files.bankStatement?.[0]?.id || null,
      securityFile: req.files.securityFile?.[0]?.id || null,
      financialFile: req.files.financialFile?.[0]?.id || null,
      videoFile: req.files.video?.[0]?.id || null,
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