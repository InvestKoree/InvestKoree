import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import temp from "../assets/s2.jpg";

const LatestPost = ({ item }) => {
  const {
    address,
    _id,
    businessSector,
    fundingAmount: fundingAmountString,
    businessName,
    businessPictures,
    // nidFile,
  } = item;

  const [imageUrls, setImageUrls] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  useEffect(() => {
    const fetchImages = async () => {
      console.log("Fetching images for IDs:", businessPictures); // Log the IDs
      const urls = await Promise.all(
        businessPictures.map(async (_id) => {
          try {
            const response = await fetch(`${API_URL}/files/${_id}`); // Ensure API_URL is defined
            console.log(`Fetching image with ID ${_id}:`, response); // Log the response
            if (response.ok) {
              const blob = await response.blob();
              return URL.createObjectURL(blob); // Create a URL for the blob
            } else {
              console.error(`Failed to fetch image with ID ${_id}`);
              return null; // Handle error case
            }
          } catch (error) {
            console.error(`Error fetching image with ID ${_id}:`, error);
            return null; // Handle error case
          }
        })
      );
      setImageUrls(urls.filter((url) => url)); // Filter out any null values
    };

    if (businessPictures.length > 0) {
      fetchImages();
    }

    // Cleanup function to revoke object URLs
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [businessPictures]);
  // Calculate funding percentage for progress bar
  const fundingAmount = parseFloat(fundingAmountString);
  const fundingPercentage = (50000 / fundingAmount) * 100;
  const leftForFund = fundingAmount - 50000;

  return (
    <div className="mx-auto">
      <Link to={`/projectdetail/${_id}`}>
        <div className="bg-white h-[450px] lg:mt-24 lg:w-[320px] sm:w-[290px] xs:w-[290px] xxs:w-[290px] rounded-2xl shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out delay-150 hover:scale-105">
          {imageUrls.length > 0 ? (
            <img
              src={imageUrls[0]} // Display the first image
              alt="Fundraiser"
              className="w-full h-48 object-cover"
            />
          ) : (
            <img
              src={temp} // Default image if no pictures available
              alt="Fundraiser"
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <div className="text-xs font-medium text-gray-500 mb-2">
              <span className="inline-block bg-salmon text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">
                {businessSector}
              </span>
              <span>
                <i className="fas fa-map-marker-alt mr-1"></i> {address}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{businessName}</h3>
            <div className="flex flex-row my-4 justify-between">
              <p className=""> Funded: 50000</p>
              <p className="">Left for fund: {leftForFund}</p>
            </div>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-salmon h-2.5 rounded-full"
                  style={{ width: `${fundingPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <i className="fas fa-box lg:mr-1 xxs:text-xs xs:text-xs sm-text-xs"></i>
                  Raised: 50000 taka
                </div>
                <div>
                  <i className="fas fa-bullseye lg:mr-1 xxs:text-xs xs:text-xs sm-text-xs"></i>
                  Goal: {fundingAmount} taka
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

LatestPost.propTypes = {
  item: PropTypes.shape({
    address: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    businessSector: PropTypes.string.isRequired,
    fundingAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    businessName: PropTypes.string.isRequired,
    businessPictures: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensure this is an array of strings (IDs)
  }).isRequired,
};

export default LatestPost;
