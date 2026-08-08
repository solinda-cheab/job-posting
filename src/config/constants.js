export const APP_NAME = "JobPlatform";
export const APP_DESCRIPTION = "Connecting talented professionals with great opportunities.";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const API_VERSION = "/v1";

export const PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;

export const JOB_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "REMOTE"];
export const JOB_TYPE_LABELS = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  REMOTE: "Remote",
};

export const EXPERIENCE_LEVELS = ["ENTRY", "MID", "SENIOR", "LEAD", "EXECUTIVE"];
export const EXPERIENCE_LEVEL_LABELS = {
  ENTRY: "Entry Level",
  MID: "Mid Level",
  SENIOR: "Senior Level",
  LEAD: "Lead",
  EXECUTIVE: "Executive",
};

export const USER_ROLES = {
  APPLICANT: "APPLICANT",
  EMPLOYER: "EMPLOYER",
  ADMIN: "ADMIN",
};

export const APPLICATION_STATUS = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "SHORTLISTED",
  "INTERVIEWING",
  "OFFERED",
  "REJECTED",
  "WITHDRAWN",
];

export const APPLICATION_STATUS_LABELS = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  SHORTLISTED: "Shortlisted",
  INTERVIEWING: "Interviewing",
  OFFERED: "Offered",
  REJECTED: "Rejected",
  WITHDRAWN: "Withdrawn",
};

export const COMPANY_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  SUSPENDED: "SUSPENDED",
};

export const TOKEN_STORAGE_KEY = "job_platform_token";
export const REFRESH_TOKEN_STORAGE_KEY = "job_platform_refresh_token";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
