import { Shield, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../config/routes";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <Shield className="h-12 w-12 text-red-600" />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Access Denied
        </h1>
        <h2 className="mb-4 text-xl text-gray-700">
          You don't have permission to view this page
        </h2>
        <p className="mb-8 max-w-md text-gray-600">
          This page is restricted to users with specific permissions.
          Please contact your administrator if you believe this is an error.
        </p>
        <div className="flex justify-center gap-4">
          <Link to={ROUTES.HOME}>
            <button className="rounded-md bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700">
              Go to Homepage
            </button>
          </Link>
          <Link to={ROUTES.LOGIN}>
            <button className="rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}


