import React, { useState } from "react";
import SignupForm from "../components/SignupForm";
import { useThemeContext } from "../contexts/ThemeContext";
import API_CONFIG from "../config/api";
import "../App.css";

const Signup = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { isDarkMode } = useThemeContext();

  const handleSignup = async (formData) => {
    setError("");
    setSuccess("");
    try {
      const res = await fetch(API_CONFIG.USER.SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Signup successful! Please login.");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error",err);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`rounded-2xl shadow-lg p-10 min-w-[340px] max-w-[90vw] transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h2 className={`font-bold text-2xl mb-6 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Sign up</h2>
        <SignupForm handleSubmitData={handleSignup} />
        {error && (
          <div className={`mt-3 p-3 rounded-lg text-sm ${
            isDarkMode 
              ? 'bg-red-900/20 border border-red-500/30 text-red-300' 
              : 'bg-red-50 border border-red-200 text-red-600'
          }`}>
            {error}
          </div>
        )}
        {success && (
          <div className={`mt-3 p-3 rounded-lg text-sm ${
            isDarkMode 
              ? 'bg-green-900/20 border border-green-500/30 text-green-300' 
              : 'bg-green-50 border border-green-200 text-green-600'
          }`}>
            {success}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
