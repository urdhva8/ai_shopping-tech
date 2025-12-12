"use client";

import { useState } from "react";

export default function Page() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [step, setStep] = useState<"form" | "otp">("form");

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [otp, setOtp] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  // dummy submit handlers (you will wire to API later)
  function handleContinue(e?: React.FormEvent) {
    e?.preventDefault();
    setStep("otp");
  }

  function handleVerify(e?: React.FormEvent) {
    e?.preventDefault();
    // TODO: call verify API
    alert("Verify OTP (not implemented)");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        {/* Toggle */}
        <div
          className="flex justify-center gap-4 mb-6"
          role="tablist"
          aria-label="Authentication mode"
        >
          <button
            role="tab"
            aria-selected={mode === "login" ? "true" : "false"}
            onClick={() => {
              setMode("login");
              setStep("form");
            }}
            className={`px-4 py-2 rounded ${
              mode === "login" ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            Login
          </button>

          <button
            role="tab"
            aria-selected={mode === "signup" ? "true" : "false"}
            onClick={() => {
              setMode("signup");
              setStep("form");
            }}
            className={`px-4 py-2 rounded ${
              mode === "signup" ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            Signup
          </button>
        </div>

        {/* FORM STEP */}
        {step === "form" && (
          <form
            className="space-y-4"
            onSubmit={handleContinue}
            aria-labelledby="auth-heading"
          >
            <h2 id="auth-heading" className="sr-only">
              {mode === "login" ? "Login form" : "Signup form"}
            </h2>

            {mode === "signup" && (
              <div>
                <label htmlFor="username" className="block text-sm text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                  placeholder="Your name"
                  aria-label="User name"
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="mail@example.com"
                aria-label="Email address"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="Enter your password"
                aria-label="Password"
                required
              />
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">
              Continue
            </button>
          </form>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <form className="space-y-4" onSubmit={handleVerify} aria-labelledby="otp-heading">
            <h3 id="otp-heading" className="text-sm font-medium text-gray-900">
              Verify your email
            </h3>

            <p className="text-sm text-gray-700" id="otp-desc">
              Enter the 6-digit code sent to <strong>{form.email || "your email"}</strong>
            </p>

            <label htmlFor="otp" className="sr-only">
              One time code
            </label>
            <input
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full border rounded px-3 py-2 text-center tracking-widest"
              placeholder="123456"
              aria-label="One time code"
              aria-describedby="otp-desc"
              required
            />

            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-md">
                Verify & Continue
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep("form");
                  setOtp("");
                }}
                className="flex-1 border rounded-md py-2"
              >
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
