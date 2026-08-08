import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  submitApplication,
  fetchApplications,
  fetchApplicationById,
  updateApplicationStatus,
  withdrawApplication,
} from "../api/applicationsApi";

export function useApplications(userId) {
  return useQuery({
    queryKey: ["applications", userId],
    queryFn: () => fetchApplications({ userId }),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

export function useApplication(id) {
  return useQuery({
    queryKey: ["application", id],
    queryFn: () => fetchApplicationById(id),
    enabled: !!id,
  });
}

export function useSubmitApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => updateApplicationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useWithdrawApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: withdrawApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

