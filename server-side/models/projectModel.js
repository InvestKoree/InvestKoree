import mongoose from 'mongoose';

// Define the Project schema
const projectSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fundingAmount: {
    type: Number,
    required: true,
  },
  investmentDuration: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  returndate: {
    type: Date,
    required: true,
  },
  projectedROI: {
    type: Number,
    required: true,
  },
  fundingHelp: {
    type: String,
  },
  returnPlan: {
    type: String,
  },
  businessSafety: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User ", // Assuming you have a User model
  }, 
   businessPictures: [{ type: String }], 
  videoFile: { type: String } 
}, { timestamps: true }); // This will add createdAt and updatedAt fields

// Create the Project model
const Project = mongoose.model("Project", projectSchema);

export default Project;