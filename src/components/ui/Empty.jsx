import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  className, 
  icon = "FileX",
  title = "No data found", 
  message = "There's nothing here yet.", 
  actionLabel,
  onAction,
  ...props 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center animate-fade-in", className)} {...props}>
      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <ApperIcon name={icon} className="w-10 h-10 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-secondary text-sm mb-6 max-w-md">
        {message}
      </p>
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-hover hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};

export default Empty;