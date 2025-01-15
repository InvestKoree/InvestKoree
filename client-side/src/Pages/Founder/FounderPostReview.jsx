import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FounderPostReview = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const { post } = location.state; // Get the post data
  const [formData, setFormData] = useState(post || null); // Initialize form data with post data
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const navigate = useNavigate();
  const [nidFile, setNidFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [otherOption, setOtherOption] = useState(false);
  const [otherDocumentation, setOtherDocumentation] = useState(false);
  const [businessPictures, setBusinessPictures] = useState([]);
  const [tinFile, setTinFile] = useState(null);
  const [taxFile, setTaxFile] = useState(null);
  const [tradeLicenseFile, setTradeLicenseFile] = useState(null);
  const [bankStatementFile, setBankStatementFile] = useState(null);
  const [securityFile, setSecurityFile] = useState(null);
  const [financialFile, setFinancialFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleRemovePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/adminpost/pending/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== postId)); // Remove the deleted post from the state
    } catch (error) {
      toast.error("Error removing post: " + error.message);
    }
  };

  useEffect(() => {
    // Set initial form data from post data
    if (post) {
      setFormData(post);
      setBusinessPictures(post.businessPictures || []);
      setVideoFile(post.videoFile || null);
      setNidFile(post.nidFile || null);
      setTinFile(post.tinFile || null);
      setTaxFile(post.taxFile || null);
      setTradeLicenseFile(post.tradeLicenseFile || null);
      setBankStatementFile(post.bankStatementFile || null);
      setSecurityFile(post.securityFile || null);
      setFinancialFile(post.financialFile || null);
    }
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
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

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setBusinessPictures(files);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const postData = new FormData();

      // Append regular form fields (text fields) to FormData
      Object.keys(formData).forEach((key) => {
        postData.append(key, formData[key]);
      });

      // Upload business pictures to Cloudinary
      for (const picture of businessPictures) {
        const pictureFormData = new FormData();
        pictureFormData.append("file", picture);
        pictureFormData.append("upload_preset", "uploadpreset");

        const uploadResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/dhqmilgfz/image/upload`,
          pictureFormData
        );
        postData.append("businessPictures", uploadResponse.data.secure_url);
      }

      // Upload video to Cloudinary
      if (videoFile) {
        const videoFormData = new FormData();
        videoFormData.append("file", videoFile);
        videoFormData.append("upload_preset", "uploadpreset");

        const videoUploadResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/dhqmilgfz/video/upload`,
          videoFormData
        );
        postData.append("video", videoUploadResponse.data.secure_url);
      }

      // Upload other files
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
          fileFormData.append("upload_preset", "uploadpreset");

          const uploadResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/dhqmilgfz/upload`,
            fileFormData
          );
          postData.append(name, uploadResponse.data.secure_url);
        }
      }

      // Send the complete FormData to your API
      const token = localStorage.getItem("token");
      const postId = post._id;

      const response = await axios.put(
        `${API_URL}/adminpost/pendingpost/${postId}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the response status is 200
      if (response.status === 200) {
        toast.success("Post has been updated successfully!");
        navigate("/founderpending");
        await handleRemovePost(post._id);
      } else {
        // Handle unexpected response status
        toast.error(
          `Failed to submit form: ${response.data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(
          `Error: ${error.response.data.message || "Failed to update post."}`
        );
      } else if (error.request) {
        // Request was made but no response was received
        toast.error(
          "No response received from the server. Please check your network connection."
        );
      } else {
        // Something happened in setting up the request
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-5 text-center">Edit Post</h2>
      <form
        onSubmit={handleSubmit}
        method="POST"
        encType="multipart/form-data"
        className="mb-10"
      >
        {/* Business Name */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">Business Name</span>
          </div>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            placeholder="Type here"
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>

        {/* Description */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">Details of your Business</span>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Type here"
            className="textarea textarea-bordered textarea-warning w-full max-w-xs"
            rows="4"
            required
          />
        </label>

        {/* Email */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Type here"
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>

        {/* Address */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Type here"
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>

        {/* Phone Number */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">Phone Number</span>
          </div>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Type here"
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>

        {/* Business Pictures */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">
              Upload Your Business's Picture Here
            </span>
          </div>
          <input
            type="file"
            name="businessPicture"
            accept="image/*"
            onChange={handleMultipleFileChange}
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            multiple
          />
        </label>
        <div className="my-3">
          {post.businessPicture && post.businessPicture.length > 0 && (
            <div>
              <h3 className="font-bold">
                Previously Uploaded Business Pictures:
              </h3>
              <ul>
                {post.businessPicture.map((picture, index) => (
                  <li key={index} className="text-gray-700">
                    {picture.split("/").pop()}{" "}
                    {/* Display only the file name */}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Video */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">
              Upload Your Business's Video Here (Max 50mb)
            </span>
          </div>
          <input
            type="file"
            accept="video/*"
            name="video"
            onChange={(e) => handleVideoChange(e, "videoFile")}
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
          />
        </label>
        <div className="my-3">
          {post.videoFile && (
            <div>
              <h3 className="font-bold lg:mr-24">Previously Uploaded Video:</h3>
              <p className="text-gray-700">
                {post.video.split("/").pop()}
              </p>{" "}
              {/* Display only the file name */}
            </div>
          )}
        </div>
        {/* Business Category */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">What Category Of Business</span>
          </div>
          <select
            name="businessCategory"
            value={formData.businessCategory}
            onChange={handleInputChange}
            className="select select-warning w-full max-w-xs"
            required
          >
            <option disabled value="">
              Pick a Category
            </option>
            <option value="Shariah">Shariah</option>
            <option value="Stocks">Stocks</option>
            <option value="Fixed Return">Fixed Return</option>
          </select>
        </label>

        {/* Business Sector */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">What Sector Of Business</span>
          </div>
          <select
            name="businessSector"
            value={formData.businessSector}
            onChange={handleInputChange}
            className="select select-warning w-full max-w-xs"
            required
          >
            <option disabled value="">
              Pick a Sector
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
            <span className="label-text">Investment Duration</span>
          </div>
          <select
            name="investmentDuration"
            value={formData.investmentDuration}
            onChange={handleInputChange}
            className="select select-warning w-full max-w-xs"
            required
          >
            <option disabled value="">
              Pick a Duration
            </option>
            <option value="short-term">short-term (2 weeks to 1 month)</option>
            <option value="mid-term">mid-term (2 months to 6 months)</option>
            <option value="long-term">long-term (6 months+)</option>
          </select>
        </label>
        {/* NID Copy */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">Upload Your NID Copy</span>
          </div>
          <input
            type="file"
            name="nidCopy"
            onChange={(e) => handleFileChange(e, setNidFile)}
            required
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
          />
        </label>
        <div className="my-3">
          {post.nidCopy && (
            <div>
              <h3 className="font-bold lg:mr-16">
                Previously Uploaded NID Copy:
              </h3>
              <p className="text-gray-700">{post.nidCopy.split("/").pop()}</p>
            </div>
          )}
        </div>

        {/* TIN Copy */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">Upload Your TIN</span>
          </div>
          <input
            type="file"
            name="tinCopy"
            required
            onChange={(e) => handleFileChange(e, setTinFile)}
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
          />
        </label>
        <div className="my-3">
          {post.tinCopy && (
            <div>
              <h3 className="font-bold lg:mr-28">Previously Uploaded TIN:</h3>
              <p className="text-gray-700">{post.tinCopy.split("/").pop()}</p>
            </div>
          )}
        </div>
        {/* Tax Information */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">Upload Your Tax Information</span>
          </div>
          <input
            type="file"
            name="taxCopy"
            required
            onChange={(e) => handleFileChange(e, setTaxFile)}
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
          />
        </label>
        <div className="my-3">
          {post.taxCopy && (
            <div>
              <h3 className="font-bold lg:mr-6">
                Previously Uploaded Tax Information:
              </h3>
              <p className="text-gray-700">{post.taxCopy.split("/").pop()}</p>
            </div>
          )}
        </div>

        {/* Trade License */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">Upload Your Trade License Copy</span>
          </div>
          <input
            type="file"
            name="tradeLicense"
            required
            onChange={(e) => handleFileChange(e, setTradeLicenseFile)}
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
          />
        </label>
        <div className="my-3">
          {post.tradeLicense && (
            <div>
              <h3 className="font-bold lg:mr-10">
                Previously Uploaded Trade License:
              </h3>
              <p className="text-gray-700">
                {post.tradeLicense.split("/").pop()}
              </p>
            </div>
          )}
        </div>

        {/* Bank Statement */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">
              Upload Your Recent Bank Statement
            </span>
          </div>
          <input
            type="file"
            name="bankStatement"
            required
            onChange={(e) => handleFileChange(e, setBankStatementFile)}
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
          />
        </label>
        <div className="my-3">
          {post.bankStatement && (
            <div>
              <h3 className="font-bold lg:mr-6">
                Previously Uploaded Bank Statement:
              </h3>
              <p className="text-gray-700">
                {post.bankStatement.split("/").pop()}
              </p>
            </div>
          )}
        </div>

        {/* Security Option */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">Pick a Security Option:</span>
          </div>
          <select
            name="securityOption"
            value={formData.securityOption}
            onChange={handleSecurityOptionChange}
            className="select select-warning w-full max-w-xs"
            required
          >
            <option disabled value="">
              Pick a Security
            </option>
            <option value="Property">Property</option>
            <option value="Equipment">Equipment</option>
            <option value="Inventory">Inventory</option>
            <option value="Other">Other</option>
          </select>
        </label>

        {/* Other Security Option */}
        {otherOption && (
          <label className="form-control my-3 w-full max-w-xs">
            <div className="label">
              <span className="label-text">Specify Other Security Option</span>
            </div>
            <input
              type="text"
              name="otherSecurity"
              value={formData.otherSecurity}
              onChange={handleInputChange}
              placeholder="Type here"
              className="input input-bordered input-warning w-full max-w-xs"
              required={otherOption}
            />
          </label>
        )}

        {/* Security File */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">Upload The Security File</span>
          </div>
          <input
            type="file"
            name="securityFile"
            required
            onChange={(e) => handleFileChange(e, setSecurityFile)}
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
          />
        </label>
        <div className="my-3">
          {post.securityFile && (
            <div>
              <h3 className="font-bold lg:mr-12">
                Previously Uploaded Security File:
              </h3>
              <p className="text-gray-700">
                {post.securityFile.split("/").pop()}
              </p>
            </div>
          )}
        </div>
        {/* Documentation Option */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">Pick a Documentation Option</span>
          </div>
          <select
            name="documentationOption"
            value={formData.documentationOption}
            onChange={handleDocumentationOptionChange}
            className="select select-warning w-full max-w-xs"
            required
          >
            <option disabled value="">
              Pick a Documentation
            </option>
            <option value="Audit Report">Audit Report</option>
            <option value="Income Statement">Income Statement</option>
            <option value="Financial Projections">Financial Projections</option>
            <option value="Other">Other</option>
          </select>
        </label>

        {/* Other Documentation Option */}
        {otherDocumentation && (
          <label className="form-control my-3 w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                Specify Other Documentation Option
              </span>
            </div>
            <input
              type="text"
              name="otherDocumentation"
              value={formData.otherDocumentation}
              onChange={handleInputChange}
              placeholder="Type here"
              className="input input-bordered input-warning w-full max-w-xs"
              required={otherDocumentation}
            />
          </label>
        )}
        {/* Financial Document */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">Upload The Financial Document</span>
          </div>
          <input
            type="file"
            name="financialFile"
            required
            onChange={(e) => handleFileChange(e, setSecurityFile)}
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
          />
        </label>
        <div className="my-3">
          {post.financialFile && (
            <div>
              <h3 className="font-bold">
                Previously Uploaded Financial Document:
              </h3>
              <p className="text-gray-700">
                {post.financialFile.split("/").pop()}
              </p>
            </div>
          )}
        </div>

        {/* Assets */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">What Is Your Assets Worth</span>
          </div>
          <input
            type="text"
            name="assets"
            value={formData.assets}
            onChange={handleInputChange}
            placeholder="Type here"
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>

        {/* Revenue */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">What Is Your Revenue Worth</span>
          </div>
          <input
            type="text"
            name="revenue"
            value={formData.revenue}
            onChange={handleInputChange}
            placeholder="Type here"
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>

        {/* Funding Amount */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">
              How Much Funding Are You Looking For
            </span>
          </div>
          <input
            type="text"
            name="fundingAmount"
            value={formData.fundingAmount}
            onChange={handleInputChange}
            placeholder="Type here"
            className="input input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>

        {/* Funding Help */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">How Would The Funding Help You</span>
          </div>
          <textarea
            name="fundingHelp"
            value={formData.fundingHelp}
            onChange={handleInputChange}
            placeholder="Type here"
            className="textarea textarea-bordered textarea-warning w-full max-w-xs"
            required
          />
        </label>

        {/* Return Plan */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">
              How Do You Plan To Return The Investment
            </span>
          </div>
          <textarea
            name="returnPlan"
            value={formData.returnPlan}
            onChange={handleInputChange}
            placeholder="Type here"
            className="textarea textarea-bordered textarea-warning w-full max-w-xs"
            required
          />
        </label>

        {/* Return Date */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">When is Your Return Date</span>
          </div>
          <textarea
            name="returndate"
            value={formData.returndate}
            onChange={handleInputChange}
            placeholder="Type here"
            className="textarea textarea-bordered textarea-warning w-full max-w-xs"
            required
          />
        </label>

        {/* Business Safety */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">
              How Safe Do You Consider Your Business To Be?
            </span>
          </div>{" "}
          <textarea
            name="businessSafety"
            value={formData.businessSafety}
            onChange={handleInputChange}
            placeholder="Type here"
            className="textarea textarea-bordered textarea-warning w-full max-w-xs"
            required
          />
        </label>

        {/* Projected ROI */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your projected ROI</span>
          </div>
          <textarea
            name="projectedROI"
            value={formData.projectedROI}
            onChange={handleInputChange}
            placeholder="Type here"
            className="textarea textarea-bordered textarea-warning w-full max-w-xs"
            required
          />
        </label>

        {/* Additional Information */}
        <label className="form-control my-3 w-full max-w-xs">
          <div className="label">
            <span className="label-text">Additional Information</span>
          </div>
          <textarea
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleInputChange}
            placeholder="Type here"
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
            {isLoading ? "Submitting..." : "Resubmit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FounderPostReview;
