export const ROUTES = {
  HOME: "/",
  JOBS: "/jobs",
  COMPANIES: "/companies",
  BLOG: "/blog",
  ABOUT: "/about",
  HELP: "/help",
  CONTACT: "/contact",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  CAREERS: "/careers",
  PRICING: "/pricing",

  LOGIN: "/login",
  REGISTER: "/register",
  UNAUTHORIZED: "/unauthorized",
  NOT_FOUND: "*",

  JOB_DETAILS(id = ":id") {
    return `/jobs/${id}`;
  },
  COMPANY_DETAILS(id = ":id") {
    return `/companies/${id}`;
  },

  SEEKER: {
    DASHBOARD: "/seeker/dashboard",
    APPLICATIONS: "/seeker/applications",
    SAVED_JOBS: "/seeker/saved-jobs",
    PROFILE: "/seeker/profile",
  },

  EMPLOYER: {
    DASHBOARD: "/employer/dashboard",
    POST_JOB: "/employer/jobs/new",
    MANAGE_JOBS: "/employer/jobs",
    APPLICANTS: "/employer/jobs/:jobId/applicants",
    COMPANY: "/employer/company",
    BILLING: "/employer/billing",
    SETTINGS: "/employer/settings",
    ANALYTICS: "/employer/analytics",
  },

  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users",
    APPROVALS: "/admin/approvals",
    REPORTS: "/admin/reports",
    SETTINGS: "/admin/settings",
  },
};

export const ROLE_BASED_ROUTES = {
  APPLICANT: Object.values(ROUTES.SEEKER),
  EMPLOYER: Object.values(ROUTES.EMPLOYER),
  ADMIN: Object.values(ROUTES.ADMIN),
};
