import React from "react";
import { Link } from "react-router-dom";
import { paths } from "../constant/paths";

const Error = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-50 px-4 py-10">
      <section className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Large 404 Text */}
        <div className="flex items-center justify-center bg-purple-100 p-10">
          <h1 className="text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-black text-purple-400 leading-none">
            404
          </h1>
        </div>

        {/* Right Side: Message and Button */}
        <div className="flex flex-col justify-center p-8 sm:p-12 bg-white text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-800 mb-8">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <Link to={paths.home} className="inline-block">
            <button className="bg-purple-700 text-white px-5 py-2 rounded-xl text-base sm:text-lg hover:bg-purple-800 transition duration-300 shadow-md cursor-pointer">
              ← Go Back to Home
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Error;
