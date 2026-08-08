import clsx from "clsx";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search, User, LogIn } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import { ROUTES } from "../../config/routes";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: "Home", to: ROUTES.HOME },
    { name: "Jobs", to: ROUTES.JOBS },
    { name: "Companies", to: ROUTES.COMPANIES },
    ...(isAuthenticated
      ? [
          {
            name: "Dashboard",
            to: `/${user?.role?.toLowerCase()}/dashboard`,
          },
        ]
      : []),
    ...(isAuthenticated
      ? [{ name: "Logout", onClick: logout }]
      : [
          {
            name: "Login",
            icon: LogIn,
            to: ROUTES.LOGIN,
          },
          {
            name: "Register",
            to: ROUTES.REGISTER,
          },
        ]),
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
              <div className="text-xl font-bold">JobPlatform</div>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) =>
              link.onClick ? (
                <button
                  key={link.name}
                  onClick={link.onClick}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {link.name}
                </button>
              ) : (
                <NavLink
                  key={link.to || link.name}
                  to={link.to}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-1 text-sm font-medium",
                      isActive
                        ? "text-primary-600"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900"
                    )
                  }
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.name}
                </NavLink>
              )
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) =>
              link.onClick ? (
                <button
                  key={link.name}
                  onClick={() => {
                    link.onClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {link.name}
                </button>
              ) : (
                <NavLink
                  key={link.to || link.name}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      "block px-4 py-2 text-sm font-medium",
                      isActive
                        ? "text-primary-600 bg-primary-50"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
