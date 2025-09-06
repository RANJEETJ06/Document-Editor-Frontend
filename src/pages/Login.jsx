import React from "react";
import { FcGoogle } from "react-icons/fc";
import { loginUser } from "../APIs/userApi";

const Login = () => {
  const handleLogin = () => {
    window.location.href = loginUser;
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome</h1>
        <p className="text-gray-500 mb-8">
          Please login with your Google account to continue
        </p>

        <button
          onClick={handleLogin}
          className="flex items-center justify-center w-full py-3 px-5 border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 bg-white"
        >
          <FcGoogle className="text-2xl mr-3" />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
