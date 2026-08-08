import apiClient from "../../../lib/axios";

export async function fetchProfile() {
  const response = await apiClient.get("/profile");
  return response.data;
}

export async function updateProfile(profileData) {
  const response = await apiClient.put("/profile", profileData);
  return response.data;
}

export async function uploadAvatar(formData) {
  const response = await apiClient.post("/profile/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function uploadResume(formData) {
  const response = await apiClient.post("/profile/resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function fetchPortfolio() {
  const response = await apiClient.get("/profile/portfolio");
  return response.data;
}

export async function addPortfolioItem(itemData) {
  const response = await apiClient.post("/profile/portfolio", itemData);
  return response.data;
}

export async function deletePortfolioItem(id) {
  const response = await apiClient.delete(`/profile/portfolio/${id}`);
  return response.data;
}

export async function fetchCompanyProfile() {
  const response = await apiClient.get("/profile/company");
  return response.data;
}

export async function updateCompanyProfile(companyData) {
  const response = await apiClient.put("/profile/company", companyData);
  return response.data;
}
