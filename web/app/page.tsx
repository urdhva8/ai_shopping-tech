"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center space-y-6">
        <h1 className="text-3xl font-bold text-indigo-600">AI Shoppy</h1>
        <p className="text-gray-600">Secure shopping with OTP login</p>

        <div className="space-y-3">
          <Link href="/login">
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
              Login
            </button>
          </Link>

          <Link href="/signup">
            <button className="w-full border border-indigo-600 text-indigo-600 py-3 rounded-lg">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
