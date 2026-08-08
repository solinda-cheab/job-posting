import apiClient from "../../../lib/axios";

export async function submitApplication(formData) {
  const response = await apiClient.post("/applications", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function fetchApplications(params = {}) {
  const response = await apiClient.get("/applications", { params });
  return response.data;
}

export async function fetchApplicationById(id) {
  const response = await apiClient.get(`/applications/${id}`);
  return response.data;
}

export async function updateApplicationStatus(id, status) {
  const response = await apiClient.patch(`/applications/${id}/status`, {
    status,
  });
  return response.data;
}

export async function withdrawApplication(id) {
  const response = await apiClient.post(`/applications/${id}/withdraw`);
  return response.data;
}

export async function saveResume(formData) {
  const response = await apiClient.post("/applications/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
