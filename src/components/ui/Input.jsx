import { forwardRef } from "react";
import clsx from "clsx";

const Input = forwardRef(
  (
    {
      label,
      name,
      error,
      helperText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className,
      ...props
    },
    ref
  ) => {
    const inputClasses = clsx(
      "w-full rounded-md border bg-background px-3 py-2 text-sm",
      "placeholder:text-muted-foreground focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring",
      error
        ? "border-red-500 focus-visible:ring-red-500"
        : "border-input",
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={name}
            className="mb-1.5 block text-sm font-medium"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {LeftIcon && (
            <LeftIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          )}
          <input
            ref={ref}
            id={name}
            name={name}
            className={clsx(
              inputClasses,
              LeftIcon && "pl-10",
              RightIcon && "pr-10"
            )}
            {...props}
          />
          {RightIcon && (
            <RightIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
