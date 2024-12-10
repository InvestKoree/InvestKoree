import { FaArrowUp } from "react-icons/fa";

const GoToTopButton = ({ showGoToTop, scrollToTop }) => {
  return (
    showGoToTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-neutral-700 hover:bg-neutral-800 text-white p-3 rounded-full shadow-lg"
        aria-label="Scroll to top"
      >
        <FaArrowUp size={24} />
      </button>
    )
  );
};

export default GoToTopButton;
