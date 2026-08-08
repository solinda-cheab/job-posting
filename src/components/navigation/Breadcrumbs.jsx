import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { ROUTES } from "../../config/routes";

export default function Breadcrumbs({ customItems }) {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const homeItem = {
    name: "Home",
    to: ROUTES.HOME,
    icon: Home,
  };

  const items = customItems
    ? [homeItem, ...customItems]
    : pathSegments.reduce((acc, segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const name =
          segment.charAt(0).toUpperCase() + segment.slice(1);
        return [...acc, { name, to: path }];
      }, [homeItem]);

  if (items.length <= 1) return null;

  return (
    <nav
      aria-label="breadcrumbs"
      className="flex items-center text-sm text-gray-600 dark:text-gray-400"
    >
      <ol className="flex items-center">
        {items.map((item, index) => (
          <li key={item.to || index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            )}
            {item.icon && index === 0 ? (
              <item.icon className="h-4 w-4 mr-1" />
            ) : null}
            {index === items.length - 1 ? (
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {item.name}
              </span>
            ) : (
              <Link
                to={item.to}
                className="hover:text-gray-900 dark:hover:text-gray-100"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

