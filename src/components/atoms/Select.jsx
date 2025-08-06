import React from "react";
import { cn } from "@/utils/cn";

const Select = React.forwardRef(({ 
  className, 
  label,
  error,
  children,
  ...props 
}, ref) => {
  const baseStyles = "flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200";

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 block mb-2">
          {label}
        </label>
      )}
      <select
        className={cn(
          baseStyles,
          error && "border-error focus:border-error focus:ring-error",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;