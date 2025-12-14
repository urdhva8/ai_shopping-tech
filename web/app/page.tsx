"use client";

import { useState } from "react";
import { sendOtp, verifyOtp } from "../lib/authApi";

export default function Page() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Send OTP
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await sendOtp(email);

      if (!res.success) {
        throw new Error(res.message || "Failed to send OTP");
      }

      setStep("otp");
      setMessage("OTP sent to your email");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Verify OTP
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await verifyOtp(email, otp);

      if (!res.success) {
        throw new Error(res.message || "Invalid OTP");
      }

      setMessage("Login successful 🎉");
      // Later: save JWT, redirect user
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "OTP verification failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
          AI Shoppy
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Secure OTP Login
        </p>

        {/* EMAIL STEP */}
        {step === "email" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3
                         text-gray-800 placeholder-gray-400
                         focus:ring-2 focus:ring-indigo-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg
                         font-semibold hover:bg-indigo-700 transition"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="w-full border border-gray-300 rounded-lg px-4 py-3
                         text-center tracking-widest text-lg
                         text-gray-800 placeholder-gray-400
                         focus:ring-2 focus:ring-green-400 outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg
                         font-semibold hover:bg-green-700 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {/* MESSAGE */}
        {message && (
          <p className="text-center text-sm text-gray-700 mt-4">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
