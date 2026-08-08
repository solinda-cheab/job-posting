import { useParams } from "react-router-dom";
import { useJob } from "../../features/jobs/hooks/useJobs";
import Spinner from "../../components/feedback/Spinner";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import {
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Share2,
  Bookmark,
} from "lucide-react";
import {
  formatSalary,
  formatRelativeTime,
  formatDate,
} from "../../utils/formatters";
import {
  JOB_TYPE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
} from "../../config/constants";
import ApplyModal from "../../features/jobs/components/ApplyModal";
import { useState } from "react";

export default function JobDetailPage() {
  const { id } = useParams();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const { data: job, isLoading } = useJob(id);

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600">Job not found</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-gray-100">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="h-10 w-10 object-contain"
                />
              ) : (
                <span className="text-xl font-bold">{job.company?.charAt(0)}</span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {job.company}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>
                <span>·</span>
                <Badge variant="secondary">
                  {JOB_TYPE_LABELS[job.type] || job.type}
                </Badge>
                <Badge variant="outline">
                  {EXPERIENCE_LEVEL_LABELS[job.experienceLevel] || job.experienceLevel}
                </Badge>
                <span>Posted {formatRelativeTime(job.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
              aria-label="Save job"
            >
              <Bookmark className="h-5 w-5" />
            </button>
            <button
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
              aria-label="Share job"
            >
              <Share2 className="h-5 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 rounded-lg bg-gray-50 dark:bg-gray-800 p-6">
          <DollarSign className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-semibold">Salary Range</p>
            <p className="text-lg">
              {formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => setIsApplyModalOpen(true)}
            className="w-full sm:w-auto"
          >
            <Button variant="primary" size="lg">
              Apply Now
            </Button>
          </button>
        </div>

        <div className="mt-8 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
              {job.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <ul className="list-disc list-inside space-y-1">
              {job.requirements?.map((req, i) => (
                <li key={i} className="text-gray-700 dark:text-gray-300">
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">What We Offer</h2>
            <ul className="list-disc list-inside space-y-1">
              <li className="text-gray-700 dark:text-gray-300">Competitive salary</li>
              <li className="text-gray-700 dark:text-gray-300">Flexible working hours</li>
              <li className="text-gray-700 dark:text-gray-300">Professional development</li>
              <li className="text-gray-700 dark:text-gray-300">Health insurance</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Application Deadline
            </h2>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Calendar className="h-5 w-5" />
              {formatDate(job.applicationDeadline)}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills?.map((skill) => (
                <Badge key={skill} variant="default">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        job={job}
      />
    </div>
  );
}


