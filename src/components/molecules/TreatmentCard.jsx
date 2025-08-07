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
  if (!dateString || typeof dateString !== 'string') {
    return "No date";
  }
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }
  
  try {
    return format(date, "MMM d, yyyy");
  } catch (error) {
    console.warn('Date formatting error:', error, 'for dateString:', dateString);
    return "Date error";
  }
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
    if (!teeth) return "N/A";
    
    // Handle both array and comma-separated string formats
    const teethArray = Array.isArray(teeth) ? teeth : teeth.split(",").map(t => t.trim());
    
    if (teethArray.length === 0) return "N/A";
    if (teethArray.includes("All")) return "All teeth";
    return teethArray.join(", ");
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
                {treatment.procedure_c || treatment.procedure}
              </h4>
              <p className="text-sm text-gray-600">
                {formatDate(treatment.date_c || treatment.date)} • {treatment.provider_c || treatment.provider}
              </p>
            </div>
            
<Badge variant={getStatusVariant(treatment.status_c || treatment.status)}>
              <ApperIcon name={getStatusIcon(treatment.status_c || treatment.status)} className="w-3 h-3 mr-1" />
              {(treatment.status_c || treatment.status) === "in-progress" ? "In Progress" : (treatment.status_c || treatment.status) ? (treatment.status_c || treatment.status).charAt(0).toUpperCase() + (treatment.status_c || treatment.status).slice(1) : "Unknown"}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-600">
          <ApperIcon name="Tooth" className="w-4 h-4 mr-2 text-gray-400" />
<span className="text-gray-500 mr-2">Tooth/Teeth:</span>
          {getToothDisplay(treatment.tooth_c || treatment.tooth)}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <ApperIcon name="DollarSign" className="w-4 h-4 mr-2 text-gray-400" />
<span className="text-gray-500 mr-2">Cost:</span>
            {formatCurrency(treatment.cost_c || treatment.cost)}
          </div>
          
{(treatment.insuranceCovered_c || treatment.insuranceCovered) > 0 && (
            <div className="text-success text-xs">
              Insurance: {formatCurrency(treatment.insuranceCovered_c || treatment.insuranceCovered)}
            </div>
          )}
        </div>
        
{(treatment.notes_c || treatment.notes) && (
          <div className="flex items-start mt-3 pt-3 border-t border-gray-100">
            <ApperIcon name="FileText" className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
            <span className="text-xs text-gray-500">{treatment.notes_c || treatment.notes}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TreatmentCard;