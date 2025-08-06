import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const StatCard = ({ 
  title,
  value,
  icon,
  change,
  changeType = "neutral",
  gradient = false,
  className,
  ...props 
}) => {
  const getChangeColor = (type) => {
    const colors = {
      positive: "text-success",
      negative: "text-error", 
      neutral: "text-gray-500"
    };
    return colors[type] || colors.neutral;
  };

  const getChangeIcon = (type) => {
    const icons = {
      positive: "TrendingUp",
      negative: "TrendingDown",
      neutral: "Minus"
    };
    return icons[type] || icons.neutral;
  };

  return (
    <Card 
      gradient={gradient}
      className={cn("p-6", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          
          {change && (
            <div className={cn("flex items-center mt-2 text-sm", getChangeColor(changeType))}>
              <ApperIcon name={getChangeIcon(changeType)} className="w-4 h-4 mr-1" />
              {change}
            </div>
          )}
        </div>
        
        {icon && (
          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-blue-100 rounded-lg flex items-center justify-center">
            <ApperIcon name={icon} className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;