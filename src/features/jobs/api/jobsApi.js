import apiClient from "../../../lib/axios";

export async function fetchJobs(params = {}) {
  const response = await apiClient.get("/jobs", { params });
  return response.data;
}

export async function searchJobs(query, filters = {}) {
  const response = await apiClient.get("/jobs/search", {
    params: { q: query, ...filters },
  });
  return response.data;
}

export async function fetchJobById(id) {
  const response = await apiClient.get(`/jobs/${id}`);
  return response.data;
}

export async function fetchJobFilters() {
  const response = await apiClient.get("/jobs/filters");
  return response.data;
}

export async function fetchFeaturedJobs(limit = 6) {
  const response = await apiClient.get("/jobs/featured", {
    params: { limit },
  });
  return response.data;
}

export async function fetchRecommendedJobs(userId, limit = 6) {
  const response = await apiClient.get(`/users/${userId}/recommended-jobs`, {
    params: { limit },
  });
  return response.data;
}

export async function fetchSavedJobs(userId) {
  const response = await apiClient.get(`/users/${userId}/saved-jobs`);
  return response.data;
}

export async function saveJob(userId, jobId) {
  const response = await apiClient.post(`/users/${userId}/saved-jobs`, {
    jobId,
  });
  return response.data;
}

export async function unsaveJob(userId, jobId) {
  const response = await apiClient.delete(
    `/users/${userId}/saved-jobs/${jobId}`
  );
  return response.data;
}
