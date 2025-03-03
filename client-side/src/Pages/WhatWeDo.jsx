import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation

const WhatWeDo = () => {
  const { t } = useTranslation(); // Initialize translation

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {t("aboutUs")}
        </h1>
        <h2 className="text-3xl font-bold text-gray-700 mb-6">
          {t("whatWeDo")}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          {t("investKoreeDescription")}
        </p>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("forEntrepreneurs")}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          {t("entrepreneursDescription")}
        </p>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("forInvestors")}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          {t("investorsDescription")}
        </p>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          {t("strategicConsulting")}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          {t("consultingDescription")}
        </p>
        <h2 className="text-3xl font-bold text-gray-700 mb-6">
          {t("whyChooseInvestKoree")}
        </h2>
        <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-6">
          <li className="mb-2">
            <strong className="text-gray-700">
              {t("tailoredConnections")}
            </strong>
          </li>
          <li className="mb-2">
            <strong className="text-gray-700">{t("localNetwork")}</strong>
          </li>
          <li className="mb-2">
            <strong className="text-gray-700">{t("expertSupport")}</strong>
          </li>
          <li>
            <strong className="text-gray-700">{t("commitmentToGrowth")}</strong>
          </li>
        </ul>
        <h2 className="text-3xl font-bold text-gray-700 mb-6">
          {t("letsBuildTheFuture")}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          {t("futureDescription")}
        </p>
        <a
          href="mailto:investkoree@gmail.com"
          className="text-blue-500 underline"
        >
          <p className="text-center text-gray-800 font-semibold mt-8">
            {t("contactUs")}
          </p>
        </a>
      </div>
    </div>
  );
};

export default WhatWeDo;
