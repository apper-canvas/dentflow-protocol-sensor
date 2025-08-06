import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ 
  className, 
  gradient = false,
  hover = false,
  children,
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-xl shadow-card transition-all duration-200";
  
  return (
    <div
      className={cn(
        baseStyles,
        gradient && "bg-gradient-to-br from-white to-gray-50",
        hover && "hover:shadow-hover hover:-translate-y-0.5 cursor-pointer",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;