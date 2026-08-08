import {
  TrendingUp,
  Users,
  Briefcase,
  FileCheck,
  DollarSign,
} from "lucide-react";
import { usePlatformStats } from "../hooks/useAdminStats";

const statIcons = {
  totalJobs: Briefcase,
  totalUsers: Users,
  totalCompanies: FileCheck,
  totalApplication: Briefcase,
  totalRevenue: DollarSign,
};

export default function PlatformStats() {
  const { data, isLoading } = usePlatformStats();
  const stats = data?.metrics || {};

  if (isLoading) {
    return <div>Loading stats...</div>;
  }

  const statItems = [
    { key: "totalJobs", label: "Total Jobs Posted", value: stats.totalJobs },
    { key: "totalUsers", label: "Active Users", value: stats.totalUsers },
    { key: "totalCompanies", label: "Verified Companies", value: stats.totalCompanies },
    { key: "totalApplication", label: "Total Applications", value: stats.totalApplications },
    { key: "totalRevenue", label: "Platform Revenue", value: stats.totalRevenue },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Platform Statistics</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statItems.map((item) => {
          const Icon = statIcons[item.key] || TrendingUp;
          return (
            <div
              key={item.key}
              className="rounded-lg border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-primary-50 dark:bg-gray-700 p-2">
                  <Icon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{item.value || 0}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {item.label}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
