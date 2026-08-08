import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsers,
  fetchUserById,
  banUser,
  unbanUser,
  deleteUser,
  fetchPendingCompanies,
  verifyCompany,
  fetchPlatformStats,
  fetchAuditLogs,
} from "../api/adminApi";

export function useUsers(params = {}) {
  return useQuery({
    queryKey: ["admin:users", params],
    queryFn: () => fetchUsers(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUser(id) {
  return useQuery({
    queryKey: ["admin:user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });
}

export function useBanUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: banUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin:users"] });
    },
  });
}

export function useUnbanUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unbanUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin:users"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin:users"] });
    },
  });
}

export function usePendingCompanies(params = {}) {
  return useQuery({
    queryKey: ["admin:pending-companies", params],
    queryFn: () => fetchPendingCompanies(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useVerifyCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action }) => verifyCompany(id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin:pending-companies"] });
    },
  });
}

export function usePlatformStats() {
  return useQuery({
    queryKey: ["admin:stats"],
    queryFn: fetchPlatformStats,
    staleTime: 1000 * 60 * 10,
  });
}

export function useAuditLogs(params = {}) {
  return useQuery({
    queryKey: ["admin:audit-logs", params],
    queryFn: () => fetchAuditLogs(params),
  });
}

