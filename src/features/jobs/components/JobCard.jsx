import { Link } from "react-router-dom";
import { MapPin, Clock, DollarSign, Bookmark } from "lucide-react";
import { formatSalary, formatRelativeTime, truncateText } from "../../../utils/formatters";
import { JOB_TYPE_LABELS } from "../../../config/constants";
import Badge from "../../../components/ui/Badge";
import { ROUTES } from "../../../config/routes";

export default function JobCard({ job, showSaveButton = true, compact = false }) {
  const {
    id,
    title,
    company,
    companyLogo,
    location,
    salaryMin,
    salaryMax,
    type,
    experienceLevel,
    description,
    createdAt,
    isSaved,
  } = job;

  return (
    <div className="group relative flex flex-col rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={company}
                className="h-8 w-8 object-contain"
              />
            ) : (
              <span className="text-lg font-bold text-gray-600">
                {company?.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-semibold">
              <Link
                to={ROUTES.JOB_DETAILS(id)}
                className="hover:text-primary-600"
              >
                {title}
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {company}
            </p>
          </div>
        </div>

        {showSaveButton && (
          <button
            className={`
              rounded-md p-1.5 transition-colors
              ${isSaved
                ? "bg-primary-50 text-primary-600"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"}
            `}
            aria-label={isSaved ? "Unsave job" : "Save job"}
          >
            <Bookmark
              className="h-4 w-4"
              fill={isSaved ? "currentColor" : "none"}
            />
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {location}
        </div>
        <span>·</span>
        <Badge variant="secondary" size="sm">
          {JOB_TYPE_LABELS[type] || type}
        </Badge>
        <span>·</span>
        <Badge variant="outline" size="sm">
          {experienceLevel}
        </Badge>
      </div>

      {(salaryMin || salaryMax) && (
        <div className="mt-3 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-gray-100">
          <DollarSign className="h-4 w-4" />
          {formatSalary(salaryMin)} - {formatSalary(salaryMax)}
        </div>
      )}

      {!compact && (
        <>
          <p className="mt-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
            {truncateText(description, 150)}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {job.skills?.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="default" size="sm">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              {formatRelativeTime(createdAt)}
            </div>
          </div>
        </>
      )}

      {compact && (
        <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          {formatRelativeTime(createdAt)}
        </div>
      )}
    </div>
  );
}

