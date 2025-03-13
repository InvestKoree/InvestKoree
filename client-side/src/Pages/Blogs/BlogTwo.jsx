import blog3 from "../../assets/blog3.jpg";
import { useTranslation } from "react-i18next";

const BlogTwo = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Image */}
      <img
        src={blog3}
        className="w-full h-64 lg:object-cover rounded-lg mb-6"
      />

      {/* Blog Content */}
      <h1 className="text-3xl font-bold mb-4">{t("blog2_title")}</h1>

      <p className="mb-6">{t("blog2_intro")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog2_growing_domestic_market")}
      </h2>
      <p className="mb-6">{t("blog2_growing_domestic_market_description")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog2_thriving_sectors")}</h2>

      <h3 className="text-xl font-bold mb-2">
        {t("blog2_investment_opportunities")}
      </h3>
      <p className="mb-6">
        ● <strong>{t("blog2_agriculture")}</strong>:{" "}
        {t("blog2_agriculture_description")}
      </p>
      <p className="mb-6">
        ● <strong>{t("blog2_retail")}</strong>: {t("blog2_retail_description")}
      </p>
      <p className="mb-6">
        ● <strong>{t("blog2_real_estate")}</strong>:{" "}
        {t("blog2_real_estate_description")}
      </p>
      <p className="mb-6">
        ● <strong>{t("blog2_technology_startups")}</strong>:{" "}
        {t("blog2_technology_startups_description")}
      </p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog2_government_support")}
      </h2>
      <p className="mb-6">{t("blog2_government_support_description")}</p>
      <p className="mb-6"> {t("blog2_low_interest_loans")}</p>
      <p className="mb-6"> {t("blog2_subsidies")}</p>
      <p className="mb-6"> {t("blog2_simplified_processes")}</p>
      <p className="mb-6"> {t("blog2_tax_benefits")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog2_reduced_risks")}</h2>
      <p className="mb-6">{t("blog2_reduced_risks_description")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog2_building_communities")}
      </h2>
      <p className="mb-6">{t("blog2_building_communities_description")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog2_success_stories")}</h2>
      <p className="mb-6">{t("blog2_success_stories_description")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog2_affordable_investment")}
      </h2>
      <p className="mb-6">{t("blog2_affordable_investment_description")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog2_final_thoughts")}</h2>
      <p className="mb-6">{t("blog2_final_thoughts_description")}</p>

      <p className="mb-6">
        {t("blog2_investkoree_commitment")}
        <strong>InvestKoree</strong>,{" "}
        {t("blog2_investkoree_commitment_continued")}
      </p>
    </div>
  );
};

export default BlogTwo;
