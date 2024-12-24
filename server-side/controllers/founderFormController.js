
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
      businessPictures: req.files?.businessPicture
        ? req.files.businessPicture.map(file => file.id) // Store GridFS file IDs
        : [],
      nidFile: req.files?.nidCopy?.[0]
        ? req.files.nidCopy[0].id // Store GridFS file ID
        : null,
      tinFile: req.files?.tinCopy?.[0]
        ? req.files.tinCopy[0].id // Store GridFS file ID
        : null,
      taxFile: req.files?.taxCopy?.[0]
        ? req.files.taxCopy[0].id // Store GridFS file ID
        : null,
      tradeLicenseFile: req.files?.tradeLicense?.[0]
        ? req.files.tradeLicense[0].id // Store GridFS file ID
        : null,
      bankStatementFile: req.files?.bankStatement?.[0]
        ? req.files.bankStatement[0].id // Store GridFS file ID
        : null,
      securityFile: req.files?.securityFile?.[0]
        ? req.files.securityFile[0].id // Store GridFS file ID
        : null,
      financialFile: req.files?.financialFile?.[0]
        ? req.files.financialFile[0].id // Store GridFS file ID
        : null,
      videoFile: req.files?.video?.[0]
        ? req.files.video[0].id // Store GridFS file ID
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