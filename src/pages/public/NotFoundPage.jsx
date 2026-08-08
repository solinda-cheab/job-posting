import { Link } from "react-router-dom";
import { ROUTES } from "../../config/routes";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-600">
          Sorry, the page you are looking for does not exist or has been
          removed.
        </p>
        <div className="mt-6">
          <Link to={ROUTES.HOME}>
            <button className="rounded-md bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700">
              Go Back Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}


