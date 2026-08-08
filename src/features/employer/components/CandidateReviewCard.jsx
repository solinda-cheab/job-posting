import { useState } from "react";
import { Eye, FileText, Download, User, Mail, Phone } from "lucide-react";
import Badge from "../../../components/ui/Badge";
import StatusBadge from "../../applications/components/StatusBadge";
import Button from "../../../components/ui/Button";

const statusOptions = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "SHORTLISTED",
  "INTERVIEWING",
  "OFFERED",
  "REJECTED",
];

export default function CandidateReviewCard({ applicant, isOpen, onClose, onStatusChange }) {
  const [selectedStatus, setSelectedStatus] = useState(applicant?.status || "");

  if (!isOpen || !applicant) return null;

  const handleStatusUpdate = () => {
    if (onStatusChange && selectedStatus !== applicant.status) {
      onStatusChange(applicant.id, selectedStatus);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-w-3xl w-full rounded-lg bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-semibold">Candidate Review</h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-6">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
              {applicant.candidate?.avatar ? (
                <img
                  src={applicant.candidate.avatar}
                  alt={applicant.candidate.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-gray-400" />
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold">{applicant.candidate?.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {applicant.appliedAt && new Date(applicant.appliedAt).toLocaleDateString()}
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{applicant.candidate?.email}</span>
                </div>
                {applicant.candidate?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{applicant.candidate.phone}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <StatusBadge status={applicant.status} />
                <Badge variant="secondary">
                  {applicant.experienceLevel || "N/A"}
                </Badge>
              </div>
            </div>
          </div>

          {applicant.coverLetter && (
            <div className="mt-6">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Cover Letter
              </h4>
              <div className="rounded-md bg-gray-50 dark:bg-gray-700 p-4 max-h-48 overflow-y-auto">
                <p className="text-sm whitespace-pre-wrap">{applicant.coverLetter}</p>
              </div>
            </div>
          )}

          {applicant.resumeUrl && (
            <div className="mt-6">
              <h4 className="font-medium mb-2">Resume</h4>
              <a
                href={applicant.resumeUrl}
                download
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          )}

          <div className="mt-6">
            <h4 className="font-medium mb-2">Application Status</h4>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t pt-6">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleStatusUpdate}>
              Update Status
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

