import apiClient from "../../../lib/axios";

export async function fetchUsers(params = {}) {
  const response = await apiClient.get("/admin/users", { params });
  return response.data;
}

export async function fetchUserById(id) {
  const response = await apiClient.get(`/admin/users/${id}`);
  return response.data;
}

export async function banUser(id) {
  const response = await apiClient.patch(`/admin/users/${id}/ban`);
  return response.data;
}

export async function unbanUser(id) {
  const response = await apiClient.patch(`/admin/users/${id}/unban`);
  return response.data;
}

export async function deleteUser(id) {
  const response = await apiClient.delete(`/admin/users/${id}`);
  return response.data;
}

export async function fetchPendingCompanies(params = {}) {
  const response = await apiClient.get("/admin/companies/pending", {
    params,
  });
  return response.data;
}

export async function verifyCompany(id, action) {
  const response = await apiClient.patch(`/admin/companies/${id}/verify`, {
    action,
  });
  return response.data;
}

export async function fetchPlatformStats() {
  const response = await apiClient.get("/admin/stats");
  return response.data;
}

export async function fetchAuditLogs(params = {}) {
  const response = await apiClient.get("/admin/audit-logs", { params });
  return response.data;
}
