import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Overview = () => {
  const { t } = useTranslation(); // Initialize translation

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {t("aboutUs")}
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("overview")}
        </h2>
        <p
          className="text-gray-600 leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: t("investKoreeoverDescription") }}
        />
        <p
          className="text-gray-600 leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: t("startupDescription") }}
        />
      </div>
    </div>
  );
};

export default Overview;
