import { AnimatePresence, motion } from "framer-motion";
import { ReactLenis } from "lenis/dist/lenis-react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { ToastContainer } from "react-toastify";
import AuthProvider from "../providers/AuthProvider";
import { Outlet, useLocation } from "react-router-dom";
import ScrollProgressBar from "../shared/ScroolProgressBar";
import GoToTopButton from "../shared/GoTopButton";
// import GoToBottomButton from "../shared/GoToBottomButton"; // Import new component
import { useEffect, useState } from "react";

const Main = () => {
  const location = useLocation();
  const [showGoToTop, setShowGoToTop] = useState(false);
  // const [showGoToBottom, setShowGoToBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY > 300); // Show "Go to Top" button after scrolling 300px
      // setShowGoToBottom(
      //   window.innerHeight + window.scrollY <
      //     document.documentElement.scrollHeight - 100 // Show "Go to Bottom" button when not at bottom
      // );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const scrollToBottom = () => {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <div className="roboto-regular">
      <AuthProvider>
        <Navbar />
        <ToastContainer />
        <ScrollProgressBar />
        <ReactLenis
          root
          options={{
            lerp: 0.05, // Adjust the scrolling smoothness
            smooth: true, // Enable smooth scrolling
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname} // Animate changes based on route
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </ReactLenis>
        <GoToTopButton showGoToTop={showGoToTop} scrollToTop={scrollToTop} />
        {/* <GoToBottomButton
          showGoToBottom={showGoToBottom}
          scrollToBottom={scrollToBottom}
        /> */}
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default Main;
