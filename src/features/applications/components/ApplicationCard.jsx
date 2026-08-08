import { Link } from "react-router-dom";
import { Calendar, FileText } from "lucide-react";
import { formatRelativeTime, formatDate } from "../../../utils/formatters";
import Badge from "../../../components/ui/Badge";
import StatusBadge from "./StatusBadge";
import { APPLICATION_STATUS_LABELS } from "../../../config/constants";
import { ROUTES } from "../../../config/routes";

export default function ApplicationCard({ application, compact = false }) {
  const {
    id,
    job,
    status,
    createdAt,
    updatedAt,
    coverLetter,
    resumeUrl,
  } = application;

  return (
    <div className="border rounded-lg p-4 sm:p-6 bg-card">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {job?.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.company}
                className="h-12 w-12 rounded-md object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
                <span className="text-lg font-bold">
                  {job?.company?.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <Link
              to={ROUTES.JOB_DETAILS(job?.id)}
              className="hover:text-primary-600"
            >
              <h3 className="font-semibold">{job?.title}</h3>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {job?.company}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Applied: {formatDate(createdAt)}
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Last Updated: {formatDate(updatedAt)}
              </div>
            </div>

            {!compact && (
              <>
                {coverLetter && (
                  <div className="mt-3">
                    <p className="text-sm font-medium">Cover Letter</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {coverLetter}
                    </p>
                  </div>
                )}
                {resumeUrl && (
                  <div className="mt-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <Link
                      to={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      View Resume
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex-shrink-0">
          <StatusBadge status={status} />
        </div>
      </div>
    </div>
  );
}

