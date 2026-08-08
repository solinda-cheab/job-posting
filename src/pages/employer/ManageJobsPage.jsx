import { useAuth } from "../../context/AuthContext";
import { useEmployerJobs, useDeleteJob } from "../../features/employer/hooks/useEmployerJobs";
import Spinner from "../../components/feedback/Spinner";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import { useToast } from "../../components/feedback/Toast";

export default function ManageJobsPage() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { data, isLoading } = useEmployerJobs({
    companyId: user?.companyId,
  });
  const deleteJobMutation = useDeleteJob();

  const jobs = data?.jobs || [];

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJobMutation.mutateAsync(jobId);
        addToast({
          variant: "success",
          title: "Job Deleted",
          description: "The job listing has been removed.",
        });
      } catch (error) {
        addToast({
          variant: "error",
          title: "Error",
          description: "Failed to delete job.",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Manage Jobs</h1>
          <Link to={ROUTES.EMPLOYER.POST_JOB}>
            <Button variant="primary">Post New Job</Button>
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              You haven't posted any jobs yet.
            </p>
            <Link to={ROUTES.EMPLOYER.POST_JOB} className="mt-4 inline-block">
              <Button variant="primary">Create Your First Job</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between rounded-lg border bg-card p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                    <span className="font-bold">
                      {job.company?.charAt(0) || "C"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {job.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={job.isActive ? "success" : "secondary"}>
                    {job.isActive ? "Active" : "Closed"}
                  </Badge>
                  <Link to={ROUTES.JOB_DETAILS(job.id)} aria-label="View job">
                    <button className="rounded-md p-1 text-gray-600 hover:bg-gray-100">
                      <Eye className="h-4 w-4" />
                    </button>
                  </Link>
                  <button
                    onClick={() => console.log("Edit", job.id)}
                    className="rounded-md p-1 text-gray-600 hover:bg-gray-100"
                    aria-label="Edit job"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="rounded-md p-1 text-red-600 hover:bg-red-50"
                    aria-label="Delete job"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


