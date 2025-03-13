import blogsix from "../../assets/blogsix.jpg";
import { useTranslation } from "react-i18next";

const Blogsix = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Image */}
      <img
        src={blogsix}
        className="w-full h-80 lg:object-cover rounded-lg mb-6"
      />

      {/* Blog Content */}
      <h1 className="text-3xl font-bold mb-4">{t("blog6_title")}</h1>

      <p className="mb-6">{t("blog6_intro")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog6_current_landscape")}
      </h2>
      <p className="mb-6">{t("blog6_current_landscape_description")}</p>
      <ul className="list-disc ml-6 mb-6">
        <li>
          <span className="font-semibold">{t("blog6_startup_ecosystem")}</span>:{" "}
          {t("blog6_startup_ecosystem_description")}
        </li>
        <li>
          <span className="font-semibold">
            {t("blog6_manufacturing_industries")}
          </span>
          : {t("blog6_manufacturing_industries_description")}
        </li>
        <li>
          <span className="font-semibold">
            {t("blog6_agriculture_modernization")}
          </span>
          : {t("blog6_agriculture_modernization_description")}
        </li>
      </ul>
      <p className="mb-6">{t("blog6_access_to_funding")}</p>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog6_why_strategic_investment")}
      </h2>
      <p className="mb-6">{t("blog6_why_strategic_investment_description")}</p>
      <ul className="list-disc ml-6 mb-6">
        <li>
          <span className="font-semibold">
            {t("blog6_access_to_expertise")}
          </span>
          : {t("blog6_access_to_expertise_description")}
        </li>
        <li>
          <span className="font-semibold">{t("blog6_market_expansion")}</span>:{" "}
          {t("blog6_market_expansion_description")}
        </li>
        <li>
          <span className="font-semibold">
            {t("blog6_operational_excellence")}
          </span>
          : {t("blog6_operational_excellence_description")}
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">
        {t("blog6_role_of_investkoree")}
      </h2>
      <p className="mb-6">{t("blog6_role_of_investkoree_description")}</p>
      <ul className="list-disc ml-6 mb-6">
        <li>
          <span className="font-semibold">{t("blog6_connecting_people")}</span>:{" "}
          {t("blog6_connecting_people_description")}
        </li>
        <li>
          <span className="font-semibold">{t("blog6_providing_insights")}</span>
          : {t("blog6_providing_insights_description")}
        </li>
        <li>
          <span className="font-semibold">{t("blog6_fostering_trust")}</span>:{" "}
          {t("blog6_fostering_trust_description")}
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">{t("blog6_success_stories")}</h2>
      <p className="mb-6">{t("blog6_success_stories_intro")}</p>
      <ul className="list-disc ml-6 mb-6">
        <li>{t("blog6_case_study_1")}</li>
        <li>{t("blog6_case_study_2")}</li>
        <li>{t("blog6_case_study_3")}</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">{t("blog6_conclusion")}</h2>
      <p className="mb-6">{t("blog6_conclusion_description")}</p>
      <p className="mb-6">{t("blog6_call_to_action")}</p>
    </div>
  );
};

export default Blogsix;
