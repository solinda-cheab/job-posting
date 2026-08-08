import { BarChart3, Users, Eye, Briefcase } from "lucide-react";
import Badge from "../../../components/ui/Badge";

const statCards = [
  {
    title: "Total Job Views",
    value: "1,243",
    icon: Eye,
    change: "+12% from last month",
    trend: "up",
  },
  {
    title: "Total Applications",
    value: "89",
    icon: Users,
    change: "+5% from last month",
    trend: "up",
  },
  {
    title: "Active Listings",
    value: "12",
    icon: Briefcase,
    change: "2 ending this week",
    trend: "neutral",
  },
  {
    title: "Hire Rate",
    value: "23%",
    icon: Users,
    change: "+3% from last month",
    trend: "up",
  },
];

export default function AnalyticsOverview() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Analytics Overview</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-md bg-primary-50 dark:bg-gray-700 p-2">
                <stat.icon className="h-5 w-5 text-primary-600" />
              </div>
              <Badge
                variant={stat.trend === "up" ? "success" : stat.trend === "down" ? "danger" : "secondary"}
              >
                {stat.change}
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

