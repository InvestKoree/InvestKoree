import PendingPost from '../models/pendingPost.js';
import FounderPending from '../models/founderpending.js';

export const createFounderPost = async (req, res, uploadedUrls) => {
  console.log("Request Body:", req.body);
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
      businessPictures: uploadedUrls.filter(url => url.includes('business_pictures')),
      nidFile: uploadedUrls.find(url => url.includes('nidFile')),
      tinFile: uploadedUrls.find(url => url.includes('tinFile')),
      taxFile: uploadedUrls.find(url => url.includes('taxFile')),
      tradeLicenseFile: uploadedUrls.find(url => url.includes('tradeLicenseFile')),
      bankStatementFile: uploadedUrls.find(url => url.includes('bankStatementFile')),
      securityFile: uploadedUrls.find(url => url.includes('securityFile')),
      financialFile: uploadedUrls.find(url => url.includes('financialFile')),
      videoFile: uploadedUrls.find(url => url.includes('videoFile')),
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