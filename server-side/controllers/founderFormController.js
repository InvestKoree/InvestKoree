import PendingPost from '../models/pendingPost.js';
import FounderPending from '../models/founderpending.js';
import { sanitizeFilename } from '../utils/sanitize.js';


export const createFounderPost = async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request Files:", req.files);
  console.log("User ID:", req.user?.id);

  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const {
      businessName, email, address, phone, businessCategory, businessSector,
      investmentDuration, securityOption, otherSecurityOption, documentationOption,
      otherDocumentationOption, assets, revenue, fundingAmount, fundingHelp, returndate, projectedROI,
      returnPlan, businessSafety, additionalComments, description,
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
      businessPictures: req.files?.businessPicture
        ? req.files.businessPicture.map(file => sanitizeFilename(file.originalname))
        : [],
      nidFile: req.files?.nidCopy?.[0]
        ? sanitizeFilename(req.files.nidCopy[0].originalname)
        : null,
      tinFile: req.files?.tinCopy?.[0]
        ? sanitizeFilename(req.files.tinCopy[0].originalname)
        : null,
      taxFile: req.files?.taxCopy?.[0]
        ? sanitizeFilename(req.files.taxCopy[0].originalname)
        : null,
      tradeLicenseFile: req.files?.tradeLicense?.[0]
        ? sanitizeFilename(req.files.tradeLicense[0].originalname)
        : null,
      bankStatementFile: req.files?.bankStatement?.[0]
        ? sanitizeFilename(req.files.bankStatement[0].originalname)
        : null,
      securityFile: req.files?.securityFile?.[0]
        ? sanitizeFilename(req.files.securityFile[0].originalname)
        : null,
      financialFile: req.files?.financialFile?.[0]
        ? sanitizeFilename(req.files.financialFile[0].originalname)
        : null,
      videoFile: req.files?.video?.[0]
        ? sanitizeFilename(req.files.video[0].originalname)
        : null,
    });

    // Save the new post to the PendingPost collection
    const savedPost = await newPost.save();

    // Create a new document in FounderPending collection
    const founderPendingPost = new FounderPending({
      ...savedPost._doc, // Use the saved data from PendingPost
    });

    await founderPendingPost.save();

    res.status(201).json({ message: "Founder post created successfully and saved to pending approval!" });
  } catch (error) {
    console.error("Error creating founder post:", error);
    res.status(500).json({ error: "Server error" });
  }
};