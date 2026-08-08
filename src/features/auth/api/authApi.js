import apiClient from "../../../lib/axios";

export async function login(credentials) {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
}

export async function register(userData) {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
}

export async function logout() {
  const response = await apiClient.post("/auth/logout");
  return response.data;
}

export async function refreshToken(refreshToken) {
  const response = await apiClient.post("/auth/refresh-token", {
    refreshToken,
  });
  return response.data;
}

export async function forgotPassword(email) {
  const response = await apiClient.post("/auth/forgot-password", {
    email,
  });
  return response.data;
}

export async function resetPassword(token, password) {
  const response = await apiClient.post("/auth/reset-password", {
    token,
    password,
  });
  return response.data;
}

export async function getCurrentUser() {
  const response = await apiClient.get("/auth/me");
  return response.data;
}
