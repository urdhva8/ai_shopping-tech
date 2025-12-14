const API_BASE = "http://localhost:5000/api/auth";

export interface SendOtpResponse {
  success: boolean;
  otp?: string; // only visible in dev (Mailtrap)
  error?: string;
}

export function sendOtp(email: string): Promise<SendOtpResponse> {
  return fetch(`${API_BASE}/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  }).then((res) => res.json());
}
