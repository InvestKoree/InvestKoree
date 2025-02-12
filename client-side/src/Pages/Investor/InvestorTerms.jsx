import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation

const InvestorTerms = () => {
  const { t } = useTranslation(); // Use the translation hook

  return (
    <div className="lg:h-[600px] lg:w-[1200px] mt-20 flex lg:flex-row sm:flex-col xs:flex-col lg:mx-auto lg:gap-12 xxs:flex-col sm:px-4 xs:px-4 xxs:px-4 sm:mb-4 xs:mb-4 xxs:mb-4 sm:h-full xs:h-full xxs:h-full">
      <div>
        <Link to="/investordashboard">
          <input
            type="submit"
            className="post-btn lg:h-[7%] lg:w-[100px] sm:hidden xs:hidden xxs:hidden sm:h-[80%] xs:h-[80%] xxs:h-[80%] sm:w-[20%] xs:w-[20%] xxs:w-[20%] sm:px-4 xs:px-4 xxs:px-4 sm:py-2 xs:py-2 xxs:py-2"
            name="founder-post"
            value={t("back_button")} // Use translation
          />
        </Link>
      </div>
      <div className="mx-auto flex flex-col gap-8">
        <h1 className="font-extrabold text-xl">
          {t("investor_terms")} {/* Use translation */}
        </h1>
        <p>{t("interm_1")}</p> {/* Use translation */}
        <p>{t("interm_2")}</p> {/* Use translation */}
        <p>{t("interm_3")}</p> {/* Use translation */}
        <p>{t("interm_4")}</p> {/* Use translation */}
      </div>
    </div>
  );
};

export default InvestorTerms;
