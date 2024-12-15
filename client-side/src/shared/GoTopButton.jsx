import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const GoToTopButton = ({
  showGoToTop,
  scrollToTop,
  showGoToBottom,
  scrollToBottom,
}) => {
  return (
    <div>
      {showGoToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 bg-neutral-700 hover:bg-neutral-800 text-white p-3 rounded-full shadow-lg"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={24} />
        </button>
      )}
      {showGoToBottom && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-4 bg-neutral-700 hover:bg-neutral-800 text-white p-3 rounded-full shadow-lg"
          aria-label="Scroll to bottom"
        >
          <FaArrowDown size={24} />
        </button>
      )}
    </div>
  );
};

export default GoToTopButton;
