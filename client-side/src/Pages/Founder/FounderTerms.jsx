import { Link } from "react-router-dom";

const FounderTerms = () => {
  return (
    <div className="lg:h-[full] mt-20 flex lg:flex-row sm:flex-col  xs:flex-col  xxs:flex-col  sm:px-4  xs:px-4  xxs:px-4 sm:mb-4  xs:mb-4  xxs:mb-4 sm:h-full  xs:h-full  xxs:h-full   ">
      <Link to="/founderdashboard">
        <input
          type="submit"
          className="post-btn lg:h-[7%] lg:w-[100px] sm:h-[70%] xs:h-[70%] xxs:h-[70%] sm:w-[20%] xs:w-[20%] xxs:w-[20%] sm:px-4 xs:px-4 xxs:px-4  relative lg:left-56 lg:bottom-9 md:left-56"
          name="founder-post"
          value="Back"
        />
      </Link>
      <div className="mx-auto flex flex-col gap-8">
        <h1 className="font-extrabold text-xl">
          For Founder terms and conditons: T&C
        </h1>
        <p>1) Yor cant rise mor then 20thousend for the first time .</p>
        <p>2) You have to sahre your rising money every weekly.</p>
        <p>
          3) Suppose you rise 10thousend for one month priod so you have to give
          back every week amout of 2.5 thousend.
        </p>
        <p>
          4) You have to share your p&l(profit and loses) balance shit every
          weekly in cease your don’t do that there will be planty for one
          thousend for every week.
        </p>
        <p>
          5) 10 parcesent of your rising amount will be deduct as our charging
          fee. <br /> Suppose you rises 100 thousend you will be get 90 thousend
          rest of the 10 thousend will be deduct for our charge fee. <br />
          But you have to give back 100 thouensd or 100 % to the investors.
        </p>
        <p>6) You have to give atleast 5% or more profit sharing.</p>
        <p>
          7) After funding is completed, projects and uploaded media cannot be
          edited or removed from the site.
        </p>
        <p>8) Projects can't fundraise for charity.</p>
        <p>
          9) There will be full funding you will get or not and no inbetween so
          make you investment very calculative or low.
        </p>
      </div>
    </div>
  );
};

export default FounderTerms;
