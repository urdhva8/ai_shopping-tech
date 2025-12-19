const API_BASE = "http://localhost:5000/api/auth";

export async function sendOtp(email: string) {
  const res = await fetch(`${API_BASE}/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  return res.json();
}

export async function verifyOtp(email: string, otp: string) {
  const res = await fetch(`${API_BASE}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  return res.json(); // { success, token }
}
