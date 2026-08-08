import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { useFeaturedJobs, useRecommendedJobs } from "../../features/jobs/hooks/useJobs";
import JobCard from "../../features/jobs/components/JobCard";
import Spinner from "../../components/feedback/Spinner";
import { Briefcase, FileText, Bookmark } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const { data: recommendedJobs, isLoading: jobsLoading } = useRecommendedJobs(
    user?.sub || user?.id
  );
  const { data: featuredJobs, isLoading: featuredLoading } = useFeaturedJobs(4);
  const { data: applications, isLoading: appsLoading } = useQuery({
    queryKey: ["applications", user?.sub || user?.id],
    queryFn: () => fetch("/api/applications").then((res) => res.json()),
    enabled: !!user,
  });

  const stats = [
    {
      name: "Applications Submitted",
      value: applications?.length || 0,
      icon: FileText,
    },
    {
      name: "Saved Jobs",
      value: 12,
      icon: Bookmark,
    },
    {
      name: "Recommended Jobs",
      value: recommendedJobs?.jobs?.length || 0,
      icon: Briefcase,
    },
  ];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.firstName || "John"}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Here's your dashboard overview
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="rounded-lg border bg-card p-6"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-primary-50 dark:bg-gray-700 p-2">
                  <stat.icon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
            {jobsLoading ? (
              <div className="flex justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recommendedJobs?.jobs?.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Featured Jobs</h2>
            {featuredLoading ? (
              <div className="flex justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {featuredJobs?.jobs?.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


