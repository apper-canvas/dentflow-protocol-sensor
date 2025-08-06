import { format } from "date-fns";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";

const TreatmentCard = ({ 
  treatment, 
  patient,
  onClick,
  className,
  ...props 
}) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusVariant = (status) => {
    const variants = {
      completed: "success",
      "in-progress": "warning",
      planned: "info",
      cancelled: "error"
    };
    return variants[status] || "default";
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: "CheckCircle",
      "in-progress": "Clock",
      planned: "Calendar",
      cancelled: "XCircle"
    };
    return icons[status] || "Circle";
  };

  const getToothDisplay = (teeth) => {
    if (!teeth || teeth.length === 0) return "N/A";
    if (teeth.includes("All")) return "All teeth";
    return teeth.join(", ");
  };

  return (
    <Card 
      hover
      onClick={() => onClick && onClick(treatment)}
      className={cn("p-4", className)}
      {...props}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                {treatment.procedure}
              </h4>
              <p className="text-sm text-gray-600">
                {formatDate(treatment.date)} • {treatment.provider}
              </p>
            </div>
            
            <Badge variant={getStatusVariant(treatment.status)}>
              <ApperIcon name={getStatusIcon(treatment.status)} className="w-3 h-3 mr-1" />
              {treatment.status === "in-progress" ? "In Progress" : treatment.status.charAt(0).toUpperCase() + treatment.status.slice(1)}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-600">
          <ApperIcon name="Tooth" className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-gray-500 mr-2">Tooth/Teeth:</span>
          {getToothDisplay(treatment.tooth)}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <ApperIcon name="DollarSign" className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-gray-500 mr-2">Cost:</span>
            {formatCurrency(treatment.cost)}
          </div>
          
          {treatment.insuranceCovered > 0 && (
            <div className="text-success text-xs">
              Insurance: {formatCurrency(treatment.insuranceCovered)}
            </div>
          )}
        </div>
        
        {treatment.notes && (
          <div className="flex items-start mt-3 pt-3 border-t border-gray-100">
            <ApperIcon name="FileText" className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
            <span className="text-xs text-gray-500">{treatment.notes}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TreatmentCard;