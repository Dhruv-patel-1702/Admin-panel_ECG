import React, { useState } from "react";
import { PiEyeSlashLight } from "react-icons/pi";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const navigate = useNavigate();

  return (
    <div className=" flex justify-center items-center w-full min-h-[100vh] bg-[url('https://plus.unsplash.com/premium_photo-1676325101744-ce4a45a331c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center relative ">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <p className="text-center mb-6 font-semibold text-2xl">
          Login
        </p>
        <h2 className="text-xl font-semibold mb-2">Email </h2>
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value) || /^[^\d]*$/.test(value)) {
                  setIdentifier(value);
                }
              }}
              placeholder="Enter your email "
              className="w-full pl-12 pr-10 py-3 rounded-md border border-gray-200 focus:outline-none "
            />
          </div>
        </div>
        <div className="mb-2">
          <h2 className="text-xl font-semibold mb-2">Password</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-12 pr-10 py-3 rounded-md border border-gray-200 focus:outline-none"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-4 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeSharp /> : <PiEyeSlashLight />}
            </button>
          </div>
        </div>
        <a href="#" className="text-blue-500 text-sm mb-4 float-right">
          Forgot password?
        </a>
        <button className="bg-[#6178bc] text-white rounded-md p-2 w-full" onClick={() => navigate('/ecg_dashboard')}>
          Login
        </button>
        
      </div>
    </div>
  );
};

export default Login;
