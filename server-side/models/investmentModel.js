import mongoose from 'mongoose';



// Define the Investment schema
const investmentSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Project", // Assuming you have a Project model
  },
  businessName: {
    type: String,
    required: true,
  },
  returndate: {
    type: String, // You can change this to Date if you want to store it as a date
    required: true,
  },
  startDate: {
    type: String, // You can change this to Date if you want to store it as a date
    required: true,
  },
  // Add any other fields you need, such as userId, investmentAmount, etc.
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "User ", // Assuming you have a User model
  // },
  // investmentAmount: {
  //   type: Number,
  //   required: true,
  // },
}, { timestamps: true }); // This will add createdAt and updatedAt fields

// Create the Investment model
const Investment = mongoose.model("Investment", investmentSchema);
export default Investment;