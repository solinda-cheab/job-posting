import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import {
  fetchJobs,
  searchJobs,
  fetchJobById,
  fetchJobFilters,
  fetchFeaturedJobs,
  fetchRecommendedJobs,
  fetchSavedJobs,
  saveJob,
  unsaveJob,
} from "../api/jobsApi";

export function useJobs(filters = {}, options = {}) {
  return useInfiniteQuery({
    queryKey: ["jobs", filters],
    queryFn: ({ pageParam = 1 }) =>
      fetchJobs({ page: pageParam, ...filters }),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    ...options,
  });
}

export function useJobSearch(query, filters = {}, options = {}) {
  const debouncedQuery = query;

  return useQuery({
    queryKey: ["jobs:search", debouncedQuery, filters],
    queryFn: () => searchJobs(debouncedQuery, filters),
    enabled: !!debouncedQuery,
    staleTime: 1000 * 60 * 2,
    ...options,
  });
}

export function useJob(id) {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useJobFilters() {
  return useQuery({
    queryKey: ["jobs:filters"],
    queryFn: fetchJobFilters,
    staleTime: 1000 * 60 * 10,
  });
}

export function useFeaturedJobs(limit = 6) {
  return useQuery({
    queryKey: ["jobs:featured", limit],
    queryFn: () => fetchFeaturedJobs(limit),
    staleTime: 1000 * 60 * 5,
  });
}

export function useRecommendedJobs(userId) {
  return useQuery({
    queryKey: ["jobs:recommended", userId],
    queryFn: () => fetchRecommendedJobs(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSavedJobs(userId) {
  return useQuery({
    queryKey: ["jobs:saved", userId],
    queryFn: () => fetchSavedJobs(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSaveJob() {
  return useMutation({
    mutationFn: ({ userId, jobId }) => saveJob(userId, jobId),
  });
}

export function useUnsaveJob() {
  return useMutation({
    mutationFn: ({ userId, jobId }) => unsaveJob(userId, jobId),
  });
}

export function useUnsubscribeJob() {
  return useMutation({
    mutationFn: ({ userId, jobId }) => unsaveJob(userId, jobId),
  });
}


