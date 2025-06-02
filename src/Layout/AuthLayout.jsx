import React from "react";
import { Outlet } from "react-router-dom";
import GuestRoute from "../routes/GuestRoute";
import logo from "../assets/logo3.jpg";
import { motion } from "framer-motion";

const AuthLayout = () => {
  return (
    <>
      <GuestRoute>
        <section className="bg-gradient-to-r from-[#e0ccdc] to-[#46064b] h-dvh flex items-center justify-center p-4">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-md md:rounded-2xl p-3 sm:p-10">
              <div className="flex justify-center items-center  md:border-r-2 border-gray-200 border-">
                <motion.img
                  src={logo}
                  alt="Logo"
                  className="w-45 md:w-120"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <Outlet />
            </div>
          </div>
        </section>
      </GuestRoute>
    </>
  );
};

export default AuthLayout;
