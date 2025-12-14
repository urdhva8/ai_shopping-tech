"use client";

import { useState } from "react";

export default function Page() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  function handleLogin() {
    console.log("Login clicked");
    alert("Login clicked (API will be added next)");
  }

  function handleSignup() {
    console.log("Signup clicked");
    alert("Signup clicked (API will be added next)");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
          AI Shoppy
        </h1>
        <p className="text-center text-gray-600 mb-6">
          {mode === "login" ? "Login to your account" : "Create a new account"}
        </p>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${
              mode === "login"
                ? "bg-indigo-600 text-white"
                : "text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${
              mode === "signup"
                ? "bg-indigo-600 text-white"
                : "text-gray-700"
            }`}
          >
            Signup
          </button>
        </div>

        {/* LOGIN FORM */}
        {mode === "login" && (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
                         text-gray-800 placeholder-gray-400
                         focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
                         text-gray-800 placeholder-gray-400
                         focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <div className="text-right text-sm text-indigo-600 cursor-pointer">
              Forgot password?
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg 
                         font-semibold hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </div>
        )}

        {/* SIGNUP FORM */}
        {mode === "signup" && (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
                         text-gray-800 placeholder-gray-400
                         focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
                         text-gray-800 placeholder-gray-400
                         focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
                         text-gray-800 placeholder-gray-400
                         focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <button
              onClick={handleSignup}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg 
                         font-semibold hover:bg-indigo-700 transition"
            >
              Signup
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
