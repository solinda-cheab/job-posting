import { Link } from "react-router-dom";
import { ROUTES } from "../../config/routes";

export default function Footer() {
  const footerLinks = {
    "Product": [
      { name: "Jobs", to: ROUTES.JOBS },
      { name: "Companies", to: ROUTES.COMPANIES },
      { name: "Pricing", to: ROUTES.PRICING },
    ],
    "Company": [
      { name: "About", to: ROUTES.ABOUT },
      { name: "Blog", to: ROUTES.BLOG },
      { name: "Careers", to: ROUTES.CAREERS },
    ],
    "Support": [
      { name: "Help Center", to: ROUTES.HELP },
      { name: "Contact", to: ROUTES.CONTACT },
      { name: "Privacy", to: ROUTES.PRIVACY },
      { name: "Terms", to: ROUTES.TERMS },
    ],
  };

  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <div className="text-xl font-bold">JobPlatform</div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Connecting talented professionals with great opportunities.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {category}
              </h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t pt-6 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} JobPlatform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

