import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchEmployerJobs,
  createJob,
  updateJob,
  deleteJob,
  fetchApplicants,
  updateApplicationStatus,
  fetchCompanyMetrics,
  fetchApplicantDetails,
} from "../api/employerApi";

export function useEmployerJobs(params = {}) {
  return useQuery({
    queryKey: ["employer:jobs", params],
    queryFn: () => fetchEmployerJobs(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer:jobs"] });
    },
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer:jobs"] });
    },
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer:jobs"] });
    },
  });
}

export function useApplicants(jobId, params = {}) {
  return useQuery({
    queryKey: ["employer:applicants", jobId, params],
    queryFn: () => fetchApplicants(jobId, params),
    enabled: !!jobId,
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, applicantId, status }) =>
      updateApplicationStatus(jobId, applicantId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer:applicants"] });
    },
  });
}

export function useCompanyMetrics() {
  return useQuery({
    queryKey: ["employer:analytics"],
    queryFn: fetchCompanyMetrics,
    staleTime: 1000 * 60 * 5,
  });
}

export function useApplicantDetails(applicantId) {
  return useQuery({
    queryKey: ["employer:applicant", applicantId],
    queryFn: () => fetchApplicantDetails(applicantId),
    enabled: !!applicantId,
  });
}

