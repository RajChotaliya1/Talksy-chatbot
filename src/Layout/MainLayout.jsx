import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";

const MainLayout = () => {
  return (
    <>
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </>
  );
};

export default MainLayout;
