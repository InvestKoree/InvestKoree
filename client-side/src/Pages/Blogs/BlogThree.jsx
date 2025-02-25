import blog2 from "../../assets/blog2.jpg";
import { useTranslation } from "react-i18next";

const BlogThree = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Image */}
      <img src={blog2} className="w-full h-64 object-cover rounded-lg mb-6" />

      {/* Blog Content */}
      <h1 className="text-3xl font-bold mb-4">{t("blog3_title")}</h1>

      <p className="mb-6">{t("blog3_intro")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog3_renewable_energy")}</h2>
      <p className="mb-6">{t("blog3_renewable_energy_description")}</p>
      <p className="mb-6">
        <strong>{t("blog3_why_invest")}</strong>
      </p>
      <p className="mb-6"> {t("blog3_governments_incentives")}</p>
      <p className="mb-6"> {t("blog3_increased_demand")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog3_health_technology")}
      </h2>
      <p className="mb-6">{t("blog3_health_technology_description")}</p>
      <p className="mb-6">
        <strong>{t("blog3_why_invest")}</strong>
      </p>
      <p className="mb-6"> {t("blog3_expanding_market")}</p>
      <p className="mb-6"> {t("blog3_rapid_advancements")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog3_ecommerce_logistics")}
      </h2>
      <p className="mb-6">{t("blog3_ecommerce_logistics_description")}</p>
      <p className="mb-6">
        <strong>{t("blog3_why_invest")}</strong>
      </p>
      <p className="mb-6"> {t("blog3_growth_in_sales")}</p>
      <p className="mb-6"> {t("blog3_tech_integration")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog3_edtech")}</h2>
      <p className="mb-6">{t("blog3_edtech_description")}</p>
      <p className="mb-6">
        <strong>{t("blog3_why_invest")}</strong>
      </p>
      <p className="mb-6"> {t("blog3_demand_for_remote_education")}</p>
      <p className="mb-6"> {t("blog3_scalability")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog3_cybersecurity")}</h2>
      <p className="mb-6">{t("blog3_cybersecurity_description")}</p>
      <p className="mb-6">
        <strong>{t("blog3_why_invest")}</strong>
      </p>
      <p className="mb-6"> {t("blog3_rising_cyber_threats")}</p>
      <p className="mb-6"> {t("blog3_expanding_infrastructure")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog3_conclusion")}</h2>
      <p className="mb-6">{t("blog3_conclusion_description")}</p>

      <p className="mb-6">
        {t("blog3_investkoree_commitment")}
        <strong>InvestKoree</strong>,{" "}
        {t("blog3_investkoree_commitment_continued")}
      </p>
    </div>
  );
};

export default BlogThree;
