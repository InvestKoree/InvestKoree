import { Link } from "react-router-dom";

const FounderTerms = () => {
  return (
    <div className="h-[500px] mt-20 flex">
      <Link to="/founderdashboard">
        <input
          type="submit"
          className="post-btn lg:h-[10%] lg:w-[100px] sm:h-[60%] xs:h-[60%] xxs:h-[60%] sm:w-[30%] xs:w-[30%] xxs:w-[30%] relative left-56 bottom-9"
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
          make you investment very calculative or low. 10)
        </p>
      </div>
    </div>
  );
};

export default FounderTerms;
