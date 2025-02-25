import blog1 from "../../assets/blog5.jpeg";
import { useTranslation } from "react-i18next";

const BlogFive = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Image */}
      <img src={blog1} className="w-full h-80 object-cover rounded-lg mb-6" />

      {/* Blog Content */}
      <h1 className="text-3xl font-bold mb-4">{t("blog5_title")}</h1>

      <p className="mb-6">{t("blog5_intro")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog5_what_is_investkoree")}
      </h2>
      <p className="mb-6">{t("blog5_investkoree_description")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog5_power_of_local_connections")}
      </h2>
      <p className="mb-6">{t("blog5_local_connections_description")}</p>

      <h2 className="text-2xl font-bold mb-4">{t("blog5_how_it_works")}</h2>
      <p className="mb-6">
        <ul className="list-disc ml-6">
          <li>{t("blog5_business_profile_creation")}</li>
          <li>{t("blog5_investor_matchmaking")}</li>
          <li>{t("blog5_growth_support")}</li>
        </ul>
      </p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog5_why_choose_investkoree")}
      </h2>
      <p className="mb-6">
        <li>
          <span className="font-semibold">{t("blog5_local_focus")}</span>{" "}
          {t("blog5_local_focus_description")}
        </li>
        <li>
          <span className="font-semibold">
            {t("blog5_comprehensive_support")}
          </span>{" "}
          {t("blog5_comprehensive_support_description")}
        </li>
        <li>
          <span className="font-semibold">{t("blog5_tailored_solutions")}</span>{" "}
          {t("blog5_tailored_solutions_description")}
        </li>
      </p>

      <h2 className="text-2xl font-bold mb-4">{t("blog5_conclusion")}</h2>
      <p className="mb-6">{t("blog5_conclusion_description")}</p>
    </div>
  );
};

export default BlogFive;
