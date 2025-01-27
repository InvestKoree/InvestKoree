import blog1 from "../../assets/blog8.jpeg";

const BlogEight = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Image */}
      <img src={blog1} className="w-full h-64 object-cover rounded-lg mb-6" />

      {/* Blog Content */}
      <h1 className="text-3xl font-bold mb-4">
        Navigating the Investment Landscape: How InvestKoree Connects
        Entrepreneurs and Investors
      </h1>

      <p className="mb-6">
        In today’s competitive business world, securing the right investment is
        essential for entrepreneurs looking to grow and scale. At{" "}
        <strong>InvestKoree</strong>, we serve as the bridge between innovative
        businesses and potential investors, fostering meaningful connections
        that lead to success.
      </p>

      <h2 className="text-2xl font-bold mb-4">For Entrepreneurs</h2>
      <p className="mb-6">
        Finding the right investor is about more than just funding; it’s about
        aligning with partners who can add strategic value. Here’s how you can
        prepare to attract the right investors:
      </p>

      <h3 className="text-xl font-bold mb-2">1. Polish Your Business Plan</h3>
      <p className="mb-6">
        Ensure your business plan clearly communicates your goals, market
        opportunity, and financial projections.
      </p>

      <h3 className="text-xl font-bold mb-2">2. Build Credibility</h3>
      <p className="mb-6">
        Create a professional online presence, showcasing your business’s
        strengths and achievements.
      </p>

      <h3 className="text-xl font-bold mb-2">3. Leverage InvestKoree</h3>
      <p className="mb-6">
        Use our platform to connect with investors who are interested in your
        industry and business stage.
      </p>

      <h2 className="text-2xl font-bold mb-4">For Investors</h2>
      <p className="mb-6">
        For investors, finding the right opportunities means looking beyond the
        surface. At
        <strong> InvestKoree</strong>, we simplify this process by providing
        access to pre-screened businesses with high potential.
      </p>

      <h3 className="text-xl font-bold mb-2">
        1. Define Your Investment Goals
      </h3>
      <p className="mb-6">
        Determine the industries, business stages, and regions you’re most
        interested in.
      </p>

      <h3 className="text-xl font-bold mb-2">2. Conduct Due Diligence</h3>
      <p className="mb-6">
        Evaluate a business’s financials, market potential, and team
        capabilities before committing.
      </p>

      <h3 className="text-xl font-bold mb-2">3. Use InvestKoree’s Tools</h3>
      <p className="mb-6">
        Our platform offers detailed analytics and business profiles to help you
        make informed decisions.
      </p>

      <h2 className="text-2xl font-bold mb-4">Why Choose InvestKoree?</h2>
      <p className="mb-6">
        InvestKoree is more than just a platform; it’s a gateway to building
        lasting, impactful partnerships. Whether you’re an entrepreneur seeking
        to scale or an investor looking for your next opportunity, we’re here to
        support your journey every step of the way.
      </p>
    </div>
  );
};

export default BlogEight;
