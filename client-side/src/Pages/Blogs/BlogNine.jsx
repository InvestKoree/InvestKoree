import blog1 from "../../assets/blognine.jpeg";
import { useTranslation } from "react-i18next";

const BlogNine = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Image */}
      <img src={blog1} className="w-full h-80 object-cover rounded-lg mb-6" />

      {/* Blog Content */}
      <h1 className="text-3xl font-bold mb-4">{t("blog9_title")}</h1>

      <p className="mb-6">{t("blog9_intro")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog9_develop_business_plan")}
      </h2>
      <p className="mb-6">{t("blog9_business_plan_description")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog9_business_model")}</li>
        <li>{t("blog9_target_market")}</li>
        <li>{t("blog9_market_research")}</li>
        <li>{t("blog9_growth_projections")}</li>
        <li>{t("blog9_exit_strategy")}</li>
      </ul>
      <p className="mb-6">{t("blog9_detailed_plan")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog9_strong_brand")}</h2>
      <p className="mb-6">{t("blog9_brand_description")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog9_professional_website")}</li>
        <li>{t("blog9_active_social_media")}</li>
        <li>{t("blog9_positive_reviews")}</li>
        <li>{t("blog9_engaging_content")}</li>
      </ul>
      <p className="mb-6">{t("blog9_strong_brand_benefits")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog9_validate_with_traction")}
      </h2>
      <p className="mb-6">{t("blog9_validate_description")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog9_initial_sales")}</li>
        <li>{t("blog9_growing_customer_base")}</li>
        <li>{t("blog9_strategic_partnerships")}</li>
        <li>{t("blog9_successful_pilot")}</li>
      </ul>
      <p className="mb-6">{t("blog9_demonstrating_demand")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog9_networking")}</h2>
      <p className="mb-6">{t("blog9_networking_description")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog9_networking_events")}</li>
        <li>{t("blog9_industry_conferences")}</li>
        <li>{t("blog9_pitch_competitions")}</li>
        <li>{t("blog9_online_forums")}</li>
      </ul>
      <p className="mb-6">{t("blog9_connections_importance")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog9_winning_pitch")}</h2>
      <p className="mb-6">{t("blog9_pitch_description")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog9_problem_solution")}</li>
        <li>{t("blog9_unique_value")}</li>
        <li>{t("blog9_revenue_model")}</li>
        <li>{t("blog9_team_expertise")}</li>
        <li>{t("blog9_preparedness")}</li>
      </ul>
      <p className="mb-6">{t("blog9_strong_pitch")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog9_funding_options")}</h2>
      <p className="mb-6">{t("blog9_funding_options_description")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog9_angel_investors")}</li>
        <li>{t("blog9_venture_capital")}</li>
        <li>{t("blog9_government_grants")}</li>
        <li>{t("blog9_crowdfunding")}</li>
        <li>{t("blog9_bank_loans")}</li>
      </ul>
      <p className="mb-6">{t("blog9_research_funding")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog9_clear_roi")}</h2>
      <p className="mb-6">{t("blog9_roi_description")}</p>
      <ul className="list-disc ml-6">
        <li>{t("blog9_expected_growth")}</li>
        <li>{t("blog9_equity_structure")}</li>
        <li>{t("blog9_exit_strategies")}</li>
      </ul>
      <p className="mb-6">{t("blog9_clear_path")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog9_final_thoughts")}</h2>
      <p className="mb-6">{t("blog9_final_thoughts_description")}</p>
      <p className="mb-6">
        <strong>{t("blog9_investkoree")}</strong>{" "}
        {t("blog9_investkoree_call_to_action")}
      </p>
      <p className="mb-6 text-center font-bold">
        {t("blog9_ready_to_secure_funding")}
      </p>
    </div>
  );
};

export default BlogNine;
