import { Link } from "react-router-dom";

const FounderTerms = () => {
  return (
    <div className="lg:h-[full] lg:w-[1200px] mt-20 flex lg:flex-row sm:flex-col xs:flex-col lg:mx-auto lg:gap-12 xxs:flex-col sm:px-4 xs:px-4 xxs:px-4 sm:mb-4 xs:mb-4 xxs:mb-4 sm:h-full xs:h-full xxs:h-full">
      <div>
        <Link to="/founderdashboard">
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
          Terms and Conditions (T&C) for Founders
        </h1>
        <p>
          1) You cannot raise more than $20,000 in the first round of funding.
        </p>
        <p>2) You must share updates on your raised funds on a weekly basis.</p>
        <p>
          3) If you raise $10,000 in a one-month period, you are required to
          repay $2,500 every week.
        </p>
        <p>
          4) You must share your Profit and Loss (P&L) balance sheet every week.
          Failure to do so will result in a $1,000 penalty per week.
        </p>
        <p>
          5) 10% of your raised amount will be deducted as a service fee. <br />
          For example, if you raise $100,000, you will receive $90,000 after
          deducting the $10,000 service fee. <br />
          However, you are still required to repay the full $100,000 (100%) to
          your investors.
        </p>
        <p>
          6) You must offer at least 5% profit-sharing or more to investors.
        </p>
        <p>
          7) Once funding is completed, projects and uploaded media cannot be
          edited or removed from the site.
        </p>
        <p>8) Projects cannot raise funds for charitable purposes.</p>
        <p>
          9) Funding is all-or-nothing—you will either receive the full amount
          or nothing at all. Make sure to calculate your investment requirements
          carefully.
        </p>
      </div>
    </div>
  );
};

export default FounderTerms;
