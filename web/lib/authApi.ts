const API_BASE = "http://localhost:5000/api/auth";

export interface AuthResponse {
  userId?: string;
  token?: string;
  error?: string;
}

export function signup(data: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());
}

export function login(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());
}

export function verifyOtp(data: {
  userId: string;
  otp: string;
}): Promise<AuthResponse> {
  return fetch(`${API_BASE}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());
}
