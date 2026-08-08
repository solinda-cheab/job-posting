import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex shadow-xl rounded-lg overflow-hidden">
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center bg-primary-600 p-12 text-white">
            <div className="mb-6 text-4xl font-bold">JobPlatform</div>
            <h2 className="mb-4 text-2xl font-semibold">
              Join the leading job platform
            </h2>
            <p className="text-lg opacity-90">
              Connect with top employers and find your dream career opportunity.
            </p>
          </div>
          <div className="w-full lg:w-1/2 p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
