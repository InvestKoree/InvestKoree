import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import temp from "../assets/s2.jpg";
const LatestPost = ({ item }) => {
  console.log("Item data:", item);

  const {
    address,
    _id,
    businessSector,
    fundingAmount,
    businessName,
    businessPicture,
    // This should now contain filenames
  } = item;

  const firstImage =
    businessPicture && businessPicture.length > 0
      ? `${businessPicture[0]}`
      : temp;
  // const [imageUrls, setImageUrls] = useState([]);
  // const [imageLoaded, setImageLoaded] = useState(false);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     console.log("Fetching images for filenames:", businessPictures);
  //     const urls = await Promise.all(
  //       businessPictures.map(async (filename) => {
  //         try {
  //           const trimmedFilename = filename.trim();
  //           const response = await fetch(
  //             `${API_URL}/images/filename/${trimmedFilename}`
  //           );
  //           if (response.ok) {
  //             const blob = await response.blob();
  //             return URL.createObjectURL(blob);
  //           } else {
  //             return null;
  //           }
  //         } catch (error) {
  //           console.error(
  //             `Error fetching image with filename ${filename}:`,
  //             error
  //           );
  //           return null;
  //         }
  //       })
  //     );
  //     setImageUrls(urls.filter((url) => url));
  //   };

  //   if (businessPictures.length > 0) {
  //     fetchImages();
  //   }

  //   return () => {
  //     imageUrls.forEach((url) => URL.revokeObjectURL(url));
  //   };
  // }, [businessPictures]);

  // useEffect(() => {
  //   if (imageUrls.length > 0) {
  //     const link = document.createElement("link");
  //     link.rel = "preload";
  //     link.href = imageUrls[0]; // Preload the first image
  //     link.as = "image";
  //     document.head.appendChild(link);
  //   }
  // }, [imageUrls]);

  // const fundingPercentage = 100;
  const leftForFund = fundingAmount - 0;

  return (
    <div className="mx-auto">
      <Link to={`/projectdetail/${_id}`}>
        <div className="bg-white h-[450px] lg:mt-24 lg:w-[340px] sm:w-[290px] xxs:w-[320px] xs:w-[320px] rounded-2xl shadow-md overflow-hidden">
          <img
            src={firstImage}
            alt="Fundraiser"
            className="w-full h-48 object-cover"
            loading="lazy"
          />
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
              <p className="">Funded:0 tk</p>
              <p className="">Left for fund: {fundingAmount}</p>
            </div>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-salmon h-2.5 rounded-full"
                  style={{ width: `0%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <i className="fas fa-box lg:mr-1 xxs:text-xs xs:text-xs sm:text-xs"></i>
                  Raised: 0 taka
                </div>
                <div>
                  <i className="fas fa-bullseye lg:mr-1 xxs:text-xs xs:text-xs sm:text-xs"></i>
                  Goal:{fundingAmount} taka
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
    businessPictures: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensure this is an array of strings (filenames)
  }).isRequired,
};

export default LatestPost;
