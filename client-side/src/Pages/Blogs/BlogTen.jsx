import blog1 from "../../assets/blogten.png";
import { useTranslation } from "react-i18next";

const BlogTen = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Image */}
      <img src={blog1} className="w-full h-64 object-cover rounded-lg mb-6" />

      {/* Blog Content */}
      <h1 className="text-3xl font-bold mb-4">{t("blog10_title")}</h1>

      <p className="mb-6">{t("blog10_intro")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog10_develop_business_plan")}
      </h2>
      <p className="mb-6">{t("blog10_business_plan_description")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog10_business_model")}</li>
        <li>{t("blog10_target_market")}</li>
        <li>{t("blog10_market_research")}</li>
        <li>{t("blog10_growth_projections")}</li>
        <li>{t("blog10_exit_strategy")}</li>
      </ul>
      <p className="mb-6">{t("blog10_detailed_plan")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog10_strong_brand")}</h2>
      <p className="mb-6">{t("blog10_brand_description")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog10_professional_website")}</li>
        <li>{t("blog10_active_social_media")}</li>
        <li>{t("blog10_positive_reviews")}</li>
        <li>{t("blog10_engaging_content")}</li>
      </ul>
      <p className="mb-6">{t("blog10_strong_brand_benefits")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog10_validate_with_traction")}
      </h2>
      <p className="mb-6">{t("blog10_validate_description")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog10_initial_sales")}</li>
        <li>{t("blog10_growing_customer_base")}</li>
        <li>{t("blog10_strategic_partnerships")}</li>
        <li>{t("blog10_successful_pilot")}</li>
      </ul>
      <p className="mb-6">{t("blog10_demonstrating_demand")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog10_networking")}</h2>
      <p className="mb-6">{t("blog10_networking_description")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog10_networking_events")}</li>
        <li>{t("blog10_industry_conferences")}</li>
        <li>{t("blog10_pitch_competitions")}</li>
        <li>{t("blog10_online_forums")}</li>
      </ul>
      <p className="mb-6">{t("blog10_connections_importance")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog10_winning_pitch")}</h2>
      <p className="mb-6">{t("blog10_pitch_description")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog10_problem_solution")}</li>
        <li>{t("blog10_unique_value")}</li>
        <li>{t("blog10_revenue_model")}</li>
        <li>{t("blog10_team_expertise")}</li>
        <li>{t("blog10_preparedness")}</li>
      </ul>
      <p className="mb-6">{t("blog10_strong_pitch")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog10_funding_options")}</h2>
      <p className="mb-6">{t("blog10_funding_options_description")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog10_angel_investors")}</li>
        <li>{t("blog10_venture_capital")}</li>
        <li>{t("blog10_government_grants")}</li>
        <li>{t("blog10_crowdfunding")}</li>
        <li>{t("blog10_bank_loans")}</li>
      </ul>
      <p className="mb-6">{t("blog10_research_funding")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog10_clear_roi")}</h2>
      <p className="mb-6">{t("blog10_roi_description")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog10_expected_growth")}</li>
        <li>{t("blog10_equity_structure")}</li>
        <li>{t("blog10_exit_strategies")}</li>
      </ul>
      <p className="mb-6">{t("blog10_clear_path")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog10_final_thoughts")}</h2>
      <p className="mb-6">{t("blog10_final_thoughts_description")}</p>
      <p className="mb-6">
        <strong>{t("blog10_investkoree")}</strong>{" "}
        {t("blog10_investkoree_call_to_action")}
      </p>
      <p className="mb-6">
        <strong>{t("blog10_contact_us")}</strong> investkoree@gmail.com
      </p>
    </div>
  );
};

export default BlogTen;
