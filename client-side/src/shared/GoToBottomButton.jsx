import { FaArrowDown } from "react-icons/fa";

const GoToBottomButton = ({ showGoToBottom, scrollToBottom }) => {
  if (!showGoToBottom) return null; // Hide the button when not needed

  return (
    <button
      onClick={scrollToBottom}
      className="fixed bottom-4 left-2   hover:bg-neutral-800 text-salmonLight p-3 rounded-full shadow-lg"
      aria-label="Scroll to bottom"
    >
      <FaArrowDown size={24} />
    </button>
  );
};

export default GoToBottomButton;
