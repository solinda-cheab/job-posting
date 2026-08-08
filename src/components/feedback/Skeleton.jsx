import clsx from "clsx";

export default function Skeleton({
  children,
  className,
  variant = "default",
  ...props
}) {
  const baseClasses = clsx(
    "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
    className
  );

  const variantClasses = {
    default: "h-4 w-full",
    card: "aspect-square w-full max-w-xs rounded-lg",
    text: "h-4 w-full",
    title: "h-6 w-3/4",
    button: "h-10 w-24 rounded-md",
    avatar: "h-10 w-10 rounded-full",
  };

  if (children) {
    return (
      <div
        className={clsx(baseClasses, variantClasses[variant])}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={clsx(baseClasses, variantClasses[variant])}
      {...props}
    />
  );
}

Skeleton.Card = function SkeletonCard({ count = 1, className }) {
  return Array.from({ length: count }).map((_, i) => (
    <div
      key={i}
      className={clsx(
        "animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700 h-48 w-full",
        className
      )}
    />
  ));
};

Skeleton.Text = function SkeletonText({ lines = 3, className }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            "h-3 animate-pulse rounded bg-gray-200 dark:bg-gray-700",
            i === lines - 1 ? "w-3/4" : "w-full",
            className
          )}
        />
      ))}
    </div>
  );
};

Skeleton.Table = function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div className="animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            "h-4 rounded bg-gray-200 dark:bg-gray-700 mb-3",
            i === 0 ? "h-6" : "h-4"
          )}
        />
      ))}
    </div>
  );
};
