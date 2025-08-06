import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  className, 
  message = "Something went wrong", 
  onRetry,
  showRetry = true,
  ...props 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center animate-fade-in", className)} {...props}>
      <div className="w-16 h-16 bg-gradient-to-br from-error to-red-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-secondary text-sm mb-6 max-w-md">
        {message}
      </p>
      
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-hover hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default Error;