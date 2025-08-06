import { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ProcedurePlanItem = ({ 
  procedure, 
  index, 
  onRemove, 
  onUpdate, 
  onReorder, 
  allProcedures 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toothOptions = [
    "All", "#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", 
    "#9", "#10", "#11", "#12", "#13", "#14", "#15", "#16",
    "#17", "#18", "#19", "#20", "#21", "#22", "#23", "#24",
    "#25", "#26", "#27", "#28", "#29", "#30", "#31", "#32"
  ];

  const getCategoryColor = (category) => {
    const colors = {
      preventive: "success",
      restorative: "primary", 
      endodontic: "warning",
      surgical: "error",
      orthodontic: "info",
      cosmetic: "secondary"
    };
    return colors[category] || "secondary";
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const targetIndex = index;
    
    if (sourceIndex !== targetIndex) {
      const reordered = [...allProcedures];
      const [removed] = reordered.splice(sourceIndex, 1);
      reordered.splice(targetIndex, 0, removed);
      onReorder(reordered);
    }
  };

  const handleToothSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    onUpdate(procedure.planItemId, { selectedTeeth: selectedOptions });
  };

  const handleNotesChange = (notes) => {
    onUpdate(procedure.planItemId, { notes });
  };

  const insuranceCovered = procedure.cost * (procedure.insuranceRate || 0);
  const patientPortion = procedure.cost - insuranceCovered;

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        isDragging ? "opacity-50 scale-95" : "hover:shadow-md",
        isExpanded ? "ring-2 ring-primary/20" : ""
      )}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1">
            <div className="flex items-center cursor-grab">
              <span className="text-sm font-medium text-gray-500 mr-2">
                {index + 1}.
              </span>
              <ApperIcon name="GripVertical" className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-gray-900">{procedure.name}</h4>
                <Badge variant={getCategoryColor(procedure.category)} size="sm">
                  {procedure.category}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Cost: ${procedure.cost?.toFixed(2) || '0.00'}</span>
                <span>Insurance: ${insuranceCovered.toFixed(2)}</span>
                <span className="font-medium text-gray-900">
                  Patient: ${patientPortion.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ApperIcon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                className="w-4 h-4" 
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(procedure.planItemId)}
              className="text-error hover:text-error hover:bg-red-50"
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-gray-200 pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tooth/Teeth
                </label>
                <Select
                  multiple
                  value={procedure.selectedTeeth || []}
                  onChange={handleToothSelection}
                  className="h-24"
                >
                  {toothOptions.map(tooth => (
                    <option key={tooth} value={tooth}>
                      {tooth}
                    </option>
                  ))}
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost Breakdown
                </label>
                <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Procedure Cost:</span>
                    <span className="font-medium">${procedure.cost?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insurance Coverage:</span>
                    <span className="text-success font-medium">
                      -${insuranceCovered.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
                    <span>Patient Portion:</span>
                    <span>${patientPortion.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <Input
                value={procedure.notes || ""}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Add notes for this procedure..."
                multiline
                rows={2}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProcedurePlanItem;