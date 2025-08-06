import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text",
  label,
  error,
  helperText,
  ...props 
}, ref) => {
  const baseStyles = "flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200";

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 block mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          baseStyles,
          error && "border-error focus:border-error focus:ring-error",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;