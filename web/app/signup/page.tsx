"use client";
import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Signup successful. Please login.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button>Signup</button>
      </form>
    </div>
  );
}
