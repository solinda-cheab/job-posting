import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import JobCard from "../../features/jobs/components/JobCard";
import Spinner from "../../components/feedback/Spinner";
import { ROUTES } from "../../config/routes";
import { Link } from "react-router-dom";

export default function SavedJobsPage() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["saved-jobs", user?.sub || user?.id],
    queryFn: () => fetch("/api/users/saved-jobs").then((res) => res.json()),
    enabled: !!user,
  });

  const savedJobs = data?.jobs || [];

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (savedJobs.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          You haven't saved any jobs yet.
        </p>
        <Link to={ROUTES.JOBS}>
          <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
            Browse Jobs
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Saved Jobs</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}


