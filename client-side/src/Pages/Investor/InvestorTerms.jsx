import { Link } from "react-router-dom";

const InvestorTerms = () => {
  return (
    <div className="lg:h-[600px] lg:w-[1200px] mt-20 flex lg:flex-row sm:flex-col xs:flex-col lg:mx-auto lg:gap-12 xxs:flex-col sm:px-4 xs:px-4 xxs:px-4 sm:mb-4 xs:mb-4 xxs:mb-4 sm:h-full xs:h-full xxs:h-full">
      <div>
        <Link to="/investordashboard">
          <input
            type="submit"
            className="post-btn lg:h-[7%] lg:w-[100px] sm:h-[80%] xs:h-[80%] xxs:h-[80%] sm:w-[20%] xs:w-[20%] xxs:w-[20%] sm:px-4 xs:px-4 xxs:px-4 sm:py-2 xs:py-2 xxs:py-2"
            name="founder-post"
            value="Back"
          />
        </Link>
      </div>
      <div className="mx-auto flex flex-col gap-8">
        <h1 className="font-extrabold text-xl">
          Investor Terms and Conditions: T&C
        </h1>
        <p>
          1) The minimum investment amount is one thousand or its multiples.
        </p>
        <p>
          2) There will be a maturity period for receiving profits. If you
          withdraw funds before the maturity period, you will not receive any
          profit, and a platform usage fee will apply.
        </p>
        <p>
          3) Investments are entirely at your own risk. We do not provide any
          guarantees. Please conduct thorough research and analysis before
          investing.
        </p>
        <p>
          4) Investment opportunities are offered on a first-come, first-served
          basis.
        </p>
      </div>
    </div>
  );
};

export default InvestorTerms;
