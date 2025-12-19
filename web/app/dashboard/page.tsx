"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("auth_token");
    if (!t) {
      router.push("/login");
    } else {
      setToken(t);
    }
  }, [router]);

  if (!token) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-indigo-600">
          Welcome to Dashboard 🎉
        </h1>
        <p className="text-gray-600 mt-2">
          You are logged in using OTP + JWT
        </p>

        <button
          onClick={() => {
            localStorage.removeItem("auth_token");
            router.push("/login");
          }}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
