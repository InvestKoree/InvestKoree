import blog1 from "../../assets/blog1.jpg";
import { useTranslation } from "react-i18next";
const BlogOne = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Image */}
      <img src={blog1} className="w-full h-64 object-cover rounded-lg mb-6" />

      {/* Blog Content */}
      <h1 className="text-3xl font-bold mb-4">{t("blog1_title")}</h1>

      <p className="mb-6">
        {t("blog1_intro")}
        <strong>InvestKoree</strong>, {t("blog1_intro_continued")}
      </p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog1_why_investor_matters")}
      </h2>
      <p className="mb-6">{t("blog1_why_investor_description")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog1_key_traits")}</h2>

      <h3 className="text-xl font-bold mb-2">
        1. {t("blog1_industry_knowledge")}
      </h3>
      <p className="mb-6">{t("blog1_industry_knowledge_description")}</p>

      <h3 className="text-xl font-bold mb-2">2. {t("blog1_shared_vision")}</h3>
      <p className="mb-6">{t("blog1_shared_vision_description")}</p>

      <h3 className="text-xl font-bold mb-2">3. {t("blog1_strong_network")}</h3>
      <p className="mb-6">{t("blog1_strong_network_description")}</p>

      <h3 className="text-xl font-bold mb-2">
        4. {t("blog1_long_term_support")}
      </h3>
      <p className="mb-6">{t("blog1_long_term_support_description")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog1_how_investkoree_helps")}
      </h2>
      <p className="mb-6">
        {t("blog1_investkoree_intro")}
        <strong>InvestKoree</strong>, {t("blog1_investkoree_intro_continued")}
      </p>

      <h3 className="text-xl font-bold mb-2">{t("blog1_how_it_works")}</h3>
      <p className="mb-6">
        1. <strong>{t("blog1_connect_with_us")}</strong>{" "}
        {t("blog1_connect_with_us_description")}
      </p>
      <p className="mb-6">
        2. <strong>{t("blog1_matching_process")}</strong>{" "}
        {t("blog1_matching_process_description")}
      </p>
      <p className="mb-6">
        3. <strong>{t("blog1_securing_investment")}</strong>{" "}
        {t("blog1_securing_investment_description")}
      </p>

      <h2 className="text-2xl font-bold mb-4">{t("blog1_conclusion")}</h2>
      <p className="mb-6">{t("blog1_conclusion_description")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog1_call_to_action")}</h2>
      <p className="mb-6">{t("blog1_call_to_action_description")}</p>
    </div>
  );
};

export default BlogOne;
