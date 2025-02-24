import mongoose from 'mongoose';

const FounderPendingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', index: true },
  businessName: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  address: { type: String, required: true },
  phone: { type: String, required: true},
  description: { type: String, required: true },
  reason: { type: String, default: '' },
  status: { type: String, default: 'pending' },
  businessCategory: { type: String, required: true },
  businessSector: { type: String, required: true },
  investmentDuration: { type: String, required: true },
  securityOption: { type: String, required: true },
  otherSecurityOption: { type: String, default: '' },
  documentationOption: { type: String, required: true },
  otherDocumentationOption: { type: String, default: '' },
  assets: { type: String, required: true },
  revenue: { type: String, required: true },
  bkash: { type: String, required: true },
  fundingAmount: { type: String, required: true },
  fundingHelp: { type: String, required: true },
  returnPlan: { type: String, required: true },
  businessSafety: { type: String, required: true },
  additionalComments: { type: String, default: '' },
  businessPicture: [{ type: String, match: /^https?:\/\/.+\..+/ }],
  nidCopy: { type: String, match: /^https?:\/\/.+\..+/ },
  taxCopy: { type: String, match: /^https?:\/\/.+\..+/ },
  tinCopy: { type: String, match: /^https?:\/\/.+\..+/ },
  tradeLicense: { type: String, match: /^https?:\/\/.+\..+/ },
  bankStatement: { type: String, match: /^https?:\/\/.+\..+/ },
  securityFile: { type: String, match: /^https?:\/\/.+\..+/ },
  financialFile: { type: String, match: /^https?:\/\/.+\..+/ },
  projectedROI: { type: String, required: true },
  returndate: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  video: { type: String, match: /^https?:\/\/.+\..+/ }
}, { timestamps: true });

const FounderPending = mongoose.model('FounderPending', FounderPendingSchema);
export default FounderPending;
