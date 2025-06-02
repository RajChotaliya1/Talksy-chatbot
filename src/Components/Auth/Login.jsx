import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { paths } from "../../constant/paths";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();

  const [googleLoading, setGoogleLoading] = useState(false);
  const [logInLoading, setLogInLoading] = useState(false);

  const onSubmit = async (data) => {
    setLogInLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("Logged in user:", userCredential.user);
      toast.success("Login Successful.");
      setTimeout(() => {
        reset();
        navigate(paths.talksy);
      }, 2000);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No account found with this email.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address.");
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts. Try again later.");
          break;
        case "auth/invalid-credential":
          toast.error("Invalid credentials. Please try again.");
          break;
        default:
          toast.error("Login failed: " + error.message);
      }
    } finally {
      setLogInLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google sign-in user:", result.user);
      toast.success("Successfully signed in with Google.");
      setTimeout(() => {
        navigate(paths.chatBot);
      }, 2000);
    } catch (error) {
      switch (error.code) {
        case "auth/popup-closed-by-user":
          toast.error("Popup closed before sign-in.");
          break;
        case "auth/cancelled-popup-request":
          toast.error("Multiple sign-in requests. Please try again.");
          break;
        default:
          toast.error("Google sign-in failed: " + error.message);
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center bg-white px-4 rounded-md"
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-3.5 md:mb-6">
          <div className="hidden md:block text-purple-600 text-4xl font-bold mb-2">
            ⚡
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <p className="text-gray-500 text-sm">Login to continue</p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          type="button"
          className={`w-full border border-gray-300 rounded-full py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium mb-1 md:mb-2 transition ${
            googleLoading
              ? "opacity-50 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100 cursor-pointer"
          }`}
        >
          <FcGoogle size={20} />
          {googleLoading ? "Signing in..." : "Sign in with Google"}
        </button>

        <div className="flex items-center mb-3.5 sm:mb-8">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-xs text-gray-400 font-medium">
            or Sign in with Email
          </span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              autoComplete="email"
              type="email"
              placeholder="mail@website.com"
              {...register("email")}
              className="w-full border border-gray-300 rounded-full py-1.5 md:py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          </div>

          <div className="relative">
            <input
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              placeholder="P@$$w0rd"
              {...register("password")}
              onChange={(e) => setPasswordValue(e.target.value)}
              className="w-full border border-gray-300 rounded-full py-1.5 md:py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {passwordValue.length > 0 && (
              <div
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            )}
            <p className="text-red-500 text-xs mt-1">
              {errors.password?.message}
            </p>
          </div>

          <div className="flex items-center justify-end text-sm text-gray-600">
            <Link
              to={paths.forgotpassword}
              className="text-purple-600 hover:opacity-80 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={logInLoading}
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full py-1 sm:py-2 transition  ${
              logInLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {logInLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-4 w-4 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    d="M4 12a8 8 0 018-8"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
                Logging in...
              </div>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-3 md:mt-6">
          Not registered yet?{" "}
          <NavLink
            to={paths.signUp}
            className="text-purple-600 font-medium hover:opacity-80"
          >
            Create an Account
          </NavLink>
        </p>

        <p className="text-center text-xs text-gray-500 mt-2.5 md:mt-6">
          ©{new Date().getFullYear()} Talksy. All rights reserved.
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
