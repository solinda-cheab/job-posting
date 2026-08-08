import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Settings,
  BarChart3,
  FileText,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../config/routes";

const employerLinks = [
  { name: "Dashboard", icon: LayoutDashboard, to: ROUTES.EMPLOYER.DASHBOARD },
  { name: "Post Job", icon: Briefcase, to: ROUTES.EMPLOYER.POST_JOB },
  { name: "Manage Jobs", icon: FileText, to: ROUTES.EMPLOYER.MANAGE_JOBS },
  { name: "Applications", icon: Users, to: ROUTES.EMPLOYER.APPLICANTS },
  { name: "Analytics", icon: BarChart3, to: ROUTES.EMPLOYER.ANALYTICS },
  { name: "Settings", icon: Settings, to: ROUTES.EMPLOYER.SETTINGS },
];

const adminLinks = [
  { name: "Dashboard", icon: LayoutDashboard, to: ROUTES.ADMIN.DASHBOARD },
  { name: "User Management", icon: Users, to: ROUTES.ADMIN.USERS },
  { name: "Company Approvals", icon: FileText, to: ROUTES.ADMIN.APPROVALS },
  { name: "Reports", icon: BarChart3, to: ROUTES.ADMIN.REPORTS },
  { name: "Settings", icon: Settings, to: ROUTES.ADMIN.SETTINGS },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const links = user?.role === "admin" ? adminLinks : employerLinks;

  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r bg-gray-50 dark:bg-gray-800">
      <div className="p-4">
        <div className="text-xl font-bold mb-6 px-2">JobPlatform</div>
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
