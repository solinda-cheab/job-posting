import { useAuth } from "../../context/AuthContext";
import PlatformStats from "../../features/admin/components/PlatformStats";
import Spinner from "../../components/feedback/Spinner";
import { usePendingCompanies, useVerifyCompany } from "../../features/admin/hooks/useAdminStats";
import CompanyApprovalCard from "../../features/admin/components/CompanyApprovalCard";
import { useToast } from "../../components/feedback/Toast";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { data: pendingCompanies, isLoading } = usePendingCompanies();

  const companies = pendingCompanies?.companies || [];

  const handleVerify = (id, action) => {
    // This will be handled by CompanyApprovalCard
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Welcome back, {user?.firstName || "Admin"}! Manage platform operations.
          </p>
        </div>

        <div className="mb-8">
          <PlatformStats />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Pending Company Approvals ({companies.length})
          </h2>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Spinner size="lg" />
            </div>
          ) : companies.length > 0 ? (
            <div className="space-y-4">
              {companies.map((company) => (
                <CompanyApprovalCard
                  key={company.id}
                  company={company}
                  onApprove={(id) => {
                    addToast({
                      variant: "success",
                      title: "Company Approved",
                      description: `${company.name} has been approved.`,
                    });
                  }}
                  onReject={(id) => {
                    addToast({
                      variant: "success",
                      title: "Company Rejected",
                      description: `${company.name} has been rejected.`,
                    });
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              No pending company approvals at this time.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


