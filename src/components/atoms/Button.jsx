import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-hover hover:-translate-y-0.5 focus:ring-primary",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-primary",
    outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus:ring-primary",
    ghost: "text-gray-600 hover:text-primary hover:bg-primary/10 focus:ring-primary",
    success: "bg-gradient-to-r from-success to-green-600 text-white hover:shadow-hover hover:-translate-y-0.5 focus:ring-success",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:shadow-hover hover:-translate-y-0.5 focus:ring-error"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-4 h-4", 
    lg: "w-5 h-5"
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isDisabled && "cursor-not-allowed opacity-50",
        className
      )}
      disabled={isDisabled}
      ref={ref}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          {children}
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <ApperIcon name={icon} className={cn(iconSizes[size], children && "mr-2")} />
          )}
          {children}
          {icon && iconPosition === "right" && (
            <ApperIcon name={icon} className={cn(iconSizes[size], children && "ml-2")} />
          )}
        </>
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;