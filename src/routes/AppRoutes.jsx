import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import SeekerLayout from "../layouts/SeekerLayout";
import EmployerLayout from "../layouts/EmployerLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import { ROUTES, USER_ROLES } from "../config";

import HomePage from "../pages/public/HomePage";
import JobListPage from "../pages/public/JobListPage";
import JobDetailPage from "../pages/public/JobDetailPage";
import CompanyDetailPage from "../pages/public/CompanyDetailPage";
import NotFoundPage from "../pages/public/NotFoundPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import UnauthorizedPage from "../pages/auth/UnauthorizedPage";
import DashboardPage from "../pages/seeker/DashboardPage";
import MyApplicationsPage from "../pages/seeker/MyApplicationsPage";
import SavedJobsPage from "../pages/seeker/SavedJobsPage";
import ProfilePage from "../pages/seeker/ProfilePage";
import EmployerDashboard from "../pages/employer/EmployerDashboard";
import PostJobPage from "../pages/employer/PostJobPage";
import ManageJobsPage from "../pages/employer/ManageJobsPage";
import ApplicantsPage from "../pages/employer/ApplicantsPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagementPage from "../pages/admin/UserManagementPage";
import CompanyApprovalsPage from "../pages/admin/CompanyApprovalsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.JOBS} element={<JobListPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/companies/:id" element={<CompanyDetailPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<SeekerLayout />}>
          <Route
            path={ROUTES.SEEKER.DASHBOARD}
            element={
              <RoleBasedRoute
                allowedRoles={[USER_ROLES.APPLICANT]}
              />
            }
          >
            <Route index element={<DashboardPage />} />
          </Route>
          <Route path={ROUTES.SEEKER.APPLICATIONS} element={<MyApplicationsPage />} />
          <Route path={ROUTES.SEEKER.SAVED_JOBS} element={<SavedJobsPage />} />
          <Route path={ROUTES.SEEKER.PROFILE} element={<ProfilePage />} />
        </Route>

        <Route element={<EmployerLayout />}>
          <Route
            path={ROUTES.EMPLOYER.DASHBOARD}
            element={
              <RoleBasedRoute
                allowedRoles={[USER_ROLES.EMPLOYER, USER_ROLES.ADMIN]}
              />
            }
          >
            <Route index element={<EmployerDashboard />} />
          </Route>
          <Route path={ROUTES.EMPLOYER.POST_JOB} element={<PostJobPage />} />
          <Route path={ROUTES.EMPLOYER.MANAGE_JOBS} element={<ManageJobsPage />} />
          <Route path={ROUTES.EMPLOYER.APPLICANTS} element={<ApplicantsPage />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboard />} />
          <Route path={ROUTES.ADMIN.USERS} element={<UserManagementPage />} />
          <Route path={ROUTES.ADMIN.APPROVALS} element={<CompanyApprovalsPage />} />
        </Route>
      </Route>

      <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
