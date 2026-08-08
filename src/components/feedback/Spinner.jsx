import { Loader2 } from "lucide-react";
import clsx from "clsx";

export default function Spinner({
  size = "md",
  className,
  ...props
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <div
      role="status"
      className={clsx(
        "inline-block animate-spin",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <Loader2 className="h-full w-full" />
    </div>
  );
}
