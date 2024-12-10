// server-side/models/FounderPost.js
import mongoose from 'mongoose';

const founderPostSchema = new mongoose.Schema({
    address: {
    type: String,
    required: true
  },
  
fundingAmount: {
    type: String,
    required: true
  },
//   left_for_fund: {
//     type: String,
//     required: true
//   },
//   raised: {
//     type: Number,
//     required: true
//   },
  
businessSector: {
    type: String,
    required: true
  },
  businessPic: {
    type: String,
    required: true
  },
//   funded: {
//     type: Number,
//     required: true
//   },
additionalComments: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const founderPost = mongoose.model('founderPost', founderPostSchema);
export default founderPost;