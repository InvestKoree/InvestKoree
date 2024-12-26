const Overview = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          ABOUT US
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Overview</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          At <span className="font-semibold text-gray-800">InvestKoree</span>,
          we specialize in bridging the gap between visionary entrepreneurs and
          forward-thinking investors in Bangladesh. Our platform serves as a
          dynamic hub for fostering partnerships that drive innovation, economic
          growth, and transformative success within the local economy.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Whether you are an ambitious startup seeking capital or an investor
          looking for high-potential opportunities,{" "}
          <span className="font-semibold text-gray-800">InvestKoree</span>{" "}
          connects the dots, empowering businesses in Bangladesh to unlock their
          full potential.
        </p>
      </div>
    </div>
  );
};

export default Overview;
