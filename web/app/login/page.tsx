"use client";

import { useState } from "react";
import { sendOtp, verifyOtp } from "@/lib/authApi";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await sendOtp(email);
      if (!res.success) throw new Error(res.message);
      setStep("otp");
      setMessage("OTP sent to your email");
    } catch (err: any) {
      setMessage(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await verifyOtp(email, otp);
      if (!res.success || !res.token) throw new Error(res.message);

      // ✅ SAVE JWT
      localStorage.setItem("auth_token", res.token);

      // ✅ GO TO DASHBOARD
      router.push("/dashboard");
    } catch (err: any) {
      setMessage(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-2">
          AI Shoppy
        </h1>
        <p className="text-center text-gray-600 mb-6">Secure OTP Login</p>

        {step === "email" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg"
              required
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full border px-4 py-3 rounded-lg text-center tracking-widest"
              required
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {message && (
          <p className="text-center text-sm text-red-600 mt-4">{message}</p>
        )}
      </div>
    </main>
  );
}
