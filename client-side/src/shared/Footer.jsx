import React from "react";
import { SocialIcon } from "react-social-icons";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <div>
      <footer className="bg-slate-800 text-lg text-salmon py-10 px-6 md:px-24 sm:text-center xs:text-center xxs:text-center">
        <div className="flex flex-col lg:flex-row lg:justify-around space-y-6 lg:space-y-0">
          <nav className="mb-6 lg:mb-0">
            <h6 className="footer-title opacity-100">{t("contact_us")}</h6>
            <ul className="list-none">
              <li className="hover:text-white transition-colors duration-200">
                <a className="link link-hover opacity-90" href="#">
                  {t("comaddress")}
                </a>
              </li>
              <li className="hover:text-white transition-colors duration-200">
                <a className="link link-hover opacity-90" href="#">
                  {t("comphone_number")}
                </a>
              </li>
              <li className="hover:text-white transition-colors duration-200">
                <a
                  className="link link-hover opacity-90"
                  href="mailto:investkoree@gmail.com"
                >
                  {t("comemail_address")}
                </a>
              </li>
            </ul>
          </nav>
          <nav className="lg:mb-0">
            <h6 className="footer-title opacity-100">{t("about_us")}</h6>
            <ul className="list-none">
              <li className="hover:text-white transition-colors duration-200">
                <a className="link link-hover opacity-90" href="/overview">
                  {t("overview")}
                </a>
              </li>
              <li className="hover:text-white transition-colors duration-200">
                <a className="link link-hover opacity-90" href="whoweare">
                  {t("who_we_are")}
                </a>
              </li>
              <li className="hover:text-white transition-colors duration-200">
                <a className="link link-hover opacity-90" href="whatwedo">
                  {t("what_we_do")}
                </a>
              </li>
            </ul>
          </nav>
          <nav className="lg:mb-0">
            <h6 className="footer-title opacity-100">
              {t("business_information")}
            </h6>
            <ul className="list-none">
              <li className="hover:text-white transition-colors duration-200">
                <a className="link link-hover opacity-90" href="/overview">
                  {t("trade")} : TRAD/DSCC/035991/2024
                </a>
              </li>
            </ul>
          </nav>
          <nav className="xxs:mx-auto xs:mx-auto sm-mx-auto lg:mx-0">
            <h6 className="footer-title opacity-100">{t("social")}</h6>
            <div className="flex flex-row gap-2">
              <SocialIcon
                url="https://www.facebook.com/share/19XU41Z73E/?mibextid=LQQJ4d"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("visit_facebook")}
              />
              <SocialIcon
                url="https://www.linkedin.com/company/investkoree/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("visit_linkedin")}
              />
              <SocialIcon
                url="https://www.instagram.com/investkoree/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("visit_instagram")}
              />
              <SocialIcon
                url="https://www.youtube.com/@InvestKoree"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("visit_youtube")}
              />
            </div>
          </nav>
        </div>
      </footer>
      <section className="bg-salmon text-slate-800 lg:h-12 sm:flex-col xs:flex-col xxs:flex-col items-center text-center sm:text-sm xs:text-sm xxs:text-sm font-bold py-4">
        Copyright © InvestKoree.com. All Rights Reserved.
      </section>
    </div>
  );
}

export default Footer;
