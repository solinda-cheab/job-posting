import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import ApplicationCard from "../../features/applications/components/ApplicationCard";
import Spinner from "../../components/feedback/Spinner";
import { APPLICATION_STATUS } from "../../config/constants";

export default function MyApplicationsPage() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["applications", user?.sub || user?.id],
    queryFn: () => fetch("/api/applications").then((res) => res.json()),
    enabled: !!user,
  });

  const applications = data?.applications || [];

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          You haven't applied to any jobs yet.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">My Applications</h1>

        <div className="mb-6 flex gap-2 flex-wrap">
          {APPLICATION_STATUS.map((status) => (
            <button
              key={status}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
            >
              {status.replace(/_/g, " ")}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      </div>
    </div>
  );
}


