import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";
import RoleGuard from "../features/auth/components/RoleGuard";
import { USER_ROLES } from "../config/constants";

export default function AdminLayout() {
  return (
    <RoleGuard allowedRoles={[USER_ROLES.ADMIN]}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
