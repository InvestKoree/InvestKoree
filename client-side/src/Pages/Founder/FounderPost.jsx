import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { useTranslation } from "react-i18next";
const FounderPost = () => {
  const initialFormData = {
    businessName: "",
    description: "",
    email: "",
    address: "",
    phone: "",
    businessCategory: "",
    businessSector: "",
    investmentDuration: "",
    securityOption: "",
    otherSecurityOption: "",
    documentationOption: "",
    otherDocumentationOption: "",
    assets: "",
    revenue: "",
    fundingAmount: "",
    fundingHelp: "",
    returnPlan: "",
    businessSafety: "",
    additionalComments: "",
    projectedROI: "",
    returndate: "",
    bkash: "",
    minInvestment: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const navigate = useNavigate();
  const [otherOption, setOtherOption] = useState(false);
  const [otherDocumentation, setOtherDocumentation] = useState(false);
  const [nidFile, setNidFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [businessPictures, setBusinessPictures] = useState([]);
  const [tinFile, setTinFile] = useState(null);
  const [taxFile, setTaxFile] = useState(null);
  const [tradeLicenseFile, setTradeLicenseFile] = useState(null);
  const [bankStatementFile, setBankStatementFile] = useState(null);
  const [securityFile, setSecurityFile] = useState(null);
  const [financialFile, setFinancialFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const { t } = useTranslation();

  const handleFileChange = (e, setFile) => setFile(e.target.files[0]);

  const handleMultipleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const compressedFiles = await Promise.all(
      files.map(async (file) => {
        const options = {
          maxSizeKB: 500, // Maximum size in MB (adjust as needed)
          maxWidthOrHeight: 1024, // Maximum width or height (adjust as needed)
          useWebWorker: true, // Use web workers for better performance
        };

        try {
          const compressedFile = await imageCompression(file, options);
          return compressedFile;
        } catch (error) {
          console.error("Error compressing image:", error);
          toast.error("Failed to compress image.");
          return file; // Fallback to the original file if compression fails
        }
      })
    );

    setBusinessPictures(compressedFiles);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };
  const handleSecurityOptionChange = (e) => {
    const selectedOption = e.target.value;
    setFormData({
      ...formData,
      securityOption: selectedOption,
    });
    setOtherOption(selectedOption === "Other");
  };

  const handleDocumentationOptionChange = (e) => {
    const selectedOption = e.target.value;
    setFormData({
      ...formData,
      documentationOption: selectedOption,
    });
    setOtherDocumentation(selectedOption === "Other");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const postData = new FormData();

      // Append regular form fields (text fields) to FormData
      Object.keys(formData).forEach((key) => {
        postData.append(key, formData[key]); // Append each key-value pair from formData
      });

      // Upload business pictures to Cloudinary
      for (const picture of businessPictures) {
        const pictureFormData = new FormData();
        pictureFormData.append("file", picture);
        pictureFormData.append("upload_preset", "uploadpreset"); // Replace with your upload preset

        try {
          const uploadResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/dhqmilgfz/image/upload`, // Replace with your Cloudinary cloud name
            pictureFormData
          );
          postData.append("businessPicture", uploadResponse.data.secure_url); // Store the URL
        } catch (error) {
          console.error("Error uploading business picture:", error);
          toast.error(`Failed to upload business picture: ${error.message}`);
        }
      }

      // Upload video to Cloudinary
      if (videoFile) {
        const videoFormData = new FormData();
        videoFormData.append("file", videoFile);
        videoFormData.append("upload_preset", "uploadpreset"); // Replace with your upload preset

        try {
          const videoUploadResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/dhqmilgfz/video/upload`, // Replace with your Cloudinary cloud name
            videoFormData
          );
          postData.append("video", videoUploadResponse.data.secure_url); // Store the URL
        } catch (error) {
          console.error("Error uploading video:", error);
          toast.error(`Failed to upload video: ${error.message}`);
        }
      }

      // Upload other files (NID, TIN, Tax, Trade License, Bank Statement, Security, Financial)
      const otherFiles = [
        { file: nidFile, name: "nidCopy" },
        { file: tinFile, name: "tinCopy" },
        { file: taxFile, name: "taxCopy" },
        { file: tradeLicenseFile, name: "tradeLicense" },
        { file: bankStatementFile, name: "bankStatement" },
        { file: securityFile, name: "securityFile" },
        { file: financialFile, name: "financialFile" },
      ];

      for (const { file, name } of otherFiles) {
        if (file) {
          const fileFormData = new FormData();
          fileFormData.append("file", file);
          fileFormData.append("upload_preset", "uploadpreset"); // Replace with your upload preset

          try {
            const uploadResponse = await axios.post(
              `https://api.cloudinary.com/v1_1/dhqmilgfz/upload`, // Replace with your Cloudinary cloud name
              fileFormData
            );
            postData.append(name, uploadResponse.data.secure_url); // Store the URL
          } catch (error) {
            console.error(`Error uploading ${name}:`, error);
            toast.error(`Failed to upload ${name}: ${error.message}`);
          }
        }
      }

      // Send the complete FormData to your API
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/adminpost/pendingpost`, {
        method: "POST",
        body: postData, // Send the FormData directly
        headers: {
          Authorization: `Bearer ${token}`, // Include the token here
        },
      });

      if (response.ok) {
        toast.success("Your post has been submitted for review!");
        navigate("/founderdashboard");
        resetForm(); // Reset the form after successful submission
      } else {
        const errorData = await response.json();
        toast.error(
          `Failed to submit form: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      toast.error(`Error submitting form: ${error.message}`);
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setNidFile(null);
    setBusinessPictures([]);
    setTinFile(null);
    setTaxFile(null);
    setTradeLicenseFile(null);
    setBankStatementFile(null);
    setSecurityFile(null);
    setFinancialFile(null);
    setOtherOption(false);
    setOtherDocumentation(false);
    setVideoFile(null);
  };

  return (
    <div>
      <form
        className="mb-10"
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <p className="lg:text-2xl xs:text-lg xxs:text-lg sm:text-lg font-bold my-10">
          {t("founder_post_title")}
        </p>
        {/* Business Name */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("business_name")}</span>
          </div>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            placeholder={t("business_name_placeholder")}
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>
        {/* Description */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("business_description")}</span>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder={t("business_description_placeholder")}
            className="textarea textarea-bordered textarea-warning w-full max-w-xs"
            rows="4"
          />
        </label>
        {/* Email */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("email")}</span>
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t("email_placeholder")}
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>
        {/* Address */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("address")}</span>
          </div>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder={t("address_placeholder")}
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>
        {/* Business Picture */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("upload_business_picture")}</span>
          </div>
          <input
            type="file"
            name="businessPicture"
            accept="image/*"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            onChange={handleMultipleFileChange}
            multiple
          />
        </label>
        {/* Video Upload */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("upload_video")}</span>
          </div>
          <input
            type="file"
            accept="video/*"
            name="video"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            onChange={handleVideoChange}
          />
        </label>
        {/* Phone Number */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("phone_number")}</span>
          </div>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder={t("phone_number_placeholder")}
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("bkash")}</span>
          </div>
          <input
            type="text"
            name="bkash"
            value={formData.bkash}
            onChange={handleInputChange}
            placeholder={t("bkash_placeholder")}
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>
        {/* NID Copy */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("upload_nid")}</span>
          </div>
          <input
            type="file"
            name="nidCopy"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            onChange={(e) => handleFileChange(e, setNidFile)}
            required
          />
        </label>
        {/* TIN Copy */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("upload_tin")}</span>
          </div>
          <input
            type="file"
            name="tinCopy"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            onChange={(e) => handleFileChange(e, setTinFile)}
            required
          />
        </label>
        {/* Tax Information */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("upload_tax_info")}</span>
          </div>
          <input
            type="file"
            name="taxCopy"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            onChange={(e) => handleFileChange(e, setTaxFile)}
            required
          />
        </label>
        {/* Trade License */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("upload_trade_license")}</span>
          </div>
          <input
            type="file"
            name="tradeLicense"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            onChange={(e) => handleFileChange(e, setTradeLicenseFile)}
            required
          />
        </label>
        {/* Bank Statement */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("upload_bank_statement")}</span>
          </div>
          <input
            type="file"
            name="bankStatement"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            onChange={(e) => handleFileChange(e, setBankStatementFile)}
            required
          />
        </label>
        {/* Business Category */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("business_category")}</span>
          </div>
          <select
            name="businessCategory"
            value={formData.businessCategory}
            onChange={handleInputChange}
            className="select select-warning w-full max-w-xs"
            required
          >
            <option disabled value="">
              {t("pick_a_category")}
            </option>
            <option value="Shariah">Shariah</option>
            <option value="Stocks">Stocks</option>
            <option value="Fixed Return">Fixed Return</option>
          </select>
        </label>
        {/* Business Sector */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("business_sector")}</span>
          </div>
          <select
            name="businessSector"
            value={formData.businessSector}
            onChange={handleInputChange}
            className="select select-warning w-full max-w-xs"
            required
          >
            <option disabled value="">
              {t("pick_a_sector")}
            </option>
            <option value="Health">Health</option>
            <option value="Farming">Farming</option>
            <option value="Clothing">Clothing</option>
            <option value="Financial">Financial</option>
            <option value="Retail">Retail</option>
            <option value="Art">Art</option>
            <option value="Comics">Comics</option>
            <option value="Crafts">Crafts</option>
            <option value="Dance">Dance</option>
            <option value="Design">Design</option>
            <option value="Fashion">Fashion</option>
            <option value="Film">Film</option>
            <option value="Food">Food</option>
            <option value="Games">Games</option>
            <option value="Journalism">Journalism</option>
            <option value="Music">Music</option>
            <option value="Photography">Photography</option>
            <option value="Publishing">Publishing</option>
            <option value="Technology">Technology</option>
            <option value="Theater">Theater</option>
          </select>
        </label>
        {/* Investment Duration */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("investment_duration")}</span>
          </div>
          <select
            name="investmentDuration"
            value={formData.investmentDuration}
            onChange={handleInputChange}
            className="select select-warning w-full max-w-xs"
            required
          >
            <option disabled value="">
              {t("pick_a_duration")}
            </option>
            <option value="short-term">short-term (2 weeks to 1 month)</option>
            <option value="mid-term">mid-term (2 months to 6 months)</option>
            <option value="long-term">long-term (6 months+)</option>
          </select>
        </label>
        {/* Security Option */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("security_option")}</span>
          </div>
          <select
            name="securityOption"
            value={formData.securityOption}
            onChange={handleSecurityOptionChange}
            className="select select-warning w-full max-w-xs"
            required
          >
            <option disabled value="">
              {t("pick_a_security")}
            </option>
            <option value="Property">Property</option>
            <option value="Equipment">Equipment</option>
            <option value="Inventory">Inventory</option>
            <option value="Other">Other</option>
          </select>
        </label>
        {otherOption && (
          <label className="form-control my-3 w-full max-w-xs">
            <div className="label">
              <span className="label-text">{t("other_security_option")}</span>
            </div>
            <input
              type="text"
              name="otherSecurityOption"
              value={formData.otherSecurityOption}
              onChange={handleInputChange}
              placeholder={t("other_security_option_placeholder")}
              className="input input-bordered input-warning w-full max-w-xs"
              required={otherOption}
            />
          </label>
        )}
        {/* Upload Security File */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("upload_security_file")}</span>
          </div>
          <input
            type="file"
            name="securityFile"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            onChange={(e) => handleFileChange(e, setSecurityFile)}
            required
          />
        </label>
        {/* Documentation Option */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("documentation_option")}</span>
          </div>
          <select
            name="documentationOption"
            value={formData.documentationOption}
            onChange={handleDocumentationOptionChange}
            className="select select-warning w-full max-w-xs"
            required
          >
            <option disabled value="">
              {t("pick_a_documentation")}
            </option>
            <option value="Audit Report">Audit Report</option>
            <option value="Income Statement">Income Statement</option>
            <option value="Financial Projections">Financial Projections</option>
            <option value="Other">Other</option>
          </select>
        </label>
        {otherDocumentation && (
          <label className="form-control my-3 w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                {t("other_documentation_option")}
              </span>
            </div>
            <input
              type="text"
              name="otherDocumentationOption"
              value={formData.otherDocumentationOption}
              onChange={handleInputChange}
              placeholder={t("other_documentation_option_placeholder")}
              className="input input-bordered input-warning w-full max-w-xs"
              required={otherDocumentation}
            />
          </label>
        )}
        {/* Financial Document */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("upload_financial_document")}</span>
          </div>
          <input
            type="file"
            name="financialFile"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            onChange={(e) => handleFileChange(e, setFinancialFile)}
            required
          />
        </label>
        {/* Assets */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("assets")}</span>
          </div>
          <input
            type="text"
            name="assets"
            value={formData.assets}
            onChange={handleInputChange}
            placeholder={t("assets_placeholder")}
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>
        {/* Revenue */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("revenue")}</span>
          </div>
          <input
            type="text"
            name="revenue"
            value={formData.revenue}
            onChange={handleInputChange}
            placeholder={t("revenue_placeholder")}
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>
        {/* Funding Amount */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("funding_amount")}</span>
          </div>
          <input
            type="text"
            name="fundingAmount"
            value={formData.fundingAmount}
            onChange={handleInputChange}
            placeholder={t("funding_amount_placeholder")}
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>
        {/* Funding Help */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("funding_help")}</span>
          </div>
          <textarea
            name="fundingHelp"
            value={formData.fundingHelp}
            onChange={handleInputChange}
            placeholder={t("funding_help_placeholder")}
            className="textarea textarea-warning w-full max-w-xs"
            required
          ></textarea>
        </label>
        {/* Return Plan */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("return_plan")}</span>
          </div>
          <textarea
            name="returnPlan"
            value={formData.returnPlan}
            onChange={handleInputChange}
            placeholder={t("return_plan_placeholder")}
            className="textarea textarea-warning w-full max-w-xs"
            required
          ></textarea>
        </label>
        {/* Return Date */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("return_date")}</span>
          </div>
          <input
            type="date"
            name="returndate"
            value={formData.returndate}
            onChange={handleInputChange}
            placeholder={t("return_date_placeholder")}
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>
        {/* Business Safety */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("business_safety")}</span>
          </div>
          <textarea
            name="businessSafety"
            value={formData.businessSafety}
            onChange={handleInputChange}
            placeholder={t("business_safety_placeholder")}
            className="textarea textarea-warning w-full max-w-xs"
            required
          ></textarea>
        </label>
        {/* Projected ROI */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("projected_roi")}</span>
          </div>
          <textarea
            name="projectedROI"
            value={formData.projectedROI}
            onChange={handleInputChange}
            placeholder={t("projected_roi_placeholder")}
            className="textarea textarea-warning w-full max-w-xs"
            required
          ></textarea>
        </label>
        {/* Min Investment Amount */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("minInvestment")}</span>
          </div>
          <textarea
            name="minInvestment"
            value={formData.minInvestment}
            onChange={handleInputChange}
            placeholder={t("minInvestment")}
            className="textarea textarea-warning w-full max-w-xs"
            required
          ></textarea>
        </label>
        {/* Additional Information */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("additional_information")}</span>
          </div>
          <textarea
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleInputChange}
            placeholder={t("additional_information_placeholder")}
            className="textarea textarea-bordered textarea-warning w-full max-w-xs"
            rows="4"
          />
        </label>
        {/* Submit Button */}
        <div className="form-control my-3">
          <button
            type="submit"
            className="btn btn-warning w-full max-w-xs"
            disabled={isLoading}
          >
            {isLoading ? t("submitting") : t("submit_button")}
          </button>
        </div>
        {isLoading && (
          <p className="text-center text-gray-500">{t("please_wait")}</p>
        )}
      </form>
    </div>
  );
};

export default FounderPost;
