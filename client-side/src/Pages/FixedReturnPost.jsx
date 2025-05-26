import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import temp from "../assets/s2.jpg";

const FixedReturnPost = ({ item }) => {
  const {
    address,
    _id,
    // funded,
    // left_for_fund,
    // raised,
    businessSector,
    fundingAmount,
    businessName,
    businessPicture,
    raisedAmount,
  } = item;
  const firstImage =
    businessPicture && businessPicture.length > 0
      ? `${businessPicture[0]}`
      : temp;
  const safeNumber = (strOrNum) => {
    if (typeof strOrNum === "string") {
      return Number(strOrNum.replace(/,/g, ""));
    }
    return strOrNum;
  };
  const raisedAmountNum = safeNumber(raisedAmount);
  const fundingAmountNum = safeNumber(fundingAmount);

  const fundingPercentage = (raisedAmountNum / fundingAmountNum) * 100;
  const leftForFund = fundingAmountNum - raisedAmountNum;

  return (
    <div className="mx-auto">
      <Link to={`/projectdetail/${_id}`}>
        <div
          className="bg-white h-[450px] lg:my-24  lg:w-[320px] sm:w-[290px] xs:w-[290px] xxs:w-[290px]  rounded-2xl shadow-md overflow-hidden
        transform transition-transform duration-300 ease-in-out delay-150 hover:scale-105"
        >
          <img
            src={firstImage} // Fallback image
            alt="Fundraiser"
            className="w-full h-48 object-cover"
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
              <p className="">Funded: {raisedAmount}tk</p>
              <p className="">Left for fund: {leftForFund}tk</p>
            </div>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-salmon h-2.5 rounded-full"
                  style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <i className="fas fa-box lg:mr-1 xxs:text-xs xs:text-xs sm-text-xs"></i>
                  Raised: {raisedAmount}taka
                </div>
                <div>
                  <i className="fas fa-bullseye lg:mr-1 xxs:text-xs xs:text-xs sm-text-xs"></i>
                  Goal:
                  {fundingAmount} taka
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

FixedReturnPost.propTypes = {
  item: PropTypes.shape({
    address: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    // funded: PropTypes.string.isRequired,
    // left_for_fund: PropTypes.string.isRequired,
    // raised: PropTypes.number.isRequired,
    businessSector: PropTypes.string.isRequired,

    fundingAmount: PropTypes.number.isRequired,
    businessName: PropTypes.string.isRequired,
  }).isRequired,
};

export default FixedReturnPost;
