import { Check, X, ExternalLink } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useVerifyCompany } from "../hooks/useAdminStats";

export default function CompanyApprovalCard({ company, onApprove, onReject }) {
  const verifyMutation = useVerifyCompany();

  const handleApprove = () => {
    verifyMutation.mutate(
      { id: company.id, action: "APPROVE" },
      {
        onSuccess: () => onApprove?.(company.id),
      }
    );
  };

  const handleReject = () => {
    verifyMutation.mutate(
      { id: company.id, action: "REJECT" },
      {
        onSuccess: () => onReject?.(company.id),
      }
    );
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="h-12 w-12 rounded-md object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
              <span className="font-bold text-gray-600">
                {company.name?.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h3 className="font-semibold">{company.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {company.email}
            </p>
            <p className="text-sm text-gray-500">{company.industry}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
            aria-label="Visit website"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={X}
            onClick={handleReject}
            disabled={verifyMutation.isPending}
          >
            Reject
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={Check}
            onClick={handleApprove}
            disabled={verifyMutation.isPending}
          >
            Approve
          </Button>
        </div>
      </div>

      {company.documents && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Verification Documents</p>
          <div className="flex flex-wrap gap-2">
            {company.documents.map((doc) => (
              <a
                key={doc.id}
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border p-3 text-sm hover:bg-gray-50"
              >
                <ExternalLink className="h-4 w-4" />
                {doc.fileName || "Document"}
              </a>
            ))}
          </div>
        </div>
      )}

      {company.description && (
        <div className="mt-4">
          <p className="text-sm font-medium">About the Company</p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {company.description}
          </p>
        </div>
      )}
    </div>
  );
}

