import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import { ROUTES } from "../config/routes";

const seekerNav = [
  { name: "Dashboard", to: ROUTES.SEEKER.DASHBOARD },
  { name: "My Applications", to: ROUTES.SEEKER.APPLICATIONS },
  { name: "Saved Jobs", to: ROUTES.SEEKER.SAVED_JOBS },
  { name: "Profile", to: ROUTES.SEEKER.PROFILE },
];

export default function SeekerLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto flex items-center gap-4 overflow-x-auto px-4 py-3">
          {seekerNav.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
