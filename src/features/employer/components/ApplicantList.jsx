import { useState } from "react";
import { Eye, MessageCircle, Download } from "lucide-react";
import Table from "../../../components/ui/Table";
import StatusBadge from "../../applications/components/StatusBadge";
import { useApplicants } from "../hooks/useEmployerJobs";

export default function ApplicantList({ jobId }) {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const { data, isLoading } = useApplicants(jobId);
  const applicants = data?.applicants || [];

  const columns = [
    { key: "candidate", label: "Candidate" },
    { key: "appliedAt", label: "Applied" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  if (isLoading) {
    return <div>Loading applicants...</div>;
  }

  return (
    <div className="space-y-4">
      <Table>
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.Head key={col.key}>{col.label}</Table.Head>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {applicants.map((applicant) => (
            <Table.Row key={applicant.id}>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {applicant.candidate?.avatar ? (
                      <img
                        src={applicant.candidate.avatar}
                        alt={applicant.candidate.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold">
                        {applicant.candidate?.name?.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{applicant.candidate?.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {applicant.candidate?.email}
                    </p>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <span className="text-sm text-gray-500">
                  {applicant.appliedAt}
                </span>
              </Table.Cell>
              <Table.Cell>
                <StatusBadge status={applicant.status} />
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedApplicant(applicant)}
                    className="rounded-md p-1 text-gray-600 hover:bg-gray-100"
                    aria-label="View applicant"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    className="rounded-md p-1 text-gray-600 hover:bg-gray-100"
                    aria-label="Message applicant"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </button>
                  {applicant.resumeUrl && (
                    <a
                      href={applicant.resumeUrl}
                      download
                      className="rounded-md p-1 text-gray-600 hover:bg-gray-100"
                      aria-label="Download resume"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {selectedApplicant && (
        <CandidateReviewCard
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}
    </div>
  );
}

