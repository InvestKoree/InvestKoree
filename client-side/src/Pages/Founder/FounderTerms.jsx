import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation

const FounderTerms = () => {
  const { t } = useTranslation(); // Use the translation hook

  return (
    <div className="lg:h-[full] lg:w-[1200px] mt-20 flex lg:flex-col sm:flex-col xs:flex-col lg:mx-auto lg:gap-12 xxs:flex -col sm:px-4 xs:px-4 xxs:px-4 sm:mb-4 xs:mb-4 xxs:mb-4 sm:h-full xs:h-full xxs:h-full">
      <div className="mx-auto flex flex-col gap-8">
        <h1 className="font-extrabold text-xl">
          {t("founder_terms")} {/* Use translation */}
        </h1>
        <p>{t("term_1")}</p> {/* Use translation */}
        <p>{t("term_2")}</p> {/* Use translation */}
        <p>{t("term_3")}</p> {/* Use translation */}
        <p>{t("term_4")}</p> {/* Use translation */}
        <p>{t("term_5")}</p> {/* Use translation */}
        <p>{t("term_6")}</p> {/* Use translation */}
        <p>{t("term_7")}</p> {/* Use translation */}
        <p>{t("term_8")}</p> {/* Use translation */}
        <p>{t("term_9")}</p> {/* Use translation */}
      </div>
      <div className="flex items-end">
        <Link to="/founderpost">
          <input
            type="submit"
            className="post-btn lg:h-[120%] lg:w-[100px] sm:h-[60%] xs:h-[60%] xxs:h-[60%] "
            name="founder-post"
            value={t("post")}
          />
        </Link>
      </div>
    </div>
  );
};

export default FounderTerms;
