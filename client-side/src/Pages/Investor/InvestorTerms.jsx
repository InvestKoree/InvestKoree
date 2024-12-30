import { Link } from "react-router-dom";

const InvestorTerms = () => {
  return (
    <div className="lg:h-[full] lg:w-[1200px] mt-20 flex lg:flex-row sm:flex-col  xs:flex-col lg:mx-auto lg:gap-12  xxs:flex-col  sm:px-4  xs:px-4  xxs:px-4 sm:mb-4  xs:mb-4  xxs:mb-4 sm:h-full  xs:h-full  xxs:h-full ">
      <div>
        <Link to="/investordashboard">
          <input
            type="submit"
            className="post-btn lg:h-[15%] lg:w-[100px] sm:h-[80%] xs:h-[80%] xxs:h-[80%] sm:w-[20%]  xs:w-[20%] xxs:w-[20%] sm:px-4 xs:px-4 xxs:px-4  sm:py-2 xs:py-2 xxs:py-2"
            name="founder-post"
            value="Back"
          />
        </Link>
      </div>
      <div className="mx-auto flex flex-col gap-8">
        <h1 className="font-extrabold text-xl">
          For investor terms and conditons: T&C
        </h1>
        <p>1) Have to minimum investments of ONE thousends of its multiple.</p>
        <p>
          2) There will be a mature time of getting profit if you getting before
          the mature time you will get no profit and there will be a chrage for
          using our platform.{" "}
        </p>
        <p>
          3) For your investment amount its will be all your gurantee and we
          will will have no guaranteed so do your own researcha and analysis
          your own.
        </p>
        <p>
          4) The investment opportunity is based on a first come first serve
          basis.
        </p>
      </div>
    </div>
  );
};

export default InvestorTerms;
