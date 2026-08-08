import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/feedback/Spinner";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { MapPin, Globe, Users, ExternalLink } from "lucide-react";
import { ROUTES } from "../../config/routes";
import { Link } from "react-router-dom";

export default function CompanyDetailPage() {
  const { id } = useParams();

  const { data: company, isLoading } = useQuery({
    queryKey: ["company", id],
    queryFn: () => fetch(`/api/companies/${id}`).then((res) => res.json()),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600">Company not found</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-20 w-20 object-contain"
                />
              ) : (
                <span className="text-3xl font-bold">
                  {company.name?.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{company.name}</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {company.industry}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {company.location}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {company.size || "N/A"} employees
                </div>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary-600 hover:text-primary-700"
                  >
                    <Globe className="h-4 w-4" />
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {company.description || "No description available."}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Open Positions</h2>
          <div className="space-y-4">
            {company.jobs?.length > 0 ? (
              company.jobs.map((job) => (
                <Link
                  key={job.id}
                  to={ROUTES.JOB_DETAILS(job.id)}
                  className="block rounded-lg border p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {job.company}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {job.type}
                    </Badge>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                No open positions currently available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


