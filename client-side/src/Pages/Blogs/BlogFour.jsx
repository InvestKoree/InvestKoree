import blog4 from "../../assets/blog4.jpeg";
import { useTranslation } from "react-i18next";

const BlogFour = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Image */}
      <img
        src={blog4}
        className="w-full h-64 lg:object-cover rounded-lg mb-6"
      />

      {/* Blog Content */}
      <h1 className="text-3xl font-bold mb-4">{t("blog4_title")}</h1>

      <p className="mb-6">{t("blog4_intro")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog4_investor_expectations")}
      </h2>
      <p className="mb-6">
        {t("blog4_investor_expectations_description")}
        <ul className="list-disc ml-6">
          <li>{t("blog4_clear_business_model")}</li>
          <li>{t("blog4_scalability")}</li>
          <li>{t("blog4_strong_team")}</li>
          <li>{t("blog4_market_opportunity")}</li>
        </ul>
        {t("blog4_expectations_conclusion")}
      </p>

      <h2 className="text-2xl font-bold mb-4">{t("blog4_pitch_deck")}</h2>
      <p className="mb-6">
        {t("blog4_pitch_deck_intro")}
        <ul className="list-disc ml-6">
          <li>{t("blog4_mission_vision")}</li>
          <li>{t("blog4_problem_solution")}</li>
          <li>{t("blog4_target_market")}</li>
          <li>{t("blog4_revenue_projections")}</li>
        </ul>
        {t("blog4_pitch_deck_conclusion")}
      </p>

      <h2 className="text-2xl font-bold mb-4">{t("blog4_online_presence")}</h2>
      <p className="mb-6">
        {t("blog4_online_presence_intro")}
        <ul className="list-disc ml-6">
          <li>{t("blog4_professional_website")}</li>
          <li>{t("blog4_linkedin_update")}</li>
          <li>{t("blog4_publish_blog_posts")}</li>
        </ul>
      </p>

      <h2 className="text-2xl font-bold mb-4">{t("blog4_networking")}</h2>
      <p className="mb-6">{t("blog4_networking_description")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog4_financial_transparency")}
      </h2>
      <p className="mb-6">{t("blog4_financial_transparency_description")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog4_competitive_edge")}</h2>
      <p className="mb-6">{t("blog4_competitive_edge_description")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog4_investkoree_platform")}
      </h2>
      <p className="mb-6">
        {t("blog4_investkoree_platform_intro")}
        <ul className="list-disc ml-6">
          <li>{t("blog4_access_network")}</li>
          <li>{t("blog4_showcase_tools")}</li>
          <li>{t("blog4_support_resources")}</li>
        </ul>
      </p>

      <h2 className="text-2xl font-bold mb-4">{t("blog4_conclusion")}</h2>
      <p className="mb-6">{t("blog4_conclusion_description")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog4_call_to_action")}</h2>
      <p className="mb-6">{t("blog4_call_to_action_description")}</p>
    </div>
  );
};

export default BlogFour;
