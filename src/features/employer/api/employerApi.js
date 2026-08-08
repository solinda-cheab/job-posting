import apiClient from "../../../lib/axios";

export async function fetchEmployerJobs(params = {}) {
  const response = await apiClient.get("/employer/jobs", { params });
  return response.data;
}

export async function fetchJobById(id) {
  const response = await apiClient.get(`/jobs/${id}`);
  return response.data;
}

export async function createJob(jobData) {
  const response = await apiClient.post("/employer/jobs", jobData);
  return response.data;
}

export async function updateJob(id, jobData) {
  const response = await apiClient.put(`/employer/jobs/${id}`, jobData);
  return response.data;
}

export async function deleteJob(id) {
  const response = await apiClient.delete(`/employer/jobs/${id}`);
  return response.data;
}

export async function fetchApplicants(jobId, params = {}) {
  const response = await apiClient.get(
    `/employer/jobs/${jobId}/applicants`,
    { params }
  );
  return response.data;
}

export async function updateApplicationStatus(jobId, applicantId, status) {
  const response = await apiClient.patch(
    `/employer/jobs/${jobId}/applicants/${applicantId}`,
    { status }
  );
  return response.data;
}

export async function fetchCompanyMetrics() {
  const response = await apiClient.get("/employer/analytics");
  return response.data;
}

export async function fetchApplicantDetails(applicantId) {
  const response = await apiClient.get(`/employer/applicants/${applicantId}`);
  return response.data;
}
