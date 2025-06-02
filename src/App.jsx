import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import { paths } from "./constant/paths";
import AuthLayout from "./Layout/AuthLayout";
import Error from "./Components/Error";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/Signup";
import { Toaster } from "react-hot-toast";
import Talksy from "./pages/Talksy";
import ForgotPassword from "./Components/Auth/ForgotPassword";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path={paths.home} element={<Home />} />

          <Route element={<AuthLayout />}>
            <Route path={paths.logIn} element={<Login />} />
            <Route path={paths.signUp} element={<SignUp />} />
            <Route path={paths.forgotpassword} element={<ForgotPassword />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path={paths.talksy} element={<Talksy />} />
            <Route path={paths.profile} element={<Profile />} />
          </Route>

          <Route path={paths.error} element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
