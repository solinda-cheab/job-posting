import { useFeaturedJobs } from "../../features/jobs/hooks/useJobs";
import JobCard from "../../features/jobs/components/JobCard";
import { Link } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import Spinner from "../../components/feedback/Spinner";
import Button from "../../components/ui/Button";

const categories = [
  { name: "Technology", icon: "💻", count: 1243 },
  { name: "Finance", icon: "💰", count: 567 },
  { name: "Healthcare", icon: "🏥", count: 432 },
  { name: "Marketing", icon: "📢", count: 689 },
  { name: "Design", icon: "🎨", count: 345 },
  { name: "Sales", icon: "📊", count: 789 },
];

const companies = [
  { name: "Google", logo: "G" },
  { name: "Microsoft", logo: "M" },
  { name: "Amazon", logo: "A" },
  { name: "Apple", logo: "A" },
];

export default function HomePage() {
  const { data: featuredJobs, isLoading } = useFeaturedJobs(6);

  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white py-20 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Find Your Dream Career
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300 mx-auto">
            Discover thousands of job opportunities with top companies
            across various industries.
          </p>
          <div className="mt-8">
            <Link to={ROUTES.JOBS}>
              <Button variant="primary" size="lg">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Job Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="rounded-lg border bg-card p-6 text-center transition-shadow hover:shadow-md"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.count} openings
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Jobs</h2>
            <Link
              to={ROUTES.JOBS}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              View all jobs
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs?.jobs?.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Top Companies</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Join leading companies hiring on our platform
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {companies.map((company) => (
              <div
                key={company.name}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl font-bold"
              >
                {company.logo}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


