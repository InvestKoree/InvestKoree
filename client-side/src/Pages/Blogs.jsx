import { useState } from "react";
import temp from "../assets/s2.jpg";

const Blogs = () => {
  const [expandedPost, setExpandedPost] = useState(null); // Track which post is expanded

  const togglePost = (postIndex) => {
    setExpandedPost(expandedPost === postIndex ? null : postIndex); // Toggle the clicked post
  };

  return (
    <div className="flex lg:flex-row gap-6 justify-center">
      <div className="card  blog-card bg-base-100 w-96 shadow-xl my-6">
        <figure className="px-10 pt-10">
          <img src={temp} className="rounded-xl" />
        </figure>
        <div
          className={`card-body items-center text-center ${
            expandedPost === 0 ? "expanded" : ""
          }`}
        >
          <h1 className="lg:text-4xl sm:text-2xl xxs:text-2xl xs:text-2xl font-bold mb-4">
            How to Find the Right Investor for Your Business
          </h1>
          <p className="text-left">
            Securing the right investment can be a game-changer for your
            business. But with so many potential investors out there, how do you
            choose the one who truly aligns with your goals? At InvestKoree, we
            understand that finding the right investor is not just about getting
            money—it’s about finding a partner who believes in your vision and
            can help take your business to the next level.
          </p>

          {expandedPost === 0 && ( // Check if this post is expanded
            <>
              {/* Expanded content for the first post */}
              <h2 className="text-2xl font-bold mt-8">
                Why the Right Investor Matters
              </h2>
              <p className="text-left">
                When seeking investors, it’s easy to focus on the amount of
                money they can provide. However, the right investor offers much
                more than just capital. They bring expertise, resources, and
                connections that can accelerate your growth. A good investor
                will be passionate about your business and share your long-term
                vision, supporting you through challenges and celebrating
                milestones along the way.
              </p>
              <h2 className="text-2xl font-bold mt-8">
                Key Traits to Look for in an Investor
              </h2>
              <ul className=" pl-6 mt-4">
                <li>
                  <strong>Industry Knowledge and Experience</strong>
                  <p className="text-left mb-2">
                    Investors with a deep understanding of your industry can
                    offer valuable insights and guidance. Whether it’s
                    navigating market trends or handling business challenges,
                    their experience can help steer you in the right direction.
                  </p>
                </li>
                <li>
                  <strong>Shared Vision and Goals</strong>
                  <p className="text-left mb-2">
                    It’s crucial that your investor understands your business
                    vision and shares similar goals. You don’t just want someone
                    who invests in your business—they should be excited about
                    its future and committed to seeing it grow.
                  </p>
                </li>
                <li>
                  <strong>Strong Network and Resources</strong>
                  <p className="text-left mb-2">
                    A good investor isn’t just a source of funding—they can also
                    open doors to new opportunities. Look for investors with a
                    strong network of contacts that can help grow your business,
                    from potential partners to key industry players.
                  </p>
                </li>
                <li>
                  <strong>Long-Term Support</strong>
                  <p className="text-left mb-2">
                    The right investor will be invested in your business
                    long-term. They’ll understand that success takes time and be
                    patient with your business’s growth trajectory.
                  </p>
                </li>
              </ul>

              <h2 className="text-2xl font-bold mt-8">
                How InvestKoree Helps You Find the Right Investor
              </h2>
              <p className="text-left">
                At InvestKoree, we take the guesswork out of the investor
                search. Our platform connects entrepreneurs and businesses with
                a network of verified investors who are eager to support
                promising ventures. We use a tailored matchmaking process to
                match your business with the best possible investors based on
                your specific needs and goals.
              </p>
              <p>
                <strong>Here’s how it works:</strong>
                <ul className="list-decimal pl-6 mt-4 text-left flex flex-col gap-2">
                  <li>
                    Connect with Us: Reach out to InvestKoree by signing up on
                    our platform or getting in touch with our team.
                  </li>
                  <li>
                    Matching Process: We carefully match your business with the
                    right investors, considering factors such as industry,
                    funding needs, and business stage.
                  </li>
                  <li>
                    Securing Investment: Once matched, you’ll have the
                    opportunity to pitch your business and secure the funding
                    necessary to grow.
                  </li>
                </ul>
              </p>

              <h2 className="text-2xl font-bold mt-8">Conclusion</h2>
              <p className="text-left">
                Finding the right investor is more than just securing
                capital—it’s about building a long-lasting partnership that
                supports your business’s growth and success. At InvestKoree,
                we’re dedicated to helping you connect with investors who are
                the perfect fit for your business. If you're ready to find the
                right investor and take your business to the next level, reach
                out to us today.
              </p>

              <div className="mt-8 text-left">
                <p className="">
                  Ready to take your business to the next level? Contact us
                  today to discover how InvestKoree can help you connect with
                  the right investors for your business growth!
                </p>
              </div>
            </>
          )}
          <div className="card-actions">
            <button
              onClick={() => togglePost(0)} // Pass the index of the post
              className="bg-salmon text-white px-6 py-2 rounded-md"
            >
              {expandedPost === 0 ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 w-96 shadow-xl my-6">
        <figure className="px-10 pt-10">
          <img src={temp} className="rounded-xl" />
        </figure>
        <div
          className={`card-body items-center text-center ${
            expandedPost === 1 ? "expanded" : ""
          }`}
        >
          <h1 className="lg:text-4xl sm:text-2xl xxs:text-2xl xs:text-2xl font-bold mb-4">
            How to Find the Right Investor for Your Business
          </h1>
          <p className="text-left">
            Securing the right investment can be a game-changer for your
            business. But with so many potential investors out there, how do you
            choose the one who truly aligns with your goals? At InvestKoree, we
            understand that finding the right investor is not just about getting
            money—it’s about finding a partner who believes in your vision and
            can help take your business to the next level.
          </p>

          {expandedPost === 1 && ( // Check if this post is expanded
            <>
              {/* Expanded content for the second post */}
              <h2 className="text-2xl font-bold mt-8">
                Why the Right Investor Matters
              </h2>
              <p className="text-left">
                When seeking investors, it’s easy to focus on the amount of
                money they can provide. However, the right investor offers much
                more than just capital. They bring expertise, resources, and
                connections that can accelerate your growth. A good investor
                will be passionate about your business and share your long-term
                vision, supporting you through challenges and celebrating
                milestones along the way.
              </p>
              <h2 className="text-2xl font-bold mt-8">
                Key Traits to Look for in an Investor
              </h2>
              <ul className=" pl-6 mt-4">
                <li>
                  <strong>Industry Knowledge and Experience</strong>
                  <p className="text-left mb-2">
                    Investors with a deep understanding of your industry can
                    offer valuable insights and guidance. Whether it’s
                    navigating market trends or handling business challenges,
                    their experience can help steer you in the right direction.
                  </p>
                </li>
                <li>
                  <strong>Shared Vision and Goals</strong>
                  <p className="text-left mb-2">
                    It’s crucial that your investor understands your business
                    vision and shares similar goals. You don’t just want someone
                    who invests in your business—they should be excited about
                    its future and committed to seeing it grow.
                  </p>
                </li>
                <li>
                  <strong>Strong Network and Resources</strong>
                  <p className="text-left mb-2">
                    A good investor isn’t just a source of funding—they can also
                    open doors to new opportunities. Look for investors with a
                    strong network of contacts that can help grow your business,
                    from potential partners to key industry players.
                  </p>
                </li>
                <li>
                  <strong>Long-Term Support</strong>
                  <p className="text-left mb-2">
                    The right investor will be invested in your business
                    long-term. They’ll understand that success takes time and be
                    patient with your business’s growth trajectory.
                  </p>
                </li>
              </ul>

              <h2 className="text-2xl font-bold mt-8">
                How InvestKoree Helps You Find the Right Investor
              </h2>
              <p className="text-left">
                At InvestKoree, we take the guesswork out of the investor
                search. Our platform connects entrepreneurs and businesses with
                a network of verified investors who are eager to support
                promising ventures. We use a tailored matchmaking process to
                match your business with the best possible investors based on
                your specific needs and goals.
              </p>
              <p>
                <strong>Here’s how it works:</strong>
                <ul className="list-decimal pl-6 mt-4 text-left flex flex-col gap-2">
                  <li>
                    Connect with Us: Reach out to InvestKoree by signing up on
                    our platform or getting in touch with our team.
                  </li>
                  <li>
                    Matching Process: We carefully match your business with the
                    right investors, considering factors such as industry,
                    funding needs, and business stage.
                  </li>
                  <li>
                    Securing Investment: Once matched, you’ll have the
                    opportunity to pitch your business and secure the funding
                    necessary to grow.
                  </li>
                </ul>
              </p>

              <h2 className="text-2xl font-bold mt-8">Conclusion</h2>
              <p className="text-left">
                Finding the right investor is more than just securing
                capital—it’s about building a long-lasting partnership that
                supports your business’s growth and success. At InvestKoree,
                we’re dedicated to helping you connect with investors who are
                the perfect fit for your business. If you're ready to find the
                right investor and take your business to the next level, reach
                out to us today.
              </p>

              <div className="mt-8 text-left">
                <p className="">
                  Ready to take your business to the next level? Contact us
                  today to discover how InvestKoree can help you connect with
                  the right investors for your business growth!
                </p>
              </div>
            </>
          )}
          <div className="card-actions">
            <button
              onClick={() => togglePost(1)} // Pass the index of the post
              className="bg-salmon text-white px-6 py-2 rounded-md"
            >
              {expandedPost === 1 ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 w-96 shadow-xl my-6">
        <figure className="px-10 pt-10">
          <img src={temp} className="rounded-xl" />
        </figure>
        <div
          className={`card-body items-center text-center ${
            expandedPost === 2 ? "expanded" : ""
          }`}
        >
          <h1 className="lg:text-4xl sm:text-2xl xxs:text-2xl xs:text-2xl font-bold mb-4">
            How to Find the Right Investor for Your Business
          </h1>
          <p className="text-left">
            Securing the right investment can be a game-changer for your
            business. But with so many potential investors out there, how do you
            choose the one who truly aligns with your goals? At InvestKoree, we
            understand that finding the right investor is not just about getting
            money—it’s about finding a partner who believes in your vision and
            can help take your business to the next level.
          </p>

          {expandedPost === 2 && ( // Check if this post is expanded
            <>
              {/* Expanded content for the third post */}
              <h2 className="text-2xl font-bold mt-8">
                Why the Right Investor Matters
              </h2>
              <p className="text-left">
                When seeking investors, it’s easy to focus on the amount of
                money they can provide. However, the right investor offers much
                more than just capital. They bring expertise, resources, and
                connections that can accelerate your growth. A good investor
                will be passionate about your business and share your long-term
                vision, supporting you through challenges and celebrating
                milestones along the way.
              </p>
              <h2 className="text-2xl font-bold mt-8">
                Key Traits to Look for in an Investor
              </h2>
              <ul className=" pl-6 mt-4">
                <li>
                  <strong>Industry Knowledge and Experience</strong>
                  <p className="text-left mb-2">
                    Investors with a deep understanding of your industry can
                    offer valuable insights and guidance. Whether it’s
                    navigating market trends or handling business challenges,
                    their experience can help steer you in the right direction.
                  </p>
                </li>
                <li>
                  <strong>Shared Vision and Goals</strong>
                  <p className="text-left mb-2">
                    It’s crucial that your investor understands your business
                    vision and shares similar goals. You don’t just want someone
                    who invests in your business—they should be excited about
                    its future and committed to seeing it grow.
                  </p>
                </li>
                <li>
                  <strong>Strong Network and Resources</strong>
                  <p className="text-left mb-2">
                    A good investor isn’t just a source of funding—they can also
                    open doors to new opportunities. Look for investors with a
                    strong network of contacts that can help grow your business,
                    from potential partners to key industry players.
                  </p>
                </li>
                <li>
                  <strong>Long-Term Support</strong>
                  <p className="text-left mb-2">
                    The right investor will be invested in your business
                    long-term. They’ll understand that success takes time and be
                    patient with your business’s growth trajectory.
                  </p>
                </li>
              </ul>

              <h2 className="text-2xl font-bold mt-8">
                How InvestKoree Helps You Find the Right Investor
              </h2>
              <p className="text-left">
                At InvestKoree, we take the guesswork out of the investor
                search. Our platform connects entrepreneurs and businesses with
                a network of verified investors who are eager to support
                promising ventures. We use a tailored matchmaking process to
                match your business with the best possible investors based on
                your specific needs and goals.
              </p>
              <p>
                <strong>Here’s how it works:</strong>
                <ul className="list-decimal pl-6 mt-4 text-left flex flex-col gap-2">
                  <li>
                    Connect with Us: Reach out to InvestKoree by signing up on
                    our platform or getting in touch with our team.
                  </li>
                  <li>
                    Matching Process: We carefully match your business with the
                    right investors, considering factors such as industry,
                    funding needs, and business stage.
                  </li>
                  <li>
                    Securing Investment: Once matched, you’ll have the
                    opportunity to pitch your business and secure the funding
                    necessary to grow.
                  </li>
                </ul>
              </p>

              <h2 className="text-2xl font-bold mt-8">Conclusion</h2>
              <p className="text-left">
                Finding the right investor is more than just securing
                capital—it’s about building a long-lasting partnership that
                supports your business’s growth and success. At InvestKoree,
                we’re dedicated to helping you connect with investors who are
                the perfect fit for your business. If you're ready to find the
                right investor and take your business to the next level, reach
                out to us today.
              </p>

              <div className="mt-8 text-left">
                <p className="">
                  Ready to take your business to the next level? Contact us
                  today to discover how InvestKoree can help you connect with
                  the right investors for your business growth!
                </p>
              </div>
            </>
          )}
          <div className="card-actions">
            <button
              onClick={() => togglePost(2)} // Pass the index of the post
              className="bg-salmon text-white px-6 py-2 rounded-md"
            >
              {expandedPost === 2 ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
