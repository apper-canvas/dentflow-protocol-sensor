import { cn } from "@/utils/cn";

const Loading = ({ className, variant = "default", ...props }) => {
  if (variant === "table") {
    return (
      <div className={cn("animate-fade-in", className)} {...props}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-card mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 animate-pulse"></div>
            </div>
            <div className="w-20 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={cn("animate-fade-in", className)} {...props}>
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/5 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in", className)} {...props}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/5 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-8 animate-fade-in", className)} {...props}>
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-secondary font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;