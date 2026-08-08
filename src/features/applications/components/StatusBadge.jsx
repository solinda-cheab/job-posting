import { APPLICATION_STATUS_LABELS } from "../../../config/constants";
import Badge from "../../../components/ui/Badge";

const statusVariantMap = {
  SUBMITTED: "default",
  UNDER_REVIEW: "primary",
  SHORTLISTED: "secondary",
  INTERVIEWING: "warning",
  OFFERED: "success",
  REJECTED: "danger",
  WITHDRAWN: "outline",
};

export default function StatusBadge({ status, showIcon = false }) {
  const label = APPLICATION_STATUS_LABELS[status] || status;
  const variant = statusVariantMap[status] || "default";

  return (
    <Badge variant={variant} size="sm">
      {label}
    </Badge>
  );
}

