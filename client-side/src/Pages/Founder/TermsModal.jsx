import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation

const TermsModal = ({ isOpen, onClose, onOpenTerms }) => {
  const { t } = useTranslation(); // Initialize translation

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-6">{t("termsPrompt")}</h2>
        <button
          className="btn btn-primary text-white mb-4 mr-2"
          onClick={() => {
            onOpenTerms();
            onClose();
          }}
        >
          {t("readTerms")}
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          {t("cancel")}
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
