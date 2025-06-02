import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../constant/paths";
import { HiArrowNarrowRight } from "react-icons/hi";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");

  const fullText = "Introducing Talksy...";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === fullText.length) {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    navigate(paths.logIn);
  };

  return (
    <div className="w-screen h-dvh bg-black text-white flex flex-col items-center justify-center text-center px-4 py-10">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 break-words"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {typedText}
        <motion.span
          className="inline-block w-[0.5ch] ml-0.5"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          |
        </motion.span>
      </motion.h1>

      <motion.p
        className="text-base sm:text-lg md:text-xl max-w-md sm:max-w-lg md:max-w-2xl mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Talksy is your personal AI assistant that helps you get instant answers,
        learn new things, and have fun conversations. Click below to get
        started.
      </motion.p>

      <button
        onClick={handleStart}
        className="bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-medium hover:bg-gray-300 transition duration-300 cursor-pointer active:scale-95"
      >
        Try Talksy{" "}
        <motion.span
          className="inline-block"
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <HiArrowNarrowRight className="inline size-4 sm:size-5" />
        </motion.span>
      </button>
    </div>
  );
};

export default Home;
