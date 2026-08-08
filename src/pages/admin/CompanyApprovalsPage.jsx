import { usePendingCompanies } from "../../features/admin/hooks/useAdminStats";
import CompanyApprovalCard from "../../features/admin/components/CompanyApprovalCard";
import Spinner from "../../components/feedback/Spinner";

export default function CompanyApprovalsPage() {
  const { data, isLoading } = usePendingCompanies();
  const companies = data?.companies || [];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Company Approvals</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Review and approve new company registrations.
        </p>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner size="lg" />
          </div>
        ) : companies.length > 0 ? (
          <div className="space-y-4">
            {companies.map((company) => (
              <CompanyApprovalCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              No pending company approvals at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


