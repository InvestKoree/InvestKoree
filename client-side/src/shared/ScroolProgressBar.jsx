// components/ScrollProgressBar.jsx
import { useEffect, useState } from "react";

const ScrollProgressBar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollPercentage(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="scroll-progress-bar"
      style={{ width: `${scrollPercentage}%` }}
    ></div>
  );
};

export default ScrollProgressBar;
