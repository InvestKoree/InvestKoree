import blog1 from "../../assets/blog7.png";
import { useTranslation } from "react-i18next";

const BlogSeven = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Image */}
      <img src={blog1} className="w-full h-64 object-cover rounded-lg mb-6" />

      {/* Blog Content */}
      <h1 className="text-3xl font-bold mb-4">{t("blog7_title")}</h1>

      <p className="mb-6">{t("blog7_intro")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog7_know_what_you_want")}
      </h2>
      <p className="mb-6">{t("blog7_know_what_you_want_description")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog7_funding_amount")}</li>
        <li>{t("blog7_type_of_investor")}</li>
        <li>{t("blog7_investor_involvement")}</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog7_strong_business_plan")}
      </h2>
      <p className="mb-6">{t("blog7_strong_business_plan_intro")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog7_clear_objectives")}</li>
        <li>{t("blog7_market_analysis")}</li>
        <li>{t("blog7_financial_projections")}</li>
        <li>{t("blog7_unique_selling_proposition")}</li>
      </ul>
      <p className="mb-6">{t("blog7_investors_expectations")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog7_build_network")}</h2>
      <p className="mb-6">{t("blog7_build_network_description")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog7_leverage_digital_platforms")}
      </h2>
      <p className="mb-6">
        {t("blog7_leverage_digital_platforms_description")}
      </p>
      <ul className="list-disc ml-6">
        <li>{t("blog7_trusted_network")}</li>
        <li>{t("blog7_pitch_opportunities")}</li>
        <li>{t("blog7_showcase_tools")}</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog7_build_relationships")}
      </h2>
      <p className="mb-6">{t("blog7_build_relationships_description")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog7_stay_persistent")}</h2>
      <p className="mb-6">{t("blog7_stay_persistent_description")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog7_investkoree_partner")}
      </h2>
      <p className="mb-6">
        {t("blog7_investkoree_partner_intro")}
        <strong>InvestKoree</strong>, {t("blog7_investkoree_partner_continued")}
      </p>

      <h2 className="text-2xl font-bold mb-4">{t("blog7_call_to_action")}</h2>
      <p className="mb-6">{t("blog7_call_to_action_description")}</p>
    </div>
  );
};

export default BlogSeven;
