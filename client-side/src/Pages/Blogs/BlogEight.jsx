import blog1 from "../../assets/blog8.jpeg";
import { useTranslation } from "react-i18next";

const BlogEight = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Image */}
      <img
        src={blog1}
        className="w-full h-64 lg:object-cover rounded-lg mb-6"
      />

      {/* Blog Content */}
      <h1 className="text-3xl font-bold mb-4">{t("blog8_title")}</h1>

      <p className="mb-6">{t("blog8_intro")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog8_for_entrepreneurs")}
      </h2>
      <p className="mb-6">{t("blog8_entrepreneurs_intro")}</p>

      <h3 className="text-xl font-bold mb-2">
        1. {t("blog8_polish_business_plan")}
      </h3>
      <p className="mb-6">{t("blog8_polish_business_plan_description")}</p>

      <h3 className="text-xl font-bold mb-2">
        2. {t("blog8_build_credibility")}
      </h3>
      <p className="mb-6">{t("blog8_build_credibility_description")}</p>

      <h3 className="text-xl font-bold mb-2">
        3. {t("blog8_leverage_investkoree")}
      </h3>
      <p className="mb-6">{t("blog8_leverage_investkoree_description")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog8_for_investors")}</h2>
      <p className="mb-6">{t("blog8_investors_intro")}</p>

      <h3 className="text-xl font-bold mb-2">
        1. {t("blog8_define_investment_goals")}
      </h3>
      <p className="mb-6">{t("blog8_define_investment_goals_description")}</p>

      <h3 className="text-xl font-bold mb-2">
        2. {t("blog8_conduct_due_diligence")}
      </h3>
      <p className="mb-6">{t("blog8_conduct_due_diligence_description")}</p>

      <h3 className="text-xl font-bold mb-2">
        3. {t("blog8_use_investkoree_tools")}
      </h3>
      <p className="mb-6">{t("blog8_use_investkoree_tools_description")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog8_why_choose_investkoree")}
      </h2>
      <p className="mb-6">{t("blog8_why_choose_investkoree_description")}</p>
    </div>
  );
};

export default BlogEight;
