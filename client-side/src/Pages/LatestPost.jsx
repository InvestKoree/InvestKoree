const LatestPost = ({ item }) => {
  console.log("Item data:", item);

  const {
    address,
    _id,
    businessSector,
    fundingAmount: fundingAmountString,
    businessName,
    businessPictures, // This should now contain filenames
  } = item;

  const [imageUrls, setImageUrls] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchImages = async () => {
      console.log("Fetching images for filenames:", businessPictures);
      const urls = await Promise.all(
        businessPictures.map(async (filename) => {
          try {
            const trimmedFilename = filename.trim();
            const response = await fetch(
              `${API_URL}/images/filename/${trimmedFilename}`
            );
            if (response.ok) {
              const blob = await response.blob();
              return URL.createObjectURL(blob);
            } else {
              return null;
            }
          } catch (error) {
            console.error(
              `Error fetching image with filename ${filename}:`,
              error
            );
            return null;
          }
        })
      );
      setImageUrls(urls.filter((url) => url));
    };

    if (businessPictures.length > 0) {
      fetchImages();
    }

    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [businessPictures]);

  useEffect(() => {
    if (imageUrls.length > 0) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = imageUrls[0]; // Preload the first image
      link.as = "image";
      document.head.appendChild(link);
    }
  }, [imageUrls]);

  const fundingAmount = parseFloat(fundingAmountString);
  const fundingPercentage = 100;
  const leftForFund = fundingAmount - 50000;

  return (
    <div className="mx-auto">
      <Link to={`/projectdetail/${_id}`}>
        <div className="bg-white h-[450px] lg:mt-24 lg:w-[320px] sm:w-[290px] rounded-2xl shadow-md overflow-hidden">
          {imageUrls.length > 0 ? (
            <img
              src={imageUrls[0]}
              alt="Fundraiser"
              className={`w-full h-48 object-cover ${
                imageLoaded ? "" : "blur-sm"
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)} // Triggered when image is fully loaded
            />
          ) : (
            <img
              src={temp}
              alt="Fundraiser"
              className="w-full h-48 object-cover"
              loading="lazy"
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
              <p className="">Funded: 50000</p>
              <p className="">Left for fund: {leftForFund}</p>
            </div>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-salmon h-2.5 rounded-full"
                  style={{ width: `80%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <i className="fas fa-box lg:mr-1 xxs:text-xs xs:text-xs sm:text-xs"></i>
                  Raised: 50000 taka
                </div>
                <div>
                  <i className="fas fa-bullseye lg:mr-1 xxs:text-xs xs:text-xs sm:text-xs"></i>
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

export default LatestPost;
