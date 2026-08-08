import { useAuth } from "../../context/AuthContext";
import { useCompanyMetrics } from "../../features/employer/hooks/useEmployerJobs";
import AnalyticsOverview from "../../features/employer/components/AnalyticsOverview";
import Spinner from "../../components/feedback/Spinner";

export default function EmployerDashboard() {
  const { user } = useAuth();
  const { data, isLoading } = useCompanyMetrics();

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Employer Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Welcome back, {user?.firstName || "Employer"}!
          </p>
        </div>

        <div className="mb-8">
          <AnalyticsOverview metrics={data} />
        </div>
      </div>
    </div>
  );
}


