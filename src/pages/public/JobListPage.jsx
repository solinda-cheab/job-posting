import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useJobs, useJobSearch, useJobFilters } from "../../features/jobs/hooks/useJobs";
import JobCard from "../../features/jobs/components/JobCard";
import JobSearchHeader from "../../features/jobs/components/JobSearchHeader";
import JobFilters from "../../features/jobs/components/JobFilters";
import Spinner from "../../components/feedback/Spinner";
import Button from "../../components/ui/Button";
import { PAGE_SIZE } from "../../config/constants";

export default function JobListPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [filters, setFilters] = useState({
    type: [],
    experienceLevel: [],
    salaryMin: "",
    salaryMax: "",
    category: [],
    location: "",
  });

  const handleSearch = (searchTerm) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({
      type: [],
      experienceLevel: [],
      salaryMin: "",
      salaryMax: "",
      category: [],
      location: "",
    });
  };

  const activeFilters = { ...filters, search: query };
  const { data, isLoading, error } = useJobs(activeFilters);

  const jobs = data?.jobs || [];
  const {
    data: filtersData,
    isLoading: filtersLoading,
  } = useJobFilters();

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-500">Failed to load jobs. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Job Listings</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {data?.total || 0} jobs found
          </p>
        </div>

        <div className="mb-6">
          <JobSearchHeader
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <JobFilters
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleReset}
            />
          </aside>

          <main className="lg:col-span-3">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  No jobs found. Try adjusting your search filters.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}


